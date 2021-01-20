import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
//onClick={()=>props.createChat(props.idActive,props.partnerId)}
const SidebarChat = (props) => {

  const click=()=>{
    props.createChat(props.idActive,props.partnerId);
    props.close();
  }

  return (
    <div className="sidebarChat" onClick={click}>
      <Avatar src={`${props.photo}`}/>
      <div className="sidebarChat__info">
        <h2>{props.name}</h2>
        <p>Disponible</p>
      </div>
    </div>
  );
};
export default SidebarChat;
