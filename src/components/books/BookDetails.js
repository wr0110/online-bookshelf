import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../helpers/modal/Modal";
import Container from "../../helpers/wrapper/Container";
import Button from "../button/Button";
import { GiBookshelf } from "react-icons/gi";
import styled from "./BookDetails.module.css";

//component to show book details
const BookDetails = () => {
  // parameter destructured from the url
  const { bookId } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState([]);
  const descriptionRef = useRef();

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

  /** if the selectedBook is not empty, update the innerHTML value with the given data since the description includes html tags
   */
  useEffect(() => {
    if (selectedBook.length !== 0) {
      descriptionRef.current.innerHTML = ` ${selectedBook?.description}`;
    }
  }, [selectedBook]);

  return (
    <section className={styled.info}>
      {/* show Modal when loading */}
      {loading && (
        <Modal>
          <GiBookshelf size="50px" />
        </Modal>
      )}

      {/**only show is selectedBook is not empty
       *   check is data is available or return left-hand side condition
       */}
      {selectedBook.length !== 0 && (
        <Container className={styled["book-details-container"]}>
          <div className={styled["img-group"]}>
            <figure>
              <img
                src={
                  selectedBook?.imageLinks
                    ? selectedBook?.imageLinks.smallThumbnail
                    : "https://via.placeholder.com/128x204"
                }
                alt={selectedBook?.title}
              />
            </figure>

            <Button>Add to library</Button>
          </div>

          <article className={styled["book-info"]}>
            <h1 className={styled.title}>{selectedBook?.title}</h1>

            {<p className={styled.author}>{selectedBook?.authors[0]}</p> || ""}

            <div className={styled["book-categories"]}>
              {selectedBook?.categories?.map(
                (category, index) =>
                  (
                    <p className={styled.category} key={index}>
                      {category?.split("/")}
                    </p>
                  ) || ""
              )}
            </div>

            {/* uses ref to select element */}
            <p className={styled.description} ref={descriptionRef}></p>
          </article>
        </Container>
      )}
    </section>
  );
};

export default BookDetails;
