import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { LibraryContext } from "../../contexts/libraryContext";
import Books from "../books/Books";

const AllBooks = () => {
  // const { state } = useContext(LibraryContext);
  // const { currentUser } = useContext(AuthContext);

  // const libraryForCurrentUser = state.library.find(
  //   (shelf) => shelf.user === currentUser?.email
  // );

  // console.log(libraryForCurrentUser);

  // const allBooksForCurrentUser = libraryForCurrentUser?.userLibrary.map(
  //   (book, index) => {
  //     console.log(book);
  //     return <Books key={index} book={book.book} />;
  //   }
  // );
  return <section>hi</section>;
};

export default AllBooks;
