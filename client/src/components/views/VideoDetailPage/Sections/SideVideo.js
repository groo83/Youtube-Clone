import React, { useEffect,useState } from 'react'
import axios from 'axios'
export default function SideVideo() {

    const [sideVideos, setsideVideos] = useState([]) // 끝에 ,[]라서? 


    // landingPage 부분 활용
    useEffect(() =>{
        axios.get('/api/video/getVideos')
        .then(response => {
            if (response.data.success) {
                console.log(response.data.videos)
                setsideVideos(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패했습니다.')
            }
        })

    },[])


    const renderSideVideo = sideVideos.map((video, index)=>{
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return  <div key ={index} style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
            <div style={{ width:'40%', marginRight:'1rem' }}>
                <a href  style={{ color:'gray' }}>
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                </a>
            </div>

            <div style={{ width:'50%' }}>
                <a href style={{ color:'gray' }}>
                <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}  </span><br />
                <span>{video.writer.name}</span><br />
                <span>{video.views}</span><br />
                <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
    })

    return (
        // Map method로 하나의비디오에서 모든비디오로
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {renderSideVideo}
        </React.Fragment>

        
    )
}
