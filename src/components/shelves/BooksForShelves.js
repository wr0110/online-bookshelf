import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import Books from "../books/Books";
import ShelfActions from "./ShelfActions";

const BooksForShelves = () => {
  const { currentUser } = useContext(AuthContext);
  const { library } = useSelector((state) => state.bookStore);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => {
      const detailsForCurrentUser = library.find(
        (shelf) => shelf.user === currentUser?.email
      );
      const all = detailsForCurrentUser?.userLibrary.map((record) => {
        return (
          <Books
            key={record.bookData.id}
            book={record.bookData}
            actionsComponent={<ShelfActions book={record.bookData} />}
          />
        );
      });
      setAllBooks(all);
    };

    getBooks();
  }, [currentUser, library]);

  return <section className="books-grid">{allBooks}</section>;
};

export default BooksForShelves;
