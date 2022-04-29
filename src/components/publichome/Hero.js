import React from "react";
import Heading from "../../ui/heading/Heading";
import Container from "../../ui/wrapper/Container";
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
        </article>
      </Container>
    </section>
  );
};

export default Hero;
