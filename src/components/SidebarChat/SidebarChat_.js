import { Avatar } from "@material-ui/core";
import {React,useState} from "react";
import "./SidebarChat.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteMenu from "../deleteMenu"
import NotificationsIcon from '@material-ui/icons/Notifications';
//onClick={()=>props.createChat(props.idActive,props.partnerId)}
const SidebarChatt = (props) => {
    const [deleteMenu,setDeleteMenu]=useState(false);

    const showDelete=()=>{
      setDeleteMenu(!deleteMenu);
    }


  return (
    <div className="sidebarChat" onClick={()=>props.selectConversation(props.conversation,props.selector)}>
      <Avatar src={`${props.photo}`}/>
      {props.notifications?<NotificationsIcon />:null }
      <div className="sidebarChat__info">
        <h2>{props.name}</h2>
        <p>Último mensaje</p>
      </div>
      <div>
              <MoreVertIcon onClick={showDelete}  />
      </div>
      <div>
        {deleteMenu?<DeleteMenu idConversation={props.conversation._id} />:null}
      </div>
    </div>
  );
};
export default SidebarChatt;
