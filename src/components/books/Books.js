import React, { useState } from "react";
import styled from "./Books.module.css";
import Modal from "../../helpers/modal/Modal";
import Information from "./Information";
import RemoveBook from "./RemoveBook";
import { RiBookmarkFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

// component to show each book it receives
const Books = (props) => {
  // state and props
  const { library } = useSelector((state) => state.bookStore);
  const { shelf } = useSelector((state) => state.bookShelf);
  const { currentUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const { imageLinks, title } = props.book;

  // set the modal state
  const handleGetBookInfo = () => setOpenModal((state) => !state);
  const handleDelete = () => setOpenRemoveModal((state) => !state);

  //get booksOnShelves for the current user
  const user = shelf.find((record) => record.user === currentUser?.email);

  const libraryUser = library.find(
    (record) => record.user === currentUser?.email
  );

  //check if this book is on the current user's shelves and return boolean
  const isOnShelves = user?.booksOnShelves?.find(
    (book) => book.bookData.id === props.book.id
  );

  //check if this book is on the current user's library and return boolean
  const isInLibrary = libraryUser?.userLibrary?.find(
    (book) => book.bookData.id === props.book.id
  );

  const showLibraryBookmark = props.showLibraryBookmark && isInLibrary;
  const showShelfBookmark = props.showShelfBookmark && isOnShelves;

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
            <RiBookmarkFill style={{ color: "var(--yellow)" }} size="35px" />
          </div>
        )}

        {(showShelfBookmark || showLibraryBookmark) && (
          <div className={styled.bookmarked}>
            <RiBookmarkFill style={{ color: "var(--yellow)" }} size="35px" />
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
