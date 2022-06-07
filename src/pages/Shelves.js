import React from "react";
import styled from "../components/pagesStyles/Shelves.module.css";
import Container from "../helpers/wrapper/Container";
import ShelfNav from "../components/shelves/ShelfNav";
import BooksForShelves from "../components/shelves/BooksForShelves";
import { useSearchParams } from "react-router-dom";

const Shelves = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container>
      <section className={styled.shelves}>
        <ShelfNav setSearchParams={setSearchParams} />
        <BooksForShelves searchParams={searchParams} />
      </section>
    </Container>
  );
};

export default Shelves;
