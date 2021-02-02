import { React, useState, useEffect, useRef} from "react";
import "./Chat.css";
import DeleteMessage from "../deleteMsg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//npm install --save luxon
import DateTime from 'luxon/src/datetime.js'

const Message = (props) => {
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);

  const showMessageMenu = () => {
    setShowDeleteMsg(!showDeleteMsg);
  };
  const hideMenu = () => {
    setShowDeleteMsg(false);
  };

  const menu = useRef(null);
  useOutsideClose(menu);

  function useOutsideClose(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDeleteMsg();
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
    <div>
      {props.message.userId === props.id ? (
        <div ref={menu} className="chat__message">
          {props.message.message}
          {/*<p className="chat__name1">
            {props.conversation.membersObj[1].username}
      </p>*/}
          <ExpandMoreIcon onClick={showMessageMenu} />
          {showDeleteMsg ? (
            <DeleteMessage idMessage={props.message._id} hideMenu={hideMenu} />
          ) : null}
          <p className="chat__timestamp1">{DateTime.fromISO(props.message.timestamp).toFormat('tt')}</p>
        </div>
      ) : (
        <div ref={menu} className="chat__reciever">
          {props.message.message}
          {/*<p className="chat__name2">
            {props.conversation.membersObj[0].username}
      </p>*/}
          <ExpandMoreIcon onClick={showMessageMenu} />
          {showDeleteMsg ? (
            <DeleteMessage idMessage={props.message._id} hideMenu={hideMenu} />
          ) : null}
          <p className="chat__timestamp2">{DateTime.fromISO(props.message.timestamp).toFormat('tt')}</p>
        </div>
      )}
    </div>
  );
};
export default Message;