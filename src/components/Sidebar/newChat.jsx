import React, { useState,useEffect } from "react";
import { SearchOutlined,ArrowBackOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";
import {useDispatch, useSelector} from "react-redux"
import {getUsersAction} from "../../usersDucks"
import {conversationsAction} from "../../conversationsDucks"
import "./Sidebar.css";
import { IconButton } from "@material-ui/core";


const NewSidebar = (props)=>{
    
    const [content,setContent]=useState("");
    const dispatch = useDispatch();
    const users=useSelector(store=>store.users.users);
   
    
    useEffect(()=>{
        dispatch(getUsersAction());
        //dispatch(conversationsAction(props.id));
        //console.log(firebaseUser);
        
    },[dispatch]);

    useEffect(()=>{
        //dispatch(getUsersAction());
        dispatch(conversationsAction(props.id));
        //console.log(firebaseUser);
        
    },[dispatch,props.id]);
    
    const conversations=useSelector(store=>store.conversations.conversations);

    const handleInputSearch= async (event)=>{
        setContent(event.target.value);
    }

    const createChat =async (idActiveUser,idPartner)=> {
        
        if (conversations.length){
        const partner= conversations.find(element=>element.members[0]===idPartner||element.members[1]===idPartner);
        if(!partner){
            //console.log("ejecutando crear chat")
            let response = await fetch(
            `https://academlo-whats.herokuapp.com/api/v1/conversations`,
            {
                method: "POST",
                headers: {
                "Content-type": "application/json",
                },
                body: JSON.stringify({
                members:[idActiveUser,idPartner]
                  //"https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
                }),
            }
        );

        let results = await response.json();
        //console.log("conversacio creada "+ results)
          //console.log(results);
        return results;
        }
        else{
            alert('La conversacion ya existe')
        }


        }
        
    }

    return(
    <div className="sidebar">
        <div className="sidebar__header">
        <IconButton onClick={props.close}>
            <ArrowBackOutlined />
        </IconButton>
            <h4>Nuevo chat</h4>
        </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchOutlined />
                <input onChange={handleInputSearch} placeholder="Buscar e iniciar un nuevo chat" type="text" />
            </div>
        </div>

        <div className="sidebar__chats">
        {
            users.filter((user)=>user.firstName.toLocaleLowerCase().includes(content.toLowerCase())&&user._id!==props.id
            ).map((element,index)=>{
                return(
                    <SidebarChat key={index} name={element.firstName} photo={element.photoUrl}createChat={createChat} idActive={props.id} partnerId={element._id} close={props.close}/>
                )
            })
        }
     
      </div>

    </div>
    )
}

export default NewSidebar;