import React from "react";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";
import Recommendations from "../recs/Recommendations";
import styled from "./TopPicks.module.css";
import cruel_prince from "../../images/cruel_prince.jpg";
import ugly_love from "../../images/ugly_love.jpg";

const TopPicks = () => {
  const text = (
    <>
      Top picks of the <span>month</span>
    </>
  );
  return (
    <section className={styled["top-picks"]}>
      <Container>
        <article className={styled["top-picks-info"]}>
          <Heading className="heading-md" text={text} />

          <p className="para">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
            blanditiis quis perferendis doloremque ipsa, reprehenderit saepe
            repellendus illo deleniti assumenda!
          </p>
        </article>

        <div>
          <Recommendations
            theme="dark-blue"
            bookTitle="ugly love"
            author="colleen hoover"
            genre="romance"
            src={ugly_love}
            bg="light-blue"
          />
        </div>
        <Recommendations
          theme="yellow"
          bookTitle="the cruel prince"
          author="holly black"
          genre="fantasy"
          src={cruel_prince}
          bg="light-yellow"
        />
      </Container>
    </section>
  );
};

export default TopPicks;
