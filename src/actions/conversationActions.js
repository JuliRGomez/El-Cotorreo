const setUserMessenger = (userObj) => {
    console.log('ingresa')
    return {
        type: "SET_USERMESSENGER",
        userObj
    }
}
export const searchUsser =async () => {
    
    let response = await fetch(`https://academlo-whats.herokuapp.com/api/v1/users`)
      let results = await response.json();
      console.log(results)
      setUserMessenger(results)
      return (dispatch)=>{
          dispatch(setUserMessenger(results))}
          ;}