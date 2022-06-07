import React, { useContext, useEffect, useState } from "react";
import styled from "../components/pagesStyles/Shelves.module.css";
import Container from "../helpers/wrapper/Container";
import { IoAddCircleSharp } from "react-icons/io5";
import Modal from "../helpers/modal/Modal";
import { AuthContext } from "../contexts/authContext";
import { useSelector } from "react-redux";
import Books from "../components/books/Books";
import ShelfActions from "../components/shelves/ShelfActions";
import CreateShelf from "../components/shelves/CreateShelf";
import { useSearchParams } from "react-router-dom";

const Shelves = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { library } = useSelector((state) => state.bookStore);
  const { shelf } = useSelector((state) => state.bookShelf);
  const [openModal, setOpenModal] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [shelfName, setShelfName] = useState("");

  //function to open the modal
  const addHandler = () => setOpenModal((state) => !state);

  const handleUrl = (shelf) => {
    setShelfName(shelf);
  };

  //update the search params when the shelf changes
  useEffect(() => {
    setSearchParams({ shelf: shelfName });
  }, [shelfName, setSearchParams]);

  //find the current user
  const user = shelf.find((shelf) => shelf.user === currentUser?.email);

  //get the shelves creates by the current user
  const links = user?.shelves?.map((shelf) => (
    <p key={shelf} onClick={() => handleUrl(shelf)}>
      {shelf}
    </p>
  ));

  useEffect(() => {
    const getBooks = () => {
      const detailsForCurrentUser = library.find(
        (shelf) => shelf.user === currentUser?.email
      );
      const all = detailsForCurrentUser?.userLibrary.map((record) => {
        return (
          <Books
            key={record.bookData.id}
            book={record.bookData}
            actionsComponent={<ShelfActions book={record.bookData} />}
          />
        );
      });
      setAllBooks(all);
    };

    getBooks();
  }, [currentUser, library]);

  return (
    <Container>
      <section className={styled.shelves}>
        <nav className={styled["shelf-navbar"]}>
          <div className={styled["shelf-links"]}>{links}</div>
          <div className={styled.add} onClick={addHandler}>
            <IoAddCircleSharp size="28px" color="#3f3d56" />
          </div>
        </nav>

        <section className="books-grid">{allBooks}</section>

        {openModal && (
          <Modal setOpenModal={setOpenModal} openModal={openModal}>
            <CreateShelf setOpenModal={setOpenModal} />
          </Modal>
        )}
      </section>
    </Container>
  );
};

export default Shelves;
