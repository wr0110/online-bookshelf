import React, { Fragment } from "react";
import styled from "./Genre.module.css";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";

const Genre = () => {
  const genreList = [
    "Fiction",
    "Non-Fiction",
    "Romance",
    "Historical Romance",
    "Horror",
    "Young Adult",
  ];

  const genres = genreList.map((genre) => {
    return <p className={styled["genre-item"]}>{genre}</p>;
  });

  return (
    <section className={styled.genre}>
      <Container>
        <article>
          <Heading
            className="heading-md"
            text={
              <>
                All your favourites in <span>one</span> place
              </>
            }
          />
          <Fragment>{genres}</Fragment>
        </article>
      </Container>
    </section>
  );
};

export default Genre;
