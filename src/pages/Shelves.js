import React from "react";
import styled from "../components/pagesStyles/Shelves.module.css";
import Container from "../helpers/wrapper/Container";
import ShelfNav from "../components/shelves/ShelfNav";
import BooksForShelves from "../components/shelves/BooksForShelves";

const Shelves = () => {
  return (
    <Container>
      <section className={styled.shelves}>
        <ShelfNav />
        <BooksForShelves />
      </section>
    </Container>
  );
};

export default Shelves;
