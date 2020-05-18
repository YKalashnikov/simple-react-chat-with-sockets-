import React from 'react';
import socket from '../socket'

const Chat = ({users, messages, roomId, userName, onAddMessage}) => {
    const [messageValue, setMessageValue] = React.useState('');
    const messagesRef = React.useRef(null);

     React.useEffect(()=>{
      messagesRef.current.scrollTo(0,9999)
     },[messages])

    const onSendMessage = () =>{
        if(!messageValue) return alert('Enter message')
        socket.emit('ROOM:NEW_MESSAGE',{
            userName,
            roomId,
            text: messageValue
        });
        onAddMessage({userName, text: messageValue})
        setMessageValue('')
    };
    return (
        <div className="chat">
      <div className="chat-users">
        Room: <b>{roomId}</b>
        <hr />
        User: <b>{userName}</b>
        <hr />
        <b>Online: ({users.length})</b>
        <ul>
           {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))} 
        </ul>
      </div>
      <div className="chat-messages">
      <div ref={messagesRef} className="messages">
          {messages.map((message, index) => (
            <div className="message" key={index}>
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div> 
        <form>
        <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button onClick={onSendMessage} type="button" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
    );
};

export default Chat;