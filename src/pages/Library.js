import React from "react";
import styled from "../components/pagesStyles/Library.module.css";
import { useSearchParams } from "react-router-dom";
import BooksForLibrary from "../components/library/BooksForLibrary";
import LibraryNav from "../components/library/LibraryNav";
import Container from "../helpers/wrapper/Container";

const Library = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <section className={styled["library-container"]}>
      <Container>
        <LibraryNav
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <BooksForLibrary
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Container>
    </section>
  );
};

export default Library;
