import React, { useState } from "react";
import styled from "../components/pagesStyles/Shelves.module.css";
import Container from "../helpers/wrapper/Container";
import { IoAddCircleSharp } from "react-icons/io5";
import AddToShelf from "../components/shelves/AddToShelf";
import Modal from "../helpers/modal/Modal";

const Shelves = () => {
  const [openModal, setOpenModal] = useState(false);

  //function to open the modal
  const addHandler = () => setOpenModal((state) => !state);

  return (
    <Container>
      <section className={styled.shelves}>
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

          <div className={styled.add} onClick={addHandler}>
            <IoAddCircleSharp size="28px" color="#3f3d56" />
          </div>
        </nav>

        {openModal && (
          <Modal setOpenModal={setOpenModal}>
            <AddToShelf setOpenModal={setOpenModal} />
          </Modal>
        )}
      </section>
    </Container>
  );
};

export default Shelves;
