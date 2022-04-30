import React from "react";
import styled from "./Genre.module.css";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";

const Genre = (props) => {
  //  map over the genrelist recieved from props and return them in a paragraph
  const genres = props.genreList.map((genre) => {
    return (
      <p key={genre} className={styled["genre-item"]}>
        {genre}
      </p>
    );
  });

  return (
    <section className={styled.genre}>
      <Container className={styled.wrap}>
        <article>
          <Heading
            className={props.headingClassName}
            text={props.headingText}
          />

          <p className={`para ${styled.paragraph}`}>{props.paragraph}</p>
        </article>

        <div className={styled["genre-group"]}>{genres}</div>

        <figure className={styled["genre-img"]}>
          <img src={`${props.src}`} alt={props.alt} />
        </figure>
      </Container>
    </section>
  );
};

export default Genre;
