import React, { useEffect, useState } from 'react';
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send4.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;

const ENDPOINT="http://localhost:4500";

const Chat = () => {
const [id, setid] = useState("");

const [messages, setMessages] = useState([]);

 const send = () => {
  const message =  document.getElementById('chatInput').value;
   socket.emit('message',{ message,id });
   document.getElementById('chatInput').value="";
 }

useEffect(() => {
  socket = socketIo(ENDPOINT, { transports: ['websocket']});
 
  socket.on('connect', () => {
    alert("connected");
    setid(socket.id);
  })

 socket.emit('joined',{user})

 socket.on('Welcome',(data)=>{
   setMessages([...messages, data]);
   console.log(data.user,data.message);
 })

 socket.on('userJoined',(data)=>{
  setMessages([...messages, data]);
   console.log(data.user,data.message);
 })

 socket.on('leave',(data)=>{
  setMessages([...messages, data]);
  console.log(data.user,data.message);
})


  return () => {
  socket.emit(`disconnect`);
  socket.off();
  }
}, [])


useEffect(() => {
 socket.on('sendMessage', (data) => {
  setMessages([...messages, data]);
   console.log(data.user, data.message, data.id);
 })

  return () => {
   socket.off();
  };
}, [messages]);


  return (
   <div className="chatPage">
     <div className="chatContainer">
      <div className="header"></div>
      <ReactScrollToBottom className="chatBox">
       {messages.map((item,i)=> <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}  />)}
      </ReactScrollToBottom>
      <div className="inputBox">
        <input type="text" id="chatInput" />
        <button onClick={send} className="sendBtn">
          <img src={sendLogo} alt="send" />
        </button>
      </div>
     </div>
  </div>
  )
}
//console.log(user);
export default Chat;
 