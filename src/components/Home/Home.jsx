import React, { useState,useEffect } from "react";
import "./Home.css";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import NewSidebar from "../Sidebar/newChat"
import { changeUser } from "../../usersDucks"
import { useSelector, useDispatch } from 'react-redux';

function Home() {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let [closem, setCloseprofile] = useState(true);
  const [searchChat, setSearchChat] = useState(false);
  const[activeConversation, setActiveConversation] = useState({})
  const [conversationSelected, setConversationSelected] = useState(false);
  const firebaseUser = useSelector(store => store.auth.user);

  const updateConversations = (conversation) => {
    console.log(conversation);
    setActiveConversation(conversation);
    setConversationSelected(true);
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
    user ? (<div className="app">
      <div className="app__body">
        {
          searchChat ? (
            <NewSidebar closeM={closem} showMenu={showMenu} closeMenu={closeMenu} close={closeNewchat} id={activeUser._id} />) : (
              <Sidebar closeM={closem} showMenu={showMenu} closeMenu={closeMenu} newchat={newchat} id={activeUser._id} selectConversation={updateConversations} />)
        }
        {
          conversationSelected ? <Chat /*messages={messages}*/conversation={activeConversation} id={activeUser._id} /> : null
        }
      </div>
    </div>) : (<div className="loading" href='https://dribbble.com/msaling' target='_blank'><img src='https://i.postimg.cc/Y9sR6QTW/parrots.gif' border='0' alt='parrots' /></div>)
  );
}

export default Home;