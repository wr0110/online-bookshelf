import React from "react";
import Heading from "../../helpers/heading/Heading";
import Container from "../../helpers/wrapper/Container";
import Recommendations from "../recs/Recommendations";
import styled from "./TopPicks.module.css";
import cruel_prince from "../../images/cruel_prince.jpg";
import ugly_love from "../../images/ugly_love.jpg";

const TopPicks = (props) => {
  return (
    <section className={styled["top-picks"]}>
      <Container>
        <article className={styled["top-picks-info"]}>
          <Heading className="heading-md" text={props.text} />
          <p className="para">{props.paragraph}</p>
        </article>

        {/* using the recommendations component */}
        <div className={styled.recommendations}>
          <Recommendations
            theme="yellow"
            bookTitle="the cruel prince"
            author="holly black"
            genre="fantasy"
            src={cruel_prince}
            bg="light-yellow"
          />
          <Recommendations
            theme="dark-blue"
            bookTitle="ugly love"
            author="colleen hoover"
            genre="romance"
            src={ugly_love}
            bg="light-blue"
          />

          <Recommendations
            theme="yellow"
            bookTitle="the cruel prince"
            author="holly black"
            genre="fantasy"
            src={cruel_prince}
            bg="light-yellow"
          />
        </div>
      </Container>
    </section>
  );
};

export default TopPicks;
