import { signOut } from "firebase/auth";

import React, { createContext, useEffect, useState } from "react";

import { auth } from "../firebase";

// create context
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  // state to manage if the user is signed in or not
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setcurrentUser] = useState({
    name: "",
    userId: "",
    email: "",
  });

  console.log(currentUser);

  /**
   *signs out the user
   *removes the isUserSignedIn value from local storage
   *sets the isSignedIn state to false and removes current user
   */
  const signUserOut = async () => {
    await signOut(auth).then(() => {
      localStorage.removeItem("isUserSignedIn");
      localStorage.removeItem("currentUser");
      setcurrentUser({
        name: "",
        userId: "",
        email: "",
      });

      setIsSignedIn(false);
    });
  };

  /**
   * checks if the the isUserSignedIn value in local storage exists
   * if it is true then update the state
   * this persists the isSignedIn state when the user refreshes
   */
  useEffect(() => {
    const login = localStorage.getItem("isUserSignedIn");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (login) {
      setIsSignedIn(true);
    }
    if (user) {
      setcurrentUser(user);
    }
    console.log(login, user?.email);
  }, []);

  const authObject = {
    isSignedIn,
    setIsSignedIn,
    signUserOut,
    currentUser,
    setcurrentUser,
  };

  return (
    <AuthContext.Provider value={authObject}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
