import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "../../helpers/wrapper/Container";
import styled from "./BookDetails.module.css";
import Loading from "../../helpers/modal/Loading";
import EmptyShelf from "./EmptyShelf";
import webSearch from "../../images/web_search.svg";
import server from "../../images/server_down.svg";
import ShowBookDetails from "./ShowBookDetails";
import { useSelector } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import { useGetBookDetailsQuery } from "../../store/features/api/apiSlice";

//component to show book details
const BookDetails = () => {
  const { bookId } = useParams();
  const { library } = useSelector((state) => state.bookStore);
  const { currentUser } = useContext(AuthContext);

  const isInLibrary = library
    .find((record) => record.user === currentUser?.email)
    ?.userLibrary?.find((book) => book.bookData.id === bookId);

  const {
    data: selectedBook,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBookDetailsQuery(bookId);

  const details = { selectedBook, isInLibrary };

  if (selectedBook === [] && !isError) {
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

  if (isError) {
    return (
      <Container className={styled.info}>
        <EmptyShelf
          src={server}
          heading={`${error.toString()}`}
          message="Try searching for another book or visit the Explore page."
          button="Explore"
          route="/explore"
        />
      </Container>
    );
  }

  // const success =
  // !isLoading && isSuccess && selectedBook.length !== 0 && !error;

  return (
    <section className={styled.info}>
      {isLoading && <Loading />}
      {isSuccess && <ShowBookDetails details={details} />}
    </section>
  );
};

export default BookDetails;
