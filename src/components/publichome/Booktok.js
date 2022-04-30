import React from "react";
import styled from "./Booktok.module.css";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";
import bookmark from "../../images/bookmark.png";
import Button from "../button/Button";

const Booktok = () => {
  const heading = (
    <>
      What side of <span>tiktok</span> are you on?
    </>
  );
  return (
    <section className={styled.booktok}>
      <Container>
        <figure className={styled.bookmark}>
          <img src={bookmark} alt="" />
        </figure>

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
