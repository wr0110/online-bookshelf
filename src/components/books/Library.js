import React from "react";
import styled from "./Library.module.css";
import readingNook from "../../images/reading_svg.png";

const Library = () => {
  const libraryCategories = ["To Be Read", "In Progress", "Completed"];

  return (
    <section className={styled["library-container"]}>
      <section className={styled.library}>
        <article>
          <h2>Where would you like to add this book?</h2>
          <article className={styled.libraryCategory}>
            <figure>
              <img src={readingNook} alt="illustation of a bookshelf" />
            </figure>
            <div>
              {libraryCategories.map((category) => {
                return <p key={category}>{category}</p>;
              })}
            </div>
          </article>
        </article>
      </section>
    </section>
  );
};

export default Library;
