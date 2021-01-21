import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import Home from "./components/Home/Home";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import ForgotpasswordContainer from "./containers/ForgotpasswordContainer";
import ProtectedComponent from "./components/ProtectedComponent/ProtectedComponent";
import { useSelector, useDispatch, Provider } from "react-redux";
import firebase from "./firebase";
import { setUser, checkActiveSession } from "./actions/authActions";
import store from "./store";

export default function App() {
  const user = useSelector((state) => state.auth);
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
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <LoginContainer />
          </Route>
          <Route exact path="/register" component={RegisterContainer} />
          <Route exact path="/recover" component={ForgotpasswordContainer} />
          <ProtectedComponent user={user}>
            <NavBar />
            <Route exact path="/chat" component={Home} />
          </ProtectedComponent>
          <ProtectedComponent>
            <NavBar />
            <Route exact path="/chat/:id" component={Home} />
          </ProtectedComponent>
        </Switch>
      </Provider>
    </Router>
  );
}
