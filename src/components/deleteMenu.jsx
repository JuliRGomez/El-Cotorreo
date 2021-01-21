import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';



export default function DeleteMenu(props) {
  
const deleteConversation= async ()=>{
    let response = await fetch(
        `https://academlo-whats.herokuapp.com/api/v1/conversations/${props.idConversation}`,
        {
            method: "DELETE",
            headers: {
            "Content-type": "application/json",
            },
           // body: JSON.stringify({
           // members:[idActiveUser,idPartner]
              //"https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
            //}),
        }
    );
    console.log(response);
    return response;
}
   return(<>
          
          <div>
            
            <Dropdown.Item onClick={deleteConversation} >Eliminar</Dropdown.Item>
          </div>
          
          </>
          )
        }