import React from "react";
import Heading from "../../helpers/heading/Heading";
import Container from "../../helpers/wrapper/Container";
import Button from "../button/Button";
import styled from "./Hero.module.css";

const Hero = (props) => {
  const heroStyle = { backgroundImage: `url(${props.src})` };

  return (
    <section style={heroStyle} className={styled.hero}>
      <Container>
        <article className={styled["hero-text"]}>
          <Heading className="heading-lg" text={props.heroHeading} />
          <p className="para">{props.text}</p>
          <Button>{props.buttonText}</Button>
        </article>
      </Container>
    </section>
  );
};

export default Hero;
