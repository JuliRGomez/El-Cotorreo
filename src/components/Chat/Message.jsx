import {React,useState} from "react";
import "./Chat.css";
import DeleteMessage from "../deleteMsg"
import MoreVertIcon from "@material-ui/icons/MoreVert";


const  Message = (props)=>{
    const [showDeleteMsg,setShowDeleteMsg] = useState(false);

    const showMessageMenu = ()=>{
        setShowDeleteMsg(!showDeleteMsg);
    }
    const hideMenu=()=>{
        setShowDeleteMsg(false);
      }
    return(
        <div>
        <p
        className={`chat__message ${
            props.message.received && "chat__reciever"
          }`}
        >
          <span className="chat__name">{props.message.userId===props.id?props.conversation.membersObj[1].username:props.conversation.membersObj[0].username}</span>
          {props.message.message}
          {/* <span className="chat__timestamp">{message.timestamp}</span> */}
        </p>
          
          {
            <MoreVertIcon onClick={showMessageMenu} />
            
          }
        
          
            {
              showDeleteMsg?<DeleteMessage idMessage={props.message._id} hideMenu={hideMenu} />:null
            }
          
            
        </div>
    )


}
export default Message;