import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyShelf from "../components/books/EmptyShelf";
import styled from "../components/pagesStyles/Library.module.css";
import Container from "../helpers/wrapper/Container";
import useFilterLibrary from "../hooks/useFilterLibrary";
import useGetAllBooks from "../hooks/useGetAllBooks";
import search from "../images/search.svg";

const links = ["All", "TBR", "In Progress", "Completed", "DNF"];

const Library = () => {
  //state
  const [searchParams, setSearchParams] = useSearchParams();
  const [link, setlink] = useState("All");
  const AllBooks = useGetAllBooks();

  //get the category from the url params
  let urlParam = searchParams.get("category");

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

  //update the search params when the link changes
  useEffect(() => {
    setSearchParams({ category: link });
  }, [link, setSearchParams]);

  //function to change the link state
  const handleLink = (link) => setlink(link);

  return (
    <section className={styled["library-container"]}>
      <Container>
        <nav className={styled["library-navbar"]}>
          <h1>Your Library</h1>

          <div className={styled["library-links"]}>
            {links.map((link) => {
              return (
                <p
                  key={link}
                  onClick={() => handleLink(link)}
                  className={
                    urlParam === link ||
                    (urlParam === "To Be Read" && link === "TBR")
                      ? styled.active
                      : styled.link
                  }
                >
                  {link}
                </p>
              );
            })}
          </div>
        </nav>

        {/* if there are no books in the library show the empty shelf */}
        {!books || books.length === 0 || books === undefined ? (
          <EmptyShelf src={search} />
        ) : (
          <section className="books-grid">{books}</section>
        )}
      </Container>
    </section>
  );
};

export default Library;
