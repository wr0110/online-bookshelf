import React from "react";
import styled from "./EmptyShelf.module.css";
import search from "../../images/search.svg";
import Button from "../button/Button";

const EmptyShelf = () => {
  return (
    <section className={styled["empty-shelf"]}>
      <figure>
        <img src={search} alt="Illustration of a girl searching the web." />
      </figure>

      <article>
        <h2> Its not a 404 error but it might as well be.</h2>
        <p>
          Looks like there are no books here, but no worries, we can fix that.
        </p>
        <Button>Explore</Button>
      </article>
    </section>
  );
};

export default EmptyShelf;
