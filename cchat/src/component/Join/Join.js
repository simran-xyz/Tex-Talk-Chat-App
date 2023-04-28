import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo2.jpeg";
import {Link} from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById('JoinInput').value;
  document.getElementById('JoinInput').value="";
}

const Join = () => {

 const [name, setname] = useState("");
 
  return (  
  <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>TexTalk</h1>
        <input onChange={(e)=> setname(e.target.value)} type="text"  id="JoinInput" placeholder='Enter Your Name' />
       <Link onClick={(event)=>!name? event.preventDefault():null} to="/chat"> <button onClick={sendUser} className="joinBtn">Log In </button></Link>
      </div>
  </div>
  )
}

export default Join;
export {user};
