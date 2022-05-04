import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import styled from "./Books.module.css";

const Books = ({ book }) => {
  //Destructured imageLink property
  const { imageLinks, categories, authors, title } = book.volumeInfo;

  return (
    <section className={styled.books}>
      <article className={styled.book}>
        <figure>
          <img
            src={
              imageLinks
                ? imageLinks.smallThumbnail
                : "https://via.placeholder.com/128x204"
            }
            alt="book cover page"
          />
        </figure>

        <div className={styled.details}>
          <h1>{title}</h1>
          <p>
            <b>{authors?.[0]}</b>
          </p>
          {categories?.map((genre) => (
            <p key={genre}>
              <small>{genre}</small>
            </p>
          ))}

          <p className={styled.link}>
            <strong>See Details</strong>
          </p>

          <IoAddCircleSharp
            className={styled.addIcon}
            size="35px"
            style={{ color: "var(--dark-blue)" }}
          />
        </div>
      </article>
    </section>
  );
};

export default Books;
