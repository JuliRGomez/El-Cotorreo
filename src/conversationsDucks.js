// constantes
const defaultState = {

    conversations: []
}

// types
const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS'

// reducer
export default function conversationsReducer(state = defaultState, action){
    switch(action.type){
        case GET_CONVERSATIONS_SUCCESS:
            return {...state,conversations: action.payload}
        
        default:
            return state
    }
}

// actions
// export const conversationsAction = (idToSearch) => async (dispatch, getState) => {
//     console.log(idToSearch);
//     try {
//         const res = await fetch('https://academlo-whats.herokuapp.com/api/v1/users/1/conversations')
//         const response = await res.json();
//         const activeConversations= await response.map(element=>{
//             if(element.members[0]===idToSearch||element.members[1]===idToSearch){
//                 return(element);
//             }
//         })
//         dispatch({
//             type: GET_CONVERSATIONS_SUCCESS,
//             payload: activeConversations
//         })
        
//     } catch (error) {
//         console.log(error)
//     }
// }