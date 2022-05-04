import React from "react";
import styled from "./Books.module.css";

const Books = ({ book }) => {
  //Destructured imageLink property
  const { imageLinks } = book.volumeInfo;

  return (
    <section className={styled.books}>
      <div>
        {/* if there is no image then set placeholder image */}
        <figure>
          <img
            src={
              imageLinks
                ? imageLinks.smallThumbnail
                : "https://via.placeholder.com/128x204"
            }
            alt={book.volumeInfo.title}
          />
        </figure>
      </div>
    </section>
  );
};

export default Books;
