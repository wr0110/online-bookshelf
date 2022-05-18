import React, { createContext, useReducer, useState } from "react";
import libraryReducer, { initalState } from "../reducers/bookReducer";

export const LibraryContext = createContext({
  bookResultsFromSearch: [],
  setBookResultsFromSearch: () => {},
});

const LibraryContextProvider = (props) => {
  //state
  const [bookResultsFromSearch, setBookResultsFromSearch] = useState([]);
  const [state, dispatch] = useReducer(libraryReducer, initalState);

  const values = {
    bookResultsFromSearch,
    setBookResultsFromSearch,
    state,
    dispatch,
  };

  console.log(state);
  return (
    <LibraryContext.Provider value={values}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export default LibraryContextProvider;
