import React, { useEffect } from "react";
import useFilterLibrary from "../../hooks/useFilterLibrary";
import useGetAllBooks from "../../hooks/useGetAllBooks";
import EmptyShelf from "../books/EmptyShelf";
import search from "../../images/search.svg";

//props for empty shelf
const heading = "There are no books here yet.";
const message =
  "Search for a book to add it to your library or visit the Explore page to find more books.";

const BooksForLibrary = ({ searchParams, setSearchParams }) => {
  const AllBooks = useGetAllBooks();

  //get the category from the url params
  const urlParam = searchParams?.get("category");

  //books to return based on the selected category
  let books = [];
  books = useFilterLibrary(urlParam);

  useEffect(() => {
    //if the search param = TBR set the urlParam to To Be Read
    if (urlParam === "TBR") {
      setSearchParams({ category: "To Be Read" });
    }
  }, [setSearchParams, urlParam]);

  //return all books for the current user
  if (!urlParam || urlParam === "" || urlParam === "All") {
    books = AllBooks;
  }

  const empty = !books || books.length === 0 || books === undefined;

  return (
    <div>
      {/* if there are no books in the library show the empty shelf */}
      {empty ? (
        <EmptyShelf src={search} heading={heading} message={message} />
      ) : (
        <section className="books-grid">{books}</section>
      )}
    </div>
  );
};

export default BooksForLibrary;
