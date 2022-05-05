import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../helpers/modal/Modal";
import Container from "../../helpers/wrapper/Container";
import Button from "../button/Button";
import { GiBookshelf } from "react-icons/gi";

//component to show book details
const BookDetails = () => {
  // parameter destructured from the url
  const { bookId } = useParams();
  const [loading, setLoading] = useState(false);
  const testref = useRef();

  const [selectedBook, setSelectedBook] = useState([]);
  //   pref.current.textContent = `${selectedBook.description}`;
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

  useEffect(() => {
    if (selectedBook.length !== 0) {
      testref.current.innerHTML = ` ${selectedBook?.description}`;
    }

    console.log(testref);
  }, [selectedBook]);
  //console.log(selectedBook);

  return (
    <section>
      {loading && (
        <Modal>
          <GiBookshelf size="50px" />
        </Modal>
      )}
      {selectedBook.length !== 0 && (
        <Container Container>
          <div>
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

          <article>
            <h1>{selectedBook?.title}</h1>
            {/* {selectedBook !== [] && <p>{selectedBook?.authors[0]}</p>} */}

            <div>
              {selectedBook?.categories.map((category, index) => (
                <p key={index}>{category.split("/")}</p>
              ))}
            </div>

            <p className="para" ref={testref}></p>
          </article>
        </Container>
      )}
    </section>
  );
};

export default BookDetails;
