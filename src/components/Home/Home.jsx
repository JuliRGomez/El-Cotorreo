import React, { useState, useEffect } from "react";
import "./Home.css";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import NewSidebar from "../Sidebar/newChat"
import { changeUser } from "../../usersDucks"
import { useSelector, useDispatch } from 'react-redux';


function Home() {
  const dispatch = useDispatch();
  let [closem, setCloseprofile] = useState(true);
  const [searchChat, setSearchChat] = useState(false);
  const [activeConversation, setActiveConversation] = useState({})
  const [conversationSelected, setConversationSelected] = useState(false);
  const firebaseUser = useSelector(store => store.auth.user);
  const [selector, setSelector] = useState(0);

  const updateConversations = (conversation) => {
    //console.log(conversation,selector);
    setActiveConversation(conversation);
    setConversationSelected(true);
    setSelector(selector);
  }

  const closeMenu = () => {
    setCloseprofile(true);
  }

  const showMenu = () => {
    setCloseprofile(!closem);
  };

  const newchat = () => {
    setSearchChat(true);

  }

  const closeNewchat = () => {
    setSearchChat(false);
  }
  useEffect(() => {
    const getActiveUser = () => {
      dispatch(changeUser(firebaseUser));
    }
    getActiveUser();
  }, [dispatch, firebaseUser]);



  const activeUser = useSelector(store => store.users.activeUser);

  return (
    <div className="app">
      <div className="app__body">
        
        {
          activeUser ? (
            searchChat ? (
              <NewSidebar closeM={closem} showMenu={showMenu} closeMenu={closeMenu} close={closeNewchat} id={activeUser._id} />) : (
                <Sidebar closeM={closem} showMenu={showMenu} closeMenu={closeMenu} newchat={newchat} id={activeUser._id} selectConversation={updateConversations}/>)
          ) : null

        }
        {
          conversationSelected ? <Chat conversation={activeConversation} id={activeUser._id} selector={selector} /> : <div href='https://dribbble.com/msaling' target='_blank'>
          <img className="gif" src='https://i.postimg.cc/RZHYS82g/cotorrosyletras.gif' border='0' alt='parrots' />
        </div>
        }
      </div>
    </div>)
}

export default Home;