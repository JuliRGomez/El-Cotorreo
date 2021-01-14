import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";


function Home() {
  const [messages, setMessages] = useState([]);
  let [closem, setCloseprofile] = useState("false");
  
  const closeMenu = () => {
    setCloseprofile(false);
  }

  return (
    //user ? <chat /> : <gif />
    <div className="app" onClick={closeMenu}>
      <div className="app__body">
        <Sidebar closeM={closem}/>
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default Home;