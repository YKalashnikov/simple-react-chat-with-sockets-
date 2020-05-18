import React from 'react';
import axios from 'axios';

const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)

    const onEnter = async() =>{
        if(!roomId || !userName){
            return alert('Please add Input')
        }
        const obj = {
            roomId,
            userName
        }
        setLoading(true)
       await axios.post('/rooms', obj)
       setTimeout(()=>{
        onLogin(obj)
       },1000)
    
    }
    return (
        <div className="join-block">
            <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={e=>setRoomId(e.target.value)}/>
            <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={e=>setUserName(e.target.value)}/>
            <button disabled={isLoading} className="btn btn-success"
            onClick={onEnter}>
            {isLoading? 'Logging...' : 'Log In'}
            </button>
        </div>
    );
};

export default JoinBlock;