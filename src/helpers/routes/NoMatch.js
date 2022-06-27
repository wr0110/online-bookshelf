import React from "react";
import EmptyShelf from "../../components/books/EmptyShelf";
import noMatch from "../../images/404.svg";

const NoMatch = () => {
  const noMatchStyle = { paddingTop: " 9rem" };
  return (
    <section style={noMatchStyle}>
      <EmptyShelf src={noMatch} />
    </section>
  );
};

export default NoMatch;
