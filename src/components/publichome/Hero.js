import React from "react";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";
import Button from "../button/Button";
import styled from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styled.hero}>
      <Container>
        <article className={styled["hero-text"]}>
          <Heading
            className="heading-lg"
            text={
              <>
                Your <span>online</span> bookshelf
              </>
            }
          />

          <p className={styled["hero-intro"]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
            velit senectus in nunc ut dictum aliquam id platea. In eget amet,
            imperdiet tellus. Sit sit orci in eu. Quis pellentesque.
          </p>

          <Button>Start Organizing</Button>
        </article>
      </Container>
    </section>
  );
};

export default Hero;
