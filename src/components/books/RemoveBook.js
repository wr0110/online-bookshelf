import React from "react";
import styled from "./RemoveBook.module.css";

const RemoveBook = ({ book }) => {
  return (
    <section className={styled["remove-book-container"]}>
      <section className={styled["remove-book"]}>
        <article>
          <h2>Remove This Book</h2>
          <p className={styled.prompt}>
            Are you sure you want to remove
            <span className={styled.name}> {book.title} </span>from your
            library?
          </p>

          <div className={styled.actions}>
            <button>Remove</button>

            <button>Cancel</button>
          </div>
        </article>
      </section>
    </section>
  );
};

export default RemoveBook;
