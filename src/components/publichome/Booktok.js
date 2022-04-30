import React from "react";
import styled from "./Booktok.module.css";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";
import booktok from "../../images/booktok2.jpg";
import Button from "../button/Button";

const Booktok = () => {
  const heading = (
    <>
      What side of <span>tiktok</span> are you on?
    </>
  );
  return (
    <section className={styled.booktok}>
      <figure className={styled.bookmark}>
        <img src={booktok} alt="books banner from tubefilter.com" />
      </figure>
      <Container>
        <article className={styled["booktok-info"]}>
          <Heading className="heading-md" text={heading} />

          <p className="para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
            velit senectus in nunc ut dictum aliquam id platea.
          </p>
          <Button>Explore</Button>
        </article>
      </Container>
    </section>
  );
};

export default Booktok;
