import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../helpers/wrapper/Container";
import styled from "./BookDetails.module.css";
import Loading from "../../helpers/modal/Loading";
import EmptyShelf from "./EmptyShelf";
import webSearch from "../../images/web_search.svg";
import server from "../../images/server_down.svg";
import ScrollToTop from "../../helpers/routes/ScrollToTop";
import ShowBookDetails from "./ShowBookDetails";
import { useSelector } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
//component to show book details
const BookDetails = () => {
  const { bookId } = useParams();
  const { library } = useSelector((state) => state.bookStore);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState([]);

  const [error, setError] = useState(false);

  const isInLibrary = library
    .find((record) => record.user === currentUser?.email)
    ?.userLibrary?.find((book) => book.bookData.id === bookId);

  //fetch data using the given book ID and set the selectedBook state
  useEffect(() => {
    const url = ` https://www.googleapis.com/books/v1/volumes/${bookId}`;
    const fetchById = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSelectedBook(data.volumeInfo);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchById();
  }, [bookId]);

  const details = { selectedBook, isInLibrary };

  if (!selectedBook && !error) {
    return (
      <Container className={styled.info}>
        <EmptyShelf
          src={webSearch}
          heading="No results found."
          message="Try searching for another book or visit the Explore page."
          button="Explore"
          route="/explore"
        />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={styled.info}>
        <EmptyShelf
          src={server}
          heading="There was error when fetching the data"
          message="Try searching for another book or visit the Explore page."
          button="Explore"
          route="/explore"
        />
      </Container>
    );
  }

  const success = !loading && selectedBook.length !== 0 && !error;

  return (
    <ScrollToTop>
      <section className={styled.info}>
        {loading && <Loading />}
        {success && <ShowBookDetails details={details} />}
      </section>
    </ScrollToTop>
  );
};

export default BookDetails;
