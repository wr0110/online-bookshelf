import React from "react";
import Heading from "../../helpers/heading/Heading";
import Container from "../../helpers/wrapper/Container";
import Recommendations from "../recs/Recommendations";
import styled from "./TopPicks.module.css";

const TopPicks = (props) => {
  return (
    <section className={styled["top-picks"]}>
      <Container>
        <article className={styled["top-picks-info"]}>
          <Heading className="heading-md" text={props.text} />
          <p className="para">{props.paragraph}</p>
        </article>

        <Recommendations />
      </Container>
    </section>
  );
};

export default TopPicks;
