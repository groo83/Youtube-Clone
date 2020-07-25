import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {
        let commentNumber = 0;
        props.commentList.map((comment) => {
            if(comment.responseTo === props.parentCommentId) commentNumber++
        })
        // 07.25 자식댓글안보여서 추가
        setChildCommentNumber(commentNumber)
    }, [props.commentList])// ,[]면 dom초기 로드될때만 실행됨.

    let renderReplyComment = (parentCommentId)=>
        props.commentList.map((comment, index)=>(
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment refreshFunc={props.refreshFunc} comment={comment} postId={props.postId}/>
                        <ReplyComment refreshFunc={props.refreshFunc} commentList ={props.commentList} postId={props.postId} parentCommentId={comment._id} />
                    </div>
                }
            </React.Fragment>
        ))


        const onHandelChange = () =>{
            setOpenReplyComments(!OpenReplyComments)
        }
    return (
        <div>


            {ChildCommentNumber>0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                        onClick ={onHandelChange}>
                        View {ChildCommentNumber} more comment(s)
                </p>
            }
            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
