import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const SearchResults = () => {
  //the location object returns information about the page.
  const location = useLocation();

  //  convert the location object into a javascript object
  const queryParams = new URLSearchParams(location.search);

  //get the search property and store is value in a constant
  const search = queryParams.get("search");

  if (!search) {
    return <Navigate to="/" />;
  }

  return <div>{search}</div>;
};

export default SearchResults;
