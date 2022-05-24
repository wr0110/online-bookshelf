import React, { useState } from "react";
import styled from "./Books.module.css";
import Modal from "../../helpers/modal/Modal";

// component to show each book it receives
const Books = ({ book, modalComponent }) => {
  // state
  const [openModal, setOpenModal] = useState(false);

  //Destructured imageLink property
  const { imageLinks, title } = book;

  // if there is no image (undefined was returned) then show place holder image
  const url = imageLinks
    ? imageLinks.smallThumbnail
    : "https://via.placeholder.com/128x204";

  // set the modal state
  const handleGetBookInfo = () => setOpenModal((state) => !state);

  return (
    <section className={styled.books}>
      <figure onClick={handleGetBookInfo}>
        <img src={url} alt={title} />
      </figure>

      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <>{modalComponent}</>
        </Modal>
      )}
    </section>
  );
};

export default Books;
