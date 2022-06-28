import React, { useState } from "react";
import styled from "./Books.module.css";
import Modal from "../../helpers/modal/Modal";
import Information from "./Information";
import RemoveBook from "./RemoveBook";
import { RiBookmarkFill } from "react-icons/ri";

// component to show each book it receives
const Books = (props) => {
  // state and props
  const [openModal, setOpenModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const { imageLinks, title } = props.book;

  // set the modal state
  const handleGetBookInfo = () => setOpenModal((state) => !state);
  const handleDelete = () => setOpenRemoveModal((state) => !state);

  return (
    <>
      <section
        className={styled.books}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <figure onClick={handleGetBookInfo}>
          <img src={imageLinks.smallThumbnail} alt={title} />
        </figure>

        {props.showDeleteIcon && isHovering && (
          <div className={styled.delete} onClick={handleDelete}>
            <div>
              <RiBookmarkFill color="white" size="22px" />
            </div>
          </div>
        )}
      </section>

      {/* modal to show the book information */}
      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <Information
            book={props.book}
            actionsComponent={props.actionsComponent}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      {/* modal to show component when the icon is clicked  */}
      {openRemoveModal && (
        <Modal setOpenModal={setOpenRemoveModal} openModal={openRemoveModal}>
          <RemoveBook book={props.book} setOpenIconModal={setOpenRemoveModal} />
        </Modal>
      )}
    </>
  );
};

export default Books;
