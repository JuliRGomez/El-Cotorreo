import { Avatar } from "@material-ui/core";
import { React, useState, useEffect, useRef } from "react";
import "./SidebarChat.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteMenu from "../deleteMenu";
import NotificationsIcon from "@material-ui/icons/Notifications";
//onClick={()=>props.createChat(props.idActive,props.partnerId)}

const SidebarChat = (props) => {
  const [deleteMenu, setDeleteMenu] = useState(false);

  const showDelete = () => {
    setDeleteMenu(!deleteMenu);
  };

  const menu = useRef(null);
  useOutsideClose(menu);

  function useOutsideClose(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDeleteMenu();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div
      className="sidebarChat"
      onClick={() =>
        props.selectConversation(props.conversation, props.selector)
      }
    >
      <Avatar src={`${props.photo}`} />
      {props.conversation.notifications ? <NotificationsIcon /> : null}
      <div className="sidebarChat__info">
        <h2>{props.name}</h2>
        <p>Último mensaje</p>
      </div>
      <div>
        <ChevronRightIcon onClick={showDelete} />
      </div>
      <div ref={menu}>
        {deleteMenu ? (
          <DeleteMenu idConversation={props.conversation._id} />
        ) : null}
      </div>
    </div>
  );
};
export default SidebarChat;