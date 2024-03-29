import React, { useState } from 'react'
import {Comment,Avatar,Button,Input} from 'antd';
import Axios from 'axios';
import {useSelector} from  'react-redux';
import LikeDislikes from './LikeDislikes';

const {TextArea} = Input;
function SingleComment(props) {
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const user = useSelector(state=> state.user); // redux store이용

    const onClickReplyOpen = ()=>{
        setOpenReply(!OpenReply)
    }
    const onHandelChange = (event) =>{
        setCommentValue(event.currentTarget.value)
    }
    const onSubmit=(event)=>{
        event.preventDefault();

        const variables={
            content: CommentValue,
            writer: user.userData._id, //redux store 이용
            postId: props.postId, //videoid에서 postid로 변경
            responseTo:  props.comment._id // ※ reponseTo 오타에러 db에 저장안됨.
        }
        Axios.post('/api/comment/saveComment',variables)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.result);
                    props.refreshFunc(response.data.result)
                    setCommentValue("")
                    setOpenReply(false)
                }else{
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }


    const actions=[
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />
        ,<span onClick={onClickReplyOpen} key="comment-base-reply-to">Reply to</span>
    ]
    
    return (
        <div>
            <Comment
                actions={actions}
                author ={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p> { props.comment.content }</p>}
            />
            {/* OpenReply가 true일떄만 */}
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <textarea 
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandelChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
