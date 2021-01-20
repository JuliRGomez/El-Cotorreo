// constantes
const defaultState = {

    activeUser:{},
    users: []
}

// types
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'

// reducer
export default function userReducer(state = defaultState, action){
    switch(action.type){
        case GET_USER_SUCCESS:
            return {...state,activeUser: action.payload}
        
        case GET_USERS_SUCCESS:
            return{...state,users:action.payload}
        default:
            return state
    }
}

// actions
export const getUsersAction = () => async (dispatch, getState) => {
    try {
        const res = await fetch('https://academlo-whats.herokuapp.com/api/v1/users')
        const response = await res.json();
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response
        })
        response.find(element=>element.uid)
    } catch (error) {
        console.log(error)
    }
}

export const changeUser=(userObj)=>async(dispatch,getState)=>{
    try {
        console.log("cmbiando usuario....");
        const res = await fetch('https://academlo-whats.herokuapp.com/api/v1/users')
        const response = await res.json();
        const newUser=response.find(element=>element.uid===userObj.uid);
        dispatch({
            type: GET_USER_SUCCESS,
            payload:newUser
        })
    }
    catch (error) {
        console.log(error)
    }
}