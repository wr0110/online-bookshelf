import React from "react";
import styled from "./Recommendations.module.css";
import { GoStar } from "react-icons/go";
import { IoAddCircleSharp } from "react-icons/io5";

const Recommendations = (props) => {
  // for loop to create 5 star icon and add them to the array
  let stars = [];
  for (let index = 0; index < 5; index++) {
    stars.push(
      <GoStar size="22px" style={{ color: ` var(--${props.theme})` }} />
    );
  }

  // map over the stars array and place each element with a span
  const starsList = stars.map((star, index) => {
    return <span key={index}>{star}</span>;
  });

  // set the color for the heading using props
  const headingStyle = {
    color: `var(--${props.theme})`,
  };

  // set the color for the icon using props
  const addIconStyle = {
    color: `var(--${props.theme})`,
    position: "absolute",
    top: "125px",
    right: "15px",
  };

  // set the background color for the article using props
  const articleStyle = {
    backgroundColor: `var(--${props.bg})`,
  };

  return (
    <section className={styled.recs}>
      <article style={articleStyle}>
        <figure className={styled.cover}>
          <img src={props.src} alt="book cover page" />
        </figure>

        <div className={styled["book-details"]}>
          <span>{starsList}</span>
          <h1 style={headingStyle}>{props.bookTitle}</h1>
          <p>
            <b>{props.author}</b>
          </p>
          <p>
            <small>{props.genre}</small>
          </p>
          <IoAddCircleSharp size="30px" style={addIconStyle} />
        </div>
      </article>
    </section>
  );
};

export default Recommendations;
