import React from "react";
import styled from "./Genre.module.css";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";
import reading_svg from "../images/reading_svg.png";

const Genre = () => {
  const genreList = [
    "Fiction",
    "Fantasy",
    "Romance",
    "Humour",
    "Horror",
    "New Adult",
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

          <p className={`para ${styled.paragraph}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
            eleifend cras praesent purus nec, quis aliquet.
          </p>
        </article>

        <div className={styled["genre-group"]}>{genres}</div>

        <figure className={styled["genre-img"]}>
          <img src={reading_svg} alt="person reading a book" />
        </figure>
      </Container>
    </section>
  );
};

export default Genre;
