import React from "react";
import { Route } from "react-router";
import Denied from "../Denied/Denied.jsx";

export default function ProtectedComponent(props) {
  return (
    <Route path={props.path}>
      {props.user.sesionActive ? (
        props.children
      ) : (
        <>
          <Denied login={props.login} />
        </>
      )}
    </Route>
  );
}
