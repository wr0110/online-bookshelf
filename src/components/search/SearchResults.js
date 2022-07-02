import React from "react";
import styled from "./SearchResults.module.css";
import { Navigate, useLocation } from "react-router-dom";
import Container from "../../helpers/wrapper/Container";
import EmptyShelf from "../books/EmptyShelf";
import server from "../../images/server_down.svg";
import webSearch from "../../images/web_search.svg";
import Loading from "../../helpers/modal/Loading";
import { useGetSearchResultsQuery } from "../../store/features/api/apiSlice";
import BookResults from "./BookResults";

const SearchResults = () => {
  /** convert the location object into a javascript object
   * get the search property and store is value in a constant  */
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  const {
    data: bookResults,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useGetSearchResultsQuery(searchQuery);

  let content = null;
  const empty =
    !bookResults?.items ||
    bookResults?.items === undefined ||
    bookResults?.items.length === 0;

  if (isLoading || isFetching) {
    return (
      <div className={styled.results}>
        <Loading />
      </div>
    );
  } else if (isSuccess && !empty) {
    content = (
      <BookResults bookResults={bookResults?.items} searchQuery={searchQuery} />
    );
  } else if (isError) {
    content = (
      <EmptyShelf
        src={server}
        heading={`${error.toString()}`}
        message="Try searching for another book or visit the Explore page."
        button="Explore"
        route="/explore"
      />
    );
  } else if (empty && !isError && !isLoading) {
    content = (
      <EmptyShelf
        src={webSearch}
        heading="No results found."
        message="Try searching for another book or visit the Explore page."
        button="Explore"
        route="/explore"
      />
    );
  }

  // prevent user from visiting the route manually, without a search query
  if (!searchQuery) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styled.results}>
      {isSuccess && <Container>{content}</Container>}
    </section>
  );
};

export default SearchResults;
