import React, { createContext, useReducer, useState } from "react";
import libraryReducer from "../reducers/bookReducer";

export const LibraryContext = createContext({
  bookResultsFromSearch: [],
  setBookResultsFromSearch: () => {},
});

const LibraryContextProvider = (props) => {
  //state
  const [bookResultsFromSearch, setBookResultsFromSearch] = useState([]);
  const [state, dispatch] = useReducer(libraryReducer, []);

  const values = {
    bookResultsFromSearch,
    setBookResultsFromSearch,
    state,
    dispatch,
  };

  console.log(bookResultsFromSearch);
  return (
    <LibraryContext.Provider value={values}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export default LibraryContextProvider;
