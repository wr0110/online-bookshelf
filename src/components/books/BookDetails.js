import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../helpers/wrapper/Container";
import styled from "./BookDetails.module.css";
import Loading from "../../helpers/modal/Loading";
import Modal from "../../helpers/modal/Modal";
import AddToLibrary from "../library/AddToLibrary";
import { AuthContext } from "../../contexts/authContext";
import Login from "../login/Login";

//component to show book details
const BookDetails = () => {
  // id destructured from the url
  const { bookId } = useParams();
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState([]);
  const [openLibraryModal, setOpenLibraryModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const descriptionRef = useRef("");

  const auth = currentUser.email && isSignedIn;

  //fetch data using the given book ID and set the selectedBook state
  useEffect(() => {
    const url = ` https://www.googleapis.com/books/v1/volumes/${bookId}`;
    const fetchById = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSelectedBook(data.volumeInfo);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchById();
  }, [bookId]);

  //if the selectedBook is not empty, update the innerHTML value with the given data since the description includes html tags
  useEffect(() => {
    if (selectedBook?.description && descriptionRef.current) {
      descriptionRef.current.innerHTML = `${selectedBook.description}`;
    }
  }, [selectedBook]);

  //remove duplicate categories
  const categorySet = new Set(selectedBook?.categories);
  const categories = [...categorySet]?.map((category, index) => {
    return (
      <p className={styled.category} key={Date.now() + index}>
        {category}
      </p>
    );
  });

  const handleLibrary = () => {
    if (auth) {
      setOpenLibraryModal((state) => !state);
    } else {
      setOpenLoginModal((state) => !state);
    }
  };

  const src = selectedBook?.imageLinks?.thumbnail
    ? `${selectedBook?.imageLinks?.thumbnail}`
    : "https://via.placeholder.com/150";

  // const coverWrap = { backgroundImage: `url(${src})` };

  return (
    <section className={styled.info}>
      {loading && <Loading />}

      {!loading && selectedBook.length !== 0 && (
        <Container className={styled["book-details-container"]}>
          <div className={styled["img-group"]}>
            <figure className={styled.cover}>
              <img src={src} alt={selectedBook?.title} />
            </figure>

            <div className={styled["btn-group"]}>
              <button onClick={handleLibrary}>Add to Library</button>
              <button>More by Author</button>
            </div>
          </div>

          <article className={styled["book-info"]}>
            <h1 className={styled.title}>{selectedBook?.title}</h1>

            {selectedBook?.subtitle && (
              <p className={styled.subtitle}>{selectedBook?.subtitle}</p>
            )}

            {selectedBook?.authors && (
              <p className={styled.author}>{selectedBook?.authors[0]}</p>
            )}

            {categories.length !== 0 && (
              <div className={styled["book-categories"]}>{categories}</div>
            )}

            <p className={styled.description} ref={descriptionRef}>
              {selectedBook?.description === undefined && (
                <p>No description available</p>
              )}
            </p>
          </article>
        </Container>
      )}

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
    </section>
  );
};

export default BookDetails;
