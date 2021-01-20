import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
//onClick={()=>props.createChat(props.idActive,props.partnerId)}
const SidebarChatt = (props) => {
  return (
    <div className="sidebarChat" onClick={()=>props.selectConversation(props.conversation,props.selector)}>
      <Avatar src={`${props.photo}`}/>
      <div className="sidebarChat__info">
        <h2>{props.name}</h2>
        <p>Último mensaje</p>
      </div>
    </div>
  );
};
export default SidebarChatt;
