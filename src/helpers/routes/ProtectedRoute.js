import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ProtectedRoute = (props) => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const auth = currentUser.email !== "" && isSignedIn;

  //if user is not authenticated redirect home else return children components
  if (!auth) return <Navigate to="/" />;

  return <div>{props.children}</div>;
};

export default ProtectedRoute;
