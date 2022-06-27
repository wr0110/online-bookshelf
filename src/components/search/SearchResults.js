import React, { useEffect, useState } from "react";
import styled from "./SearchResults.module.css";
import { Navigate, useLocation } from "react-router-dom";
import Books from "../books/Books";
import Container from "../../helpers/wrapper/Container";
import Heading from "../../helpers/heading/Heading";
import LibraryActions from "../library/LibraryActions";
import Loading from "../../helpers/Loading";
import EmptyShelf from "../books/EmptyShelf";
import webSearch from "../../images/web_search.svg";

const SearchResults = () => {
  // states
  const [bookResults, setBookResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /** convert the location object into a javascript object
   * get the search property and store is value in a constant  */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  /**
   * url includes searchQuery, orderBy relevance and maxResults of 28
   * setBookResults to the results from the fetched data
   */
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const url = ` https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=relevance&maxResults=28&key=${apiKey}`;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setBookResults(data.items);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    if (searchQuery) {
      fetchBook();
    }
  }, [searchQuery]);

  /**map over the bookResults array and return a Book with the info
   * destucture properties from the book object and pass them as props
   */
  const allBooks = bookResults
    ?.filter((book) => book.volumeInfo.imageLinks?.smallThumbnail !== undefined)
    .map((book) => {
      const { id, searchInfo } = book;
      const { title, authors, publishedDate, categories, imageLinks } =
        book.volumeInfo;

      const bookData = {
        id,
        searchInfo,
        title,
        authors,
        publishedDate,
        categories,
        imageLinks,
      };
      return (
        <Books
          key={book.id}
          book={bookData}
          actionsComponent={<LibraryActions book={bookData} />}
        />
      );
    });

  //props for heading component
  const text = (
    <>
      Showing results for <span> {searchQuery}</span>
    </>
  );

  /**prevent user from visiting the route manually route,
   * the user can only visit this page if there is a search term*/
  if (!searchQuery) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styled.results}>
      {/* when loading show Modal */}
      {loading && <Loading />}

      <Container>
        {allBooks && <Heading className="heading-md" text={text} />}
        {allBooks === undefined && <EmptyShelf src={webSearch} />}
        <div className="books-grid">{allBooks}</div>
      </Container>
    </section>
  );
};

export default SearchResults;
