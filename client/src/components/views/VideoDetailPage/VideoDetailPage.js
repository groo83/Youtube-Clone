import React, { useEffect,useState } from 'react'
import {Row, Col,List, Avatar} from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'
// import { Video } from '../../../../../server/models/Subscriber'
export default function VideoDetailPage(props) {
    
    // db에서 정보가져옴
    const videoId = props.match.params.videoId //app.js에서 :videoId로 명시
    const variable = {videoId : videoId}
    //useState
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    //const [Comment, setComment] = useState(initialState)

    useEffect(()=>{

        Axios.post('/api/video/getVideoDetail', variable)
            .then(response =>{
                if(response.data.success){
                    //state에 저장.
                    setVideoDetail(response.data.videoDetail)
                }else{
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })

            Axios.post('/api/comment/getComments', variable)
                .then(response =>{
                    if(response.data.success){
                        setComments(response.data.comments)
                        console.log(response.data.comments)
                    }else{
                        alert('코멘트 정보를 가져오는 것을  실패했습니다.')
                    }
            })

    },[])

    // comment submit시 댓글목록에 반영되도록
    const refreshFunc = (newComment) => {
        setComments(Comments.concat(newComment))
    }


    if(VideoDetail.writer){
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <Row gutter={[16,16]}>
                    <Col lg={18} xs={24}>
                        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[ subscribeButton ]}
                        >
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer.image} />}
                                    title={VideoDetail.writer.name}
                                    description={VideoDetail.description}
                                />
                                
                        </List.Item>

                            {/* Comments   */}
                            <Comment refreshFunc={refreshFunc} commentList={Comments} postId={videoId}/>

                        </div> 
                    </Col>
                    <Col lg={6} xs={24}>

                        <SideVideo />

                    </Col>
                </Row>
            )
    }
    else{
        return(
            <div>...loading</div>
        )
    }
}

//export default VideoDetailPage
