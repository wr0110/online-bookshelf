import React from "react";
import useFilterLibrary from "../../hooks/useFilterLibrary";

const InProgress = () => {
  //retrieve books in the In Progress category from the current user's userLibrary
  const books = useFilterLibrary("In Progress");

  return <section className="books-grid">{books}</section>;
};

export default InProgress;
