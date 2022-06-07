import React, { useEffect, useState } from "react";
import useFilterShelf from "../../hooks/useFilterShelf";
import useGetAllShelfBooks from "../../hooks/useGetAllShelfBooks";

const BooksForShelves = ({ searchParams }) => {
  const allBooksInLibrary = useGetAllShelfBooks();
  const urlParams = searchParams.get("shelf");
  const booksOnSelectedShelf = useFilterShelf(urlParams);

  let books = [];

  if (!urlParams || urlParams === "") {
    books = allBooksInLibrary;
  } else if (urlParams) {
    books = booksOnSelectedShelf;
  }

  return <section className="books-grid">{books}</section>;
};

export default BooksForShelves;
