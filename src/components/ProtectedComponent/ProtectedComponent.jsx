import React, {useEffect} from "react";
import { Route } from "react-router";
import { setUser, checkActiveSession } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import firebase from "../../firebase";
//import Denied from "../Denied/Denied.jsx";


export default function ProtectedComponent({ user, children, login, path }) {
  //Mostramos una ventana de carga mientras recibimos sesionActive
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setUser(user));
        dispatch(checkActiveSession(true));
        // User is signed in.
      } else {
        dispatch(checkActiveSession(false));
        // No user is signed in.
      }
    });

  }, [dispatch]);

  return (
    <Route path={path}>
      {user.sesionActive ? (
        children
      ) : (
          <>
            <div className="loading" href='https://dribbble.com/msaling' target='_blank'><img src='https://i.postimg.cc/Y9sR6QTW/parrots.gif' border='0' alt='parrots' /></div>
            {/*<Denied login={login} />*/}
          </>
        )}
    </Route>
  );
}
