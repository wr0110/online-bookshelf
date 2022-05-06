import React, { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Modal from "../../helpers/modal/Modal";
import styled from "./Books.module.css";

// component to show each book it receives

const Books = ({ book }) => {
  const [showBookInfo, setShowBookInfo] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  //Destructured imageLink property
  const { imageLinks, categories, authors, title } = book.volumeInfo;

  const handleGetBookInfo = () => setOpenModal((state) => !state);

  //navigate to the book details page for the specified book
  // const handleDetails = () => {
  //   navigate(`/results/${book.id}`);
  // };

  //map over the categories array and return a paragraph with the current category
  // const genre = categories?.map((category) => (
  //   <p key={category}>
  //     <small>{category}</small>
  //   </p>
  // ));

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

      {openModal && <Modal setOpenModal={setOpenModal}>{title}</Modal>}
    </section>
  );
};

export default Books;

//  <section className={styled.books}>
//    <article className={styled.book}>
//      {/* if there is no image (undefined was returned) then show place holder image */}
//      <figure>
//        <img
//          src={
//            imageLinks
//              ? imageLinks.smallThumbnail
//              : "https://via.placeholder.com/128x204"
//          }
//          alt={title}
//        />
//      </figure>

//      <div className={styled.details}>
//        <h1>{title}</h1>
//        <p>
//          <b>{authors?.[0]}</b>
//        </p>

//        {genre}

//        <p className={styled.link} onClick={handleDetails}>
//          <strong>See Details</strong>
//        </p>

//        <IoAddCircleSharp
//          className={styled.addIcon}
//          size="40px"
//          style={{ color: "var(--dark-blue)" }}
//        />
//      </div>
//    </article>
//  </section>;
