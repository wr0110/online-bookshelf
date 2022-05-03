import { signOut } from "firebase/auth";
import React, { createContext, useState } from "react";
import { auth } from "../firebase";

// create context
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  // state to manage if the user is signed in or not
  const [isSignedIn, setIsSignedIn] = useState(false);

  // function to sign out a user
  const signUserOut = async () => {
    signOut(auth).then(() => {
      localStorage.removeItem("isUserSignedIn");
      setIsSignedIn(false);
    });
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, signUserOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
