import React, { useContext } from "react";
import styled from "./AllBooks.module.css";
import { useSelector } from "react-redux";
import { AuthContext } from "../../contexts/authContext";

import Books from "../books/Books";

const AllBooks = () => {
  const { library } = useSelector((state) => state.bookStore);
  const { currentUser } = useContext(AuthContext);

  const libraryForCurrentUser = library.find(
    (shelf) => shelf.user === currentUser?.email
  );

  //map over each book record in the current user's library and return a Book
  const allBooksForCurrentUser = libraryForCurrentUser?.userLibrary.map(
    (record, index) => {
      return <Books key={index} book={record.book} />;
    }
  );

  return <section className={styled.all}>{allBooksForCurrentUser}</section>;
};

export default AllBooks;
