import React from "react";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";
import styled from "./TopPicks.module.css";

const TopPicks = () => {
  const text = (
    <>
      Top picks of the <span>month</span>{" "}
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

        <div></div>
      </Container>
    </section>
  );
};

export default TopPicks;
