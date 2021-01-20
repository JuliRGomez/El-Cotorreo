const INITIAL_STATE = {
    userMessenger: "",
    lupa: false
}



const conversationReducer = (prevState = INITIAL_STATE, action) => {

    switch(action.type){
       
        case "SEARCH_USER":
            return {...prevState, user: action.userObj};
        case "LUPA":
            return {...prevState, user: action.lupa};
        case "DELETE_MESSAGE":
            break;
       
        default:
            return prevState;
    }

}

export default conversationReducer;