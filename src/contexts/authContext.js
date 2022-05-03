import React, { createContext, useState } from "react";

// create context
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  // state to manage if the user is signed in or not
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
