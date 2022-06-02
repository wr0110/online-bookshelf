import React, { useEffect, useRef } from "react";
import styled from "./Summary.module.css";

// component to show the summary of the book
const Summary = (props) => {
  const snippetRef = useRef();

  //  Destructured from the book object
  const { searchInfo, title, authors, publishedDate, categories, imageLinks } =
    props.book;

  /** the textSnippet includes html tags so use useRef to include the text in the innerHTML
   * if there is no snippet then show alternative text in else case
   */
  useEffect(() => {
    if (searchInfo) {
      snippetRef.current.innerHTML = ` ${searchInfo?.textSnippet}`;
    } else snippetRef.current.innerHTML = "Visit Details & More";
  }, [searchInfo]);

  return (
    <section className={styled["book-summary"]}>
      {/* if there is no image then show placeholder image */}
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
            {publishedDate && (
              <p>{new Date(publishedDate).getFullYear().toString()}</p>
            )}
            {categories && <p>{categories[0]}</p>}
          </div>

          {/* Text Snippet */}
          <p className={styled["summary-snippet"]} ref={snippetRef}></p>
        </article>
      </div>
    </section>
  );
};

export default Summary;
