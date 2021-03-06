import React, { useEffect , useState} from 'react'
import Axios from 'axios'



function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)//(initialState)
    const [Subscribed, setSubscribed] = useState(false)//(initialState)
    useEffect(()=>{
        let variable = {userTo: props.userTo}
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response =>{
                if(response.data.success){
                    setSubscribeNumber(response.data.subscribeNumber)
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.');
                } 

            })

        // variable
        let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')}
        // 내가 구독중인지 확인
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribed(response.data.subscribed)
                }else{
                    alert('구독 정보를 받아오지 못했습니다.');
                }
            })
    },[])


    // 구독버튼 클릭 
    const onSubscribe = ()=>{
        let subscribedVariable ={
            userTo: props.userTo,
            userFrom: props.userFrom
        }


        // 이미 구독중이라면
        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
                .then(response=>{
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독취소 하는데 실패하였습니다.')
                    }
                })
        }else{
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(response=>{
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독 하는데 실패하였습니다.')
                    }
                })
        }
    }

    return (  // :  /onClick={onSubscribe}
        <div>
            <button 
            style={{
                backgroundColor: ` ${Subscribed ? '#AAAAAA':'#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed? 'Subscribed':'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
