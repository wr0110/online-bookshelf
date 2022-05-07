import React, { useState } from "react";
import styled from "./Books.module.css";
import Modal from "../../helpers/modal/Modal";
import Summary from "./Summary";

// component to show each book it receives
const Books = ({ book }) => {
  // state
  const [openModal, setOpenModal] = useState(false);

  //Destructured imageLink property
  const { imageLinks, title } = book.volumeInfo;

  // set the modal state
  const handleGetBookInfo = () => setOpenModal((state) => !state);

  return (
    <section className={styled.books}>
      {/* if there is no image (undefined was returned) then show place holder image */}
      <figure onClick={handleGetBookInfo}>
        <img
          src={
            imageLinks
              ? imageLinks.smallThumbnail
              : "https://via.placeholder.com/128x204"
          }
          alt={title}
        />
      </figure>

      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <Summary book={book} />
        </Modal>
      )}
    </section>
  );
};

export default Books;
