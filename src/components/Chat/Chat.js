import React, { useState,useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Chat.css";
import Message from "./Message"


const Chat = (props) => {
  const [input, setInput] = useState("");
  const [messages,setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    //const postNewmessage = async (input,conversationId,userId) => {
      if (input){
        let response = await fetch(
          `https://academlo-whats.herokuapp.com/api/v1/messages`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userId: props.id,
              conversationId: props.conversation._id,
              message: input,
              timestamp:"",
              received: false
                //"https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
            }),
          }
        );
        let results = await response.json();
        setInput("");
        obtenMensajes(props.conversation._id);
        return(results);
        //console.log(results);
      
      }
  }

  const obtenMensajes=async (id)=>{
    try {
      const res = await fetch(`https://academlo-whats.herokuapp.com/api/v1/conversations/${id}/messages`)
      const response = await res.json();
    // console.log(response);
      const messages=await response[0].messages;
      setMessages(messages);
    } 
    catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    
    const getMessages = async(idToSearch) => {
      try {
        const res = await fetch(`https://academlo-whats.herokuapp.com/api/v1/conversations/${idToSearch}/messages`)
        const response = await res.json();
       // console.log(response);
        const messages=await response[0].messages;
        setMessages(messages);
      } 
      catch (error) {
        console.log(error)
      }
    }
    getMessages(props.conversation._id);
    
   //setConversations(getConversations(props.id));
  },[props.conversation]);

  return (
    
    <div className="chat">
      <div className="chat__header">
        {
         
        <Avatar src={`${props.conversation.membersObj[props.selector].photoUrl}`} />
        
        } 
        <div className="chat__headerInfo">
        <h3>{props.conversation.membersObj[props.selector].username}</h3>
          <p>Última conexión {props.time}</p>
        </div>
      </div>

      <div className="chat__body">
        {
        messages.map((message, index) => {
            return (
              <Message key={index} className="message_recibed" message={message} id={props.id} conversation={props.conversation}/>
            );
        })
        }
      </div>

      <div className="chat__footer">
        <form onSubmit={sendMessage}>
          <input className="chat__input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Escribe un mensaje"
          />
          <button onClick={sendMessage} type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
    
  )

};

export default Chat;
