import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../helpers/wrapper/Container";
import styled from "./BookDetails.module.css";
import Loading from "../../helpers/modal/Loading";

//component to show book details
const BookDetails = () => {
  // id destructured from the url
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

  //if the selectedBook is not empty, update the innerHTML value with the given data since the description includes html tags
  useEffect(() => {
    console.log(descriptionRef.current);
    if (
      selectedBook.length !== 0 &&
      selectedBook.description !== undefined &&
      descriptionRef.current !== undefined
    ) {
      descriptionRef.current.innerHTML = `${selectedBook.description}`;
    } else {
      descriptionRef.current.innerHTML = "No description available.";
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

  const src = selectedBook?.imageLinks?.thumbnail
    ? `${selectedBook?.imageLinks?.thumbnail}`
    : "https://via.placeholder.com/150";

  const coverWrap = { backgroundImage: `url(${src})` };

  return (
    <section className={styled.info}>
      {loading && <Loading />}

      {!loading && selectedBook.length !== 0 && (
        <Container className={styled["book-details-container"]}>
          <div className={styled["img-group"]}>
            <div style={coverWrap} className={styled["cover-wrap"]}></div>
            <figure className={styled.cover}>
              <img src={src} alt={selectedBook?.title} />
            </figure>
            <button>Add to library</button>
          </div>

          <article className={styled["book-info"]}>
            <h1 className={styled.title}>{selectedBook?.title}</h1>

            {selectedBook?.subtitle && (
              <p className={styled.subtitle}>{selectedBook?.subtitle}</p>
            )}

            {selectedBook?.authors && (
              <p className={styled.author}>{selectedBook?.authors[0]}</p>
            )}

            {categories && (
              <div className={styled["book-categories"]}>{categories}</div>
            )}

            <p className={styled.description} ref={descriptionRef}></p>
          </article>
        </Container>
      )}
    </section>
  );
};

export default BookDetails;
