import React, { useEffect } from "react";
import useFilterLibrary from "../../hooks/useFilterLibrary";
import useGetAllBooks from "../../hooks/useGetAllBooks";
import EmptyShelf from "../books/EmptyShelf";

import search from "../../images/search.svg";
const BooksForLibrary = ({ searchParams, setSearchParams }) => {
  const AllBooks = useGetAllBooks();

  //get the category from the url params
  let urlParam = searchParams?.get("category");

  //books to return based on the selected category
  let books = [];
  books = useFilterLibrary(urlParam);

  //* wrapped inside useEffect, to fix bad setState
  useEffect(() => {
    //if the search param = TBR set the urlParam to To Be Read
    if (searchParams.get("category") === "TBR") {
      setSearchParams({ category: "To Be Read" });
    }
  }, [setSearchParams, searchParams]);

  //return all books for the current user
  if (searchParams.get("category") === "All") {
    books = AllBooks;
  }

  return (
    <div>
      {/* if there are no books in the library show the empty shelf */}
      {!books || books.length === 0 || books === undefined ? (
        <EmptyShelf src={search} />
      ) : (
        <section className="books-grid">{books}</section>
      )}
    </div>
  );
};

export default BooksForLibrary;
