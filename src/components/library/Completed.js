import React from "react";
import useFilterLibrary from "../../hooks/useFilterLibrary";

const Completed = () => {
  //retrieve books in the Completed category from the current user's userLibrary

  const books = useFilterLibrary("Completed");
  return <section className="books-grid">{books}</section>;
};

export default Completed;
