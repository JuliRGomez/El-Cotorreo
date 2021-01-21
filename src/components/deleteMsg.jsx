import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';



export default function DeleteMsg(props) {
  
const deleteMessage= async ()=>{
    let response = await fetch(
        `https://academlo-whats.herokuapp.com/api/v1/messages/${props.idMessage}`,
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
   // console.log(response);
   props.hideMenu();
    return response;
}
   return(<>
          
          <div>
            
            <Dropdown.Item onClick={deleteMessage} >Eliminar</Dropdown.Item>
          </div>
          
          </>
          )
        }