import React from "react";
import useFilterShelf from "../../hooks/useFilterShelf";
import useGetAllShelfBooks from "../../hooks/useGetAllShelfBooks";
import EmptyShelf from "../books/EmptyShelf";
import shelves from "../../images/shelves.svg";

const BooksForShelves = ({ searchParams }) => {
  const allBooksInLibrary = useGetAllShelfBooks();
  const urlParams = searchParams.get("shelf");
  const booksOnSelectedShelf = useFilterShelf(urlParams);

  let books = [];

  if (!urlParams || urlParams === "" || urlParams === "All") {
    books = allBooksInLibrary;
  } else if (urlParams) {
    books = booksOnSelectedShelf;
  }

  if (!books || books.length === 0) {
    return <EmptyShelf src={shelves} />;
  }

  return <section className="books-grid">{books}</section>;
};

export default BooksForShelves;
