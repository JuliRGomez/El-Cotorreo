import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import {conversationActive,createNewConversation,searchConversation} from "../../actions/conversationActions";
export default function Profile(props) {
    let idActive=useSelector(state=>state.conversation.idUserActive)
    const conversations = useSelector(state => state.conversation.conversations)
    let img
    let idConversation="";
    const dispatch = useDispatch();
    const click=()=>{
        dispatch(searchConversation())
        let filtro = conversations.filter((conver=>conver.members[0]===idActive)).filter(conver=>conver.members[1]===props.id)
        let filtro2 =conversations.filter((conver=>conver.members[1]===idActive)).filter(conver=>conver.members[0]===props.id)
        console.log(filtro)
        console.log(filtro2)
        if(filtro[0]===undefined && filtro2[0]===undefined){
            alert('Nuevo Cotorreo')
            dispatch(createNewConversation(idActive,props.id))
        }
       else{
        if(filtro[0]===undefined){
            idConversation=filtro2[0]._id
        }
        else{
            idConversation=filtro[0]._id 
        }
        dispatch(conversationActive(idConversation,idActive))
       }
      
        
    }

    if(props.imgProfile!==""){
        img=props.imgProfile
    }
    else{
        img="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
    }
 return(
     <div onClick={()=>(click())} className="containerprofile">
         <img src={`${img}`}className="imgprofileuser"></img>
         <h4 className="nameProfile">{props.name.toLocaleUpperCase()} {props.lastname.toLocaleUpperCase()}</h4>
     </div>

 )
    
}

   
     