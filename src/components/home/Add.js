import React from "react";
import Heading from "../../helpers/heading/Heading";
import Container from "../../helpers/wrapper/Container";
import Button from "../button/Button";
import add from "../../images/add.png";
import styled from "./Add.module.css";

const Add = () => {
  return (
    <section className={styled.add}>
      <Container className={styled.wrap}>
        <article className={styled["add-info"]}>
          <Heading
            className="heading-md"
            text={
              <>
                Add to your <span> library</span>
              </>
            }
          />
          <p className="para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
            velit senectus in nunc ut dictum aliquam id platea. In eget amet,
            imperdiet tellus. Sit sit orci in eu. Quis pellentesque.
          </p>
          <Button>Get Started</Button>
        </article>

        <figure>
          <img src={add} alt="illustration of a girl with a checklist " />
        </figure>
      </Container>
    </section>
  );
};

export default Add;
