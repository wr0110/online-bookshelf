import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ProtectedRoute = (props) => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  //if there is no user and they are not signed in then redirect to the specified path else return children components
  if (!isSignedIn && !currentUser.email) {
    return <Navigate to="/" />;
  }
  return <div>{props.children}</div>;
};

export default ProtectedRoute;
