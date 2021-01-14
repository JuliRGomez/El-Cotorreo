import React, {useRef}from "react";
import {useState,useEffect} from "react"
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { useSelector, useDispatch } from 'react-redux'
import MenuProfile from "../menuProfile";
import {searchUsser,searchConversation,userActive} from "../../actions/conversationActions";
import Profile from "../profile/profiles";
import ChatProfile from "../../containers/ChatContainer";
import SidebarChat from "../SidebarChat/SidebarChat";

const Sidebar = (props) => {
  let [showm, setshowmenu] = useState('false')
  let [showp, setshowprofile] = useState('false')
  let [showMessages, setshowMessages] = useState('false')
  let [findUser, setFindUser] = useState('')
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const userMessenger= useSelector(state=>state.conversation.userMessenger)
  const chats= useSelector(state=>state.conversation.conversations)
  const refUser = useRef();
  
  const click=()=>{
    
    dispatch(userActive(user,userMessenger))
   }
  
    

  useEffect(async ()=> {
    
    try{
            dispatch(searchUsser());
            
      await dispatch(searchConversation(user.user.uid))
      
      
    }catch(error){
      alert(error.message);
    }
  },[] );

  const showMenu = () => {
    
    setshowmenu(!showm)
    console.log(showm)
  }
  const showProfiles = async()=> {
    await dispatch(searchUsser())
    setshowprofile(!showp)
    console.log(showp)
  }
  const showConver= () => {
    setshowMessages(!showMessages)
    console.log(showMessages)
  }
  const handleUser = async(event)=> {
    const user = event.target.value;
    console.log(user)
    setFindUser(user)
    console.log(findUser)
  
  }
  return ( 
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={`${user.user.photoURL}`} />
        <h4>{`${user.user.displayName}`}</h4>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <div>
            <MoreVertIcon onClick={showMenu}/>
          </div>
          {showm ? null : <MenuProfile />}
          {/*closem || showm ? null: (<MenuProfile />, setCloseprofile (props.closeM))*/}
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined onClick={()=>(click())}/>
          <input placeholder="Busca o inicia un nuevo chat" type="text" 
          inputRef={refUser}
          onClick={showProfiles}
          onChange={handleUser}/>
        </div>   
      </div>
      
      <div className="containerprofiles"> {showp ? null:(
        userMessenger.filter((user)=>
        user.firstName
            .toLowerCase()
            .includes(findUser.toLowerCase())
        )
        .map((user)=>{
            return(
                <>
                    <Profile id={user._id} name={user.firstName} lastname={user.lastName} imgProfile={user.photoUrl} /> 
               </>
            )
        })

      )}</div>   
      
      <div className="sidebar__chats">
      <button  onClick={showConver}>Carga Tus Cotorreos</button>
      {showMessages ? null:(<ChatProfile />)}
      </div>
    

      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;