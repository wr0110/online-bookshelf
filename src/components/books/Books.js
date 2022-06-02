import React, { useState } from "react";
import styled from "./Books.module.css";
import Modal from "../../helpers/modal/Modal";

// component to show each book it receives
const Books = (props) => {
  // state
  const [openModal, setOpenModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  //Destructured imageLink property
  const { imageLinks, title } = props.book;

  // if there is no image (undefined was returned) then show place holder image
  const url = imageLinks
    ? imageLinks.smallThumbnail
    : "https://via.placeholder.com/128x204";

  // set the modal state
  const handleGetBookInfo = () => {
    setOpenModal((state) => !state);
  };

  const handleDelete = () => props.setOpenIconModal((state) => !state);

  return (
    <>
      <section
        className={styled.books}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <figure onClick={handleGetBookInfo}>
          <img src={url} alt={title} />
        </figure>

        {isHovering && (
          <div className={styled.delete} onClick={handleDelete}>
            <div>{props.icon}</div>
          </div>
        )}
      </section>

      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <>{props.modalComponent}</>
        </Modal>
      )}

      {props.openIconModal && (
        <Modal setOpenModal={props.setOpenIconModal}>
          <>{props.iconComponent}</>
        </Modal>
      )}
    </>
  );
};

export default Books;
