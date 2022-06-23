import React from "react";
import styled from "../components/pagesStyles/Shelves.module.css";
import Container from "../helpers/wrapper/Container";
import ShelfNav from "../components/shelves/ShelfNav";
import BooksForShelves from "../components/shelves/BooksForShelves";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Store } from "react-notifications-component";
import Notification from "../helpers/Notification";

const Shelves = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container>
      <section className={styled.shelves}>
        <ShelfNav
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <BooksForShelves searchParams={searchParams} />
      </section>
    </Container>
  );
};

export default Shelves;
