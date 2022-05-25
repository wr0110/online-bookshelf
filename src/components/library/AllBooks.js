import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import Books from "../books/Books";
import Summary from "../books/Summary";

const AllBooks = () => {
  const { library } = useSelector((state) => state.bookStore);
  const { currentUser } = useContext(AuthContext);

  const detailsForCurrentUser = library.find(
    (shelf) => shelf.user === currentUser?.email
  );

  //map over each book record in the current user's library and return a Book
  const allBooksForCurrentUser = detailsForCurrentUser?.userLibrary.map(
    (record) => {
      return (
        <Books
          key={record.bookData.id}
          modalComponent={<Summary book={record.bookData} />}
          book={record.bookData}
        />
      );
    }
  );

  return <section className="books-grid">{allBooksForCurrentUser}</section>;
};

export default AllBooks;
