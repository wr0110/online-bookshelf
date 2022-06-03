import React from "react";
import styled from "../components/pagesStyles/Shelves.module.css";
import Container from "../helpers/wrapper/Container";
import { IoAddSharp } from "react-icons/io5";

const Shelves = () => {
  return (
    <section className={styled.shelves}>
      <Container>
        <nav className={styled["shelf-navbar"]}>
          <p>Books</p>

          <div className={styled["shelf-links"]}>
            <p>Allk alkc </p>
            <p>All ,acnlk</p>
            <p>All </p>
            <p>Allkn kl </p>
            <p>Allkncajk </p>
            <p>Test </p>
            <p>Test </p>
            <p>Test </p>
            <p>Test </p>
            <p>Test </p>
            <p>Test </p>
            <p>Test </p>
            <p>Test </p>
            <p>Test </p>
          </div>
          <div>
            <IoAddSharp size="20px" />
          </div>
        </nav>
      </Container>
    </section>
  );
};

export default Shelves;
