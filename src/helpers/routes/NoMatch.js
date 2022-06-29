import React from "react";
import EmptyShelf from "../../components/books/EmptyShelf";
import noMatch from "../../images/404.svg";
import Container from "../wrapper/Container";

const heading = "Oops! Page not found.";
const message =
  "Sorry, either you typed the wrong URL or the page you are looking for doesn't exist. Try going back to the home page.";

const NoMatch = () => {
  const noMatchStyle = { paddingTop: " 9rem" };
  return (
    <Container>
      <section style={noMatchStyle}>
        <EmptyShelf
          src={noMatch}
          heading={heading}
          message={message}
          button="Home"
          route="/"
        />
      </section>
    </Container>
  );
};

export default NoMatch;
