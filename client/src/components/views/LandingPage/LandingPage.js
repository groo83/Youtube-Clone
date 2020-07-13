
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {

    const [Videos, setVideos] = useState([])
    // mongoDB에서 비디오 정보 가져옴
// DOM이 업데이트될때 한번만 실행
//componentDidMount 대신 reacthook에서 useEffect 사용
    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })
    }, [])





    const renderCards = Videos.map((video, index) => {
        console.dir(video);
        console.dir(index);
        console.dir(video.writer);
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} > {/*  video_id로 링크걸어줌 */}
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className="duration">
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />

            <Row gutter={[32,16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage