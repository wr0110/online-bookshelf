import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Books from "../components/books/Books";
import EmptyShelf from "../components/books/EmptyShelf";
import Summary from "../components/books/Summary";
import styled from "../components/pagesStyles/Library.module.css";
import { AuthContext } from "../contexts/authContext";
import Container from "../helpers/wrapper/Container";
import useFilterLibrary from "../hooks/useFilterLibrary";

const links = ["All", "TBR", "In Progress", "Completed", "DNF"];

const Library = () => {
  //store, context, and state
  const { library } = useSelector((state) => state.bookStore);
  const { currentUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [link, setlink] = useState("All");

  //get the category from the url params
  let urlParam = searchParams.get("category");

  //books to return based on the selected category
  let books = [];
  books = useFilterLibrary(urlParam);

  //if the search param = TBR set the urlParam to To Be Read
  if (searchParams.get("category") === "TBR") {
    setSearchParams({ category: "To Be Read" });
  }

  //return all books for the current user
  if (searchParams.get("category") === "All") {
    const detailsForCurrentUser = library.find(
      (shelf) => shelf.user === currentUser?.email
    );

    //map over each book record in the current user's library and return a Book
    books = detailsForCurrentUser?.userLibrary.map((record) => {
      return (
        <Books
          key={record.bookData.id}
          modalComponent={<Summary book={record.bookData} />}
          book={record.bookData}
        />
      );
    });
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

        {!books || books === undefined ? (
          <EmptyShelf />
        ) : (
          <section className="books-grid">{books}</section>
        )}
      </Container>
    </section>
  );
};

export default Library;
