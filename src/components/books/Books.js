import React, { useState } from "react";
import styled from "./Books.module.css";
import Modal from "../../helpers/modal/Modal";

// component to show each book it receives
const Books = ({ book, modalComponent, icon }) => {
  // state
  const [openModal, setOpenModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  //Destructured imageLink property
  const { imageLinks, title } = book;

  // if there is no image (undefined was returned) then show place holder image
  const url = imageLinks
    ? imageLinks.smallThumbnail
    : "https://via.placeholder.com/128x204";

  // set the modal state
  const handleGetBookInfo = () => {
    setOpenModal((state) => !state);
  };

  const handleDelete = () => {
    // e.stopImmediatePropagation();
    console.log("hi");
  };

  return (
    <>
      <section
        className={styled.books}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <figure onClick={handleGetBookInfo}>
          <img src={url} alt={title} />
        </figure>

        {isHovering && (
          <div className={styled.delete} onClick={handleDelete}>
            <div>{icon}</div>
          </div>
        )}
      </section>
      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <>{modalComponent}</>
        </Modal>
      )}
    </>
  );
};

export default Books;
