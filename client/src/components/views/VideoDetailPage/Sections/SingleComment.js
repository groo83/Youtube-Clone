import React, { useState } from 'react'
import {Comment,Avatar,Button,Input} from 'antd';
import Axios from 'axios';

const {TextArea} = Input;
function SingleComment(props) {
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = ()=>{
        setOpenReply(!OpenReply)
    }
    const onHandelChange = (event) =>{
        setCommentValue(event.currentTarget.CommentValue)
    }
    const onSubmit=(event)=>{
        event.preventDefault();

        const variables={
            content: CommentValue,
           // writer: user.userData._id, //redux store 이용
            postId: props.videoId
            //,reponseTo: 
        }
        Axios.post('/api/comment/saveComment',variables)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.result);
                }else{
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }

    const actions=[
        <span onClick={onClickReplyOpen} key="comment-base-reply-to">Reply to</span>
    ]
    
    return (
        <div>
            <Comment
                actions={actions}
                author
                avatar={<Avatar src alt />}
                content
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
