import React from 'react';
import socket from '../socket';

const Chat = ({ users, messages, roomId, userName, onAddMessage }) => {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 9999);
  }, [messages]);

  const onSendMessage = () => {
    if (!messageValue) return alert('Enter message');
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue('');
    setTyping(false);
    socket.emit('ROOM:TYPING',{});

  };
  const handleChange = (e) => {
    setMessageValue(e.target.value);
    socket.emit('ROOM:TYPING', { user: userName});
  };
  
  React.useEffect(() => {
    socket.on('typing', (data) => setTyping(data));
  }, [typing]);
  
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
            <div className={`${userName ===message.userName ? 'message': 'message-right'}`} key={index}>
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        {typing.user ? `${typing.user} is typing...` : ''}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => handleChange(e)}
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
