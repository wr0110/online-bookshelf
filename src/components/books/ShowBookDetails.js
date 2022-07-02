import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "./BookDetails.module.css";
import { RiBookmarkFill } from "react-icons/ri";
import { AuthContext } from "../../contexts/authContext";
import AddToLibrary from "../library/AddToLibrary";
import Modal from "../../helpers/modal/Modal";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";
import Container from "../../helpers/wrapper/Container";

const ShowBookDetails = (props) => {
  const navigate = useNavigate();
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const [openLibraryModal, setOpenLibraryModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const descriptionRef = useRef("");
  const auth = currentUser.email && isSignedIn;

  const { selectedBook, isInLibrary } = props.details;
  const { authors, description, subtitle, title, categories, imageLinks } =
    selectedBook?.volumeInfo;

  //if the selectedBook is not empty, update the innerHTML value with the given data since the description includes html tags
  useEffect(() => {
    if (description && descriptionRef.current) {
      descriptionRef.current.innerHTML = `${description}`;
    }
  }, [description]);

  /** if user is signed in, open the add to library modal
   * if user is not signed in, open the login modal
   */
  const handleLibrary = () => {
    if (auth) {
      setOpenLibraryModal((state) => !state);
    } else {
      setOpenLoginModal((state) => !state);
    }
  };

  const handleAuthor = () => {
    if (authors) {
      navigate(`/results?search=${authors[0]}`);
    }
  };

  //remove duplicate categories
  const categorySet = new Set(categories);
  const allCategories = [...categorySet]?.map((category, index) => {
    return (
      <p className={styled.category} key={Date.now() + index}>
        {category}
      </p>
    );
  });

  const src = imageLinks?.thumbnail
    ? `${imageLinks?.thumbnail}`
    : "https://via.placeholder.com/150";
  return (
    <>
      <Container className={styled["book-details-container"]}>
        <div className={styled["img-group"]}>
          <figure className={styled.cover}>
            <img src={src} alt={title} />
            {isInLibrary && (
              <div className={styled.bookmarked}>
                <RiBookmarkFill
                  style={{ color: "var(--yellow)" }}
                  size="35px"
                />
              </div>
            )}
          </figure>

          <div className={styled["btn-group"]}>
            <button onClick={handleLibrary}>Add to Library</button>
            <button onClick={handleAuthor}>More by Author</button>
          </div>
        </div>

        <article className={styled["book-info"]}>
          <h1 className={styled.title}>{title}</h1>
          {subtitle && <p className={styled.subtitle}>{subtitle}</p>}
          {authors && <p className={styled.author}>{authors[0]}</p>}

          {categories && (
            <div className={styled["book-categories"]}>{allCategories}</div>
          )}

          <p className={styled.description} ref={descriptionRef}>
            {description === undefined && <p>No description available</p>}
          </p>
        </article>
      </Container>

      {openLibraryModal && (
        <Modal openModal={openLibraryModal} setOpenModal={setOpenLibraryModal}>
          <AddToLibrary
            selectedBook={selectedBook}
            setOpenModal={setOpenLibraryModal}
          />
        </Modal>
      )}

      {openLoginModal && (
        <Modal openModal={openLoginModal} setOpenModal={setOpenLoginModal}>
          <Login setOpenModal={setOpenLoginModal} />
        </Modal>
      )}
    </>
  );
};

export default ShowBookDetails;
