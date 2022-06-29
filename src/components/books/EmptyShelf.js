import React from "react";
import styled from "./EmptyShelf.module.css";
import Button from "../button/Button";

const EmptyShelf = (props) => {
  return (
    <section className={styled["empty-shelf"]}>
      <figure>
        <img src={props.src} alt="Illustration of a girl searching the web." />
      </figure>

      <article>
        <h2> {props.heading}</h2>
        <p>{props.message}</p>
        <Button>Explore</Button>
      </article>
    </section>
  );
};

export default EmptyShelf;
