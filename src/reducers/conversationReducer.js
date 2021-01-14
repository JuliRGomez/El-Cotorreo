const INITIAL_STATE = {
    userMessenger: "",
    conversations:"",
    conversationActive:"",
    idUserActive:"",
    userConversation:"",
    messages:[],
    newMessage:""
}



const conversationReducer = (prevState = INITIAL_STATE, action) => {

    switch(action.type){
        case "SET_USERMESSENGER":
            return {...prevState, userMessenger: action.userObj};
        case "SET_CONVERSATIONS":
         return {...prevState, conversations: action.userObj};
        case "SEARCH_USER":
            return {...prevState, user: action.userObj};
        case "SET_CONVERSATION_ACTIVE":
         return {...prevState, conversationActive: action.userObj};
         case "SET_IDUSER_ACTIVE":
         return {...prevState, idUserActive: action.userObj};
         case "SET_USER_CONVERSATION":
         return {...prevState, userConversation: action.userObj};
         case "SET_MESSAGE":
         return {...prevState, messages: action.userObj};
         case "SET_NEW_MESSAGE":
            return {...prevState, newMessage: action.userObj};
        case "DELETE_MESSAGE":
            break;
       
        default:
            return prevState;
    }

}

export default conversationReducer;