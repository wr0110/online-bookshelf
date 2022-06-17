import React, { useEffect, useState } from "react";
import styled from "./SearchResults.module.css";
import { Navigate, useLocation } from "react-router-dom";
import Books from "../books/Books";
import Container from "../../helpers/wrapper/Container";
import Modal from "../../helpers/modal/Modal";
import { GiBookshelf } from "react-icons/gi";
import Heading from "../../helpers/heading/Heading";
import LibraryActions from "../books/LibraryActions";

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
   * url includes searchQuery, orderBy relevance and maxResults of 40
   * setBookResults to the results from the fetched data
   */
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const url = ` https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=relevance&maxResults=40&key=${apiKey}`;

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

    fetchBook();
  }, [searchQuery]);

  /**map over the bookResults array and return a Book with the info
   * destucture properties from the book object and pass them as props
   */
  const allBooks = bookResults.map((book) => {
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
      Showing results for <span>{searchQuery}</span>
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
      {loading && (
        <Modal>
          <GiBookshelf size="50px" />
        </Modal>
      )}

      <Container>
        {allBooks && <Heading className="heading-md" text={text} />}
        <div className={styled.allBooks}>{allBooks}</div>
      </Container>
    </section>
  );
};

export default SearchResults;
