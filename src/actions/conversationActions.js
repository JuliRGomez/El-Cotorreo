const setUserMessenger = (userObj) => {
    
    return {
        type: "SET_USERMESSENGER",
        userObj
    }
}
const setConversations = (userObj) => {
   
    return {
        type: "SET_CONVERSATIONS",
        userObj
    }
}
const setConversationActive = (userObj) => {

    return {
        type: "SET_CONVERSATION_ACTIVE",
        userObj
    }
}
const setnewMessage = (userObj) => {

    return {
        type: "SET_NEW_MESSAGE",
        userObj
    }
}
export const setIdUserActive = (userObj) => {
    
    return {
        type: "SET_IDUSER_ACTIVE",
        userObj
    }
}
const setUserConversation = (userObj) => {

    return {
        type: "SET_USER_CONVERSATION",
        userObj
    }
}
const setMessages = (userObj) => {
    console.log(userObj)
    return {
        type: "SET_MESSAGE",
        userObj
    }
}
export const userActive=(user,userMessenger)=>{
    return async(dispatch)=>{
    alert(userMessenger)
    console.log(userMessenger)
   let id= userMessenger.filter((userMessenger)=>
   userMessenger.uid===user.user.uid)
   let idactive= id[0]._id
  await dispatch(setIdUserActive(idactive))
   console.log(idactive)
    }
}
export const searchUsser =() => {
    
       return async(dispatch)=>{
        let response = await fetch(`https://academlo-whats.herokuapp.com/api/v1/users`)
        let results = await response.json();
       
          dispatch(setUserMessenger(results))}
          
          ;}

          export const searchConversation =(idUser) => {
            return (dispatch)=>{
                return new Promise(async(resolve, reject) => {
                try{
             let response = await fetch(`https://academlo-whats.herokuapp.com/api/v1/users/5fdbf8baa158063ea44132e6/conversations`)
             let results = await response.json();
             dispatch(setConversations(results))
            }catch(error){
                console.log(error);
                reject(error);
            }

        })
    }
}

    export const conversationActive=(idConversation,idactive)=>{
        let userConversation=""
        return (dispatch)=>{
            return new Promise(async(resolve, reject) => {
            try{
         let response = await fetch(`https://academlo-whats.herokuapp.com/api/v1/conversations/${idConversation}`)
         let results = await response.json();
         dispatch(setConversationActive(results))    
     
        if(results.membersObj[0]._id===idactive){
                userConversation=results.membersObj[1]
                
                console.log(userConversation)
      }else{
        userConversation=results.membersObj[0]
        console.log(userConversation)
      }
      dispatch(setUserConversation(userConversation))
      dispatch(searchMessages(idConversation))
        }catch(error){
            console.log(error);
            reject(error);
        }

      })
     }
    }

    export const searchMessages =(idConversation) => {
        return (dispatch)=>{
            return new Promise(async(resolve, reject) => {
            try{
         let response = await fetch(`https://academlo-whats.herokuapp.com/api/v1/conversations/${idConversation}/messages`)
         let results = await response.json();
         await dispatch(setMessages(results))
         console.log(results)
        }catch(error){
            console.log(error);
            reject(error);
        }

    })
}
}

export function sendMessage (userId,conversationId,refMensaje){
    console.log(refMensaje)
    if(refMensaje===""){
        return  (dispatch)=>{
        alert('mensaje vacio')
        let NewMessage={ 
            userId:userId,
            conversationId:conversationId,
            message:refMensaje
        }
        dispatch(setnewMessage(NewMessage));
    }
    }

    else{
    let NewMessage={ 
        userId:userId,
        conversationId:conversationId,
        message:refMensaje

    }
    return async (dispatch)=>{
        return new Promise(async(resolve, reject) => {
    try {
    let response = await fetch(`https://academlo-whats.herokuapp.com/api/v1/messages`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(
          {
            
              "userId": userId,
              "conversationId": conversationId,
              "message": refMensaje
            
          }
        )
      });
      let results = await response.json();
      console.log(results)
      dispatch(setnewMessage(NewMessage));
      dispatch(searchMessages(conversationId));
      return results;
      
    } catch (error) {
        console.log(error.message);
        reject(error);
      } 
    })
    }
    }
} 

export function createNewConversation (idUserActive,idUserConversation){
    return async (dispatch)=>{
        return new Promise(async(resolve, reject) => {
    try {
        let response = await fetch(`https://academlo-whats.herokuapp.com/api/v1/conversations`, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(
              {
                
                "members": [
                    idUserActive,
                    idUserConversation
                ]
                
              }
            )
          });
          let results = await response.json();
          console.log(results)
          dispatch(conversationActive(results._id,idUserActive))
          dispatch(searchConversation())
          
          return results;
          
        } catch (error) {
            console.log(error.message);
            reject(error);
          }} 
        )
}}
   

   