import React from "react";
import {useSelector} from "react-redux";

export default function ChatContainer(){
    const {user} = useSelector( state => state.auth);
    return (
        <div>
            El usuario es {user.displayName}
            <img src={user.user.photoURL} alt="profile img"/>
        </div>
    )
}