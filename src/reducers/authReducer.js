const INITIAL_STATE = {
    user: {},
    sesionActive:true,
    userMessenger:""
}


const authReducer = (prevState = INITIAL_STATE, action) => {

    switch(action.type){
        case "SET_USERMESSENGER":
            return {...prevState, userMessenger: action.userObj};
        case "SET_USER":
            return {...prevState, user: action.userObj};
        case "REGISTER":
            break;
        case "CATCH_VALUE":
            break;
        case "LOGOUT_SYSTEM":
            return {...prevState, sesionActive: action.sesionactive, user:""};
        case "CHECK_ACTIVE_SESSION":
            return {...prevState, sesionActive: action.sesionactive};
            case "POST_NEW_USER":
            break;
        default:
            return prevState;
    }

}

export default authReducer;