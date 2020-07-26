import React, { useEffect, useState } from 'react'
import {Tooltip, Icon} from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
    let variable ={}

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)
    if(props.video){
        variable ={videoId: props.videoId, userId: props.userId}
    }else{
        variable ={commentId: props.commentId, userId: props.userId}
    }
    
    // db에서가져오기위해 useEffect
    useEffect(() => {
       
        Axios.post('/api/like/getLikes', variable)
            .then(response =>{
                if(response.data.success){
                    // 비디오 좋아요 숫자 get
                    setLikes(response.data.likes.length)
                    // 내가 이미 눌렀는지
                    response.data.likes.map(like=>{
                        if(like.userId === props.userId){
                            setLikeAction('liked')
                        }
                    })
                }else{
                    alert('Likes에 정보를 가져오지 못했습니다.')
                }
            })
            Axios.post('/api/like/getDislikes', variable)
            .then(response =>{
                if(response.data.success){
                    // 비디오 싫어요 숫자 get
                    setDislikes(response.data.dislikes.length)
                    // 내가 이미 눌렀는지
                    response.data.dislikes.map(dislike=>{
                        if(dislike.userId === props.userId){
                            setDislikeAction('disliked')
                        }
                    })
                }else{
                    alert('Dislikes에 정보를 가져오지 못했습니다.')
                }
            })
    }, [])

    const onLike = () =>{
        if(LikeAction === null){
            Axios.post('/api/like/upLike',variable)
                .then(response=>{
                    if(response.data.success){
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        // Dislike 클릭이 되어있다면
                        if(DislikeAction !==null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes -1)
                        }
                    }else{
                        alert('Like를 올리지 못했습니다.')
                    }
                })
        }else{
            Axios.post('/api/like/unLike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes - 1)
                    setLikeAction(null)
                    
                }else{
                    alert('Like를 내리지 못했습니다.')
                }
            })
        }
    }

    const onDislike = () =>{
        // 이미 클릭되어있을때
        if(DislikeAction !== null){
            Axios.post('/api/like/unDislike', variable)
                .then(response =>{
                    if(response.data.success){
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    }else{
                        alert('Dislike를 내리지 못했습니다.')
                    }
                })
        }else{
            Axios.post('/api/like/upDislike',variable)
            .then(response=>{
                if(response.data.success){
                    setDislikes(Dislikes + 1)
                    setDislikes('disliked')
                    // Like 클릭이 되어있다면
                    if(LikeAction !==null) {
                        setLikeAction(null)
                        setLikes(Likes -1)
                    }
                }else{
                    alert('Dislike를 올리지 못했습니다.')
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction==='liked'? "filled": 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes}   </span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction==='disliked'? "filled": 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes}</span>
            </span>
        </div>
    )
}

export default LikeDislikes
