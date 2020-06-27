//class component가 기능구현다양해서 좋았는데 react hook?이나오면서 functional component가 퍼포먼스가더좋음 
// import React from 'react';
// // functional component
// function VideoUploadPage(){
//     return (
//         <div></div>
//     )
// }

// export default VideoUploadPage
// es7 react extention 다운후 단축키 rfc 사용 
import React,{useState} from 'react'
// css 프레임워크사용
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import { getIn } from 'formik';

const {TextArea}= Input;
const {Title}= Typography;

const PrivateOptions =[
    {value:0, label:"Private"},
    {value:1, label:"Public"}
]
const CategoryOptions =[
    {value:0, label:"Film & Animation"},
    {value:1, label:"Auto & Vehicles"},
    {value:2, label:"Music"},
    {value:3, label:"Pet & Animals"}
]

//외부에서 쓸수있음
export default function VideoUploadPage() {

    // react에서는 state안에 value들 저장해놓음 > useState import 추가 
    // react hook 기능
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    // onChange 이벤트 state변경
    const onTitleChange = (e) =>{
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value)
    }
    
    const onPrivateChange = (e) =>{
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) =>{
        setCategory(e.currentTarget.value)
    }
    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* Drop zone */}
                    <Dropzone 
                        onDrop
                        multiple
                        maxSize>
                        {({ getRootProps, getInputProps}) =>(
                            <div style ={{width:'300px', height:'240px',border:'1px solid lightgray', display:'flex',
                            alignItems:'center', justifyContent:'center'
                            }} {...getInputProps()}>
                                <input {...getInputProps()}></input>
                                <Icon type="plus" style={{fontSize:'3rem'}} />

                            </div>
                        )}


                    </Dropzone> 
                    {/* Thumbnail */}
                    <div>
                        <img src alt />
                    </div>
                </div>

            <br />
            <br />
            <label>Title</label>
            <Input
                onChange ={onTitleChange}
                value ={VideoTitle}
            />
            <br />
            <br />
            <label>Description</label>
            <TextArea
                onChange={onDescriptionChange}
                value = {Description}
            />
            <br />
            <br />
            <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => (
                    <option key ={index} value={item.value} >{item.label}</option>    
                ))}
                
                
            </select>
            <br />
            <br />
            <select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index)=>(
                    <option key ={index} value={item.value} >{item.label}</option>    
                ))}
            </select>
            <br />
            <br />
            <Button type="primary" size="large" onClick>
                Submit
            </Button>
            </Form>
            
        </div>

    )
}
