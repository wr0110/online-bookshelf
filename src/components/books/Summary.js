import React from "react";
import styled from "./Summary.module.css";
import { RiAddCircleLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";

const Summary = (props) => {
  //  Destructured from the book object
  const { imageLinks, categories, publishedDate, authors, title } =
    props.book.volumeInfo;

  const { book } = props;

  return (
    <section className={styled.info}>
      <section className={styled["book-summary"]}>
        {/* image */}
        <div className={styled.summary}>
          <figure>
            <img
              src={
                imageLinks
                  ? imageLinks.smallThumbnail
                  : "https://via.placeholder.com/128x204"
              }
              alt={title}
            />
          </figure>

          <article>
            {/* Title */}
            <h1 className={styled["summary-title"]}>{title}</h1>

            {/* Author */}
            {<p className={styled["summary-author"]}>{authors?.[0]} </p> || ""}

            {/* Year and Category */}
            <div className={styled["supporting-details"]}>
              {publishedDate && <p>{new Date(publishedDate).getFullYear()}</p>}

              {categories && <p>{categories[0]}</p>}
            </div>

            {/* Text Snippet */}
            <p className={styled["summary-snippet"]}>
              {book.searchInfo
                ? book.searchInfo.textSnippet
                : "Visit Details & More"}
            </p>
          </article>
        </div>

        <div className={styled.actions}>
          <p>
            <span>
              <RiAddCircleLine size="25px" fontWeight="700" />
            </span>
            Add to Library
          </p>
          <p>
            <span>
              <MdInfoOutline size="25px" fontWeight="700" />
            </span>
            Details & More
          </p>
        </div>
      </section>
    </section>
  );
};

export default Summary;
