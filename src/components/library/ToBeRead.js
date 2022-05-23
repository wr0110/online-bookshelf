import React from "react";
import useFilterLibrary from "../../hooks/useFilterLibrary";

const ToBeRead = () => {
  //retrieve books in the To Be Read category from the current user's userLibrary
  const books = useFilterLibrary("To Be Read");

  return <section className="books-grid">{books}</section>;
};

export default ToBeRead;
