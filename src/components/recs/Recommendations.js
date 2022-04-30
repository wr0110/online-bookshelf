import React from "react";
import styled from "./Recommendations.module.css";
import cruel_prince from "../../images/cruel_prince.jpg";
import { GoStar } from "react-icons/go";
import { IoAddCircleSharp } from "react-icons/io5";

const Recommendations = () => {
  let stars = [];
  for (let index = 0; index < 5; index++) {
    stars.push(<GoStar size="22px" style={{ color: " var(--yellow)" }} />);
  }

  const starsList = stars.map((star) => {
    return <span> {star}</span>;
  });

  const headingStyle = {
    color: "var(--yellow)",
  };
  const addIconStyle = {
    color: "var(--yellow)",
    position: "absolute",
    top: "105px",
    right: "15px",
  };

  return (
    <section className={styled.recs}>
      <article>
        <figure className={styled.cover}>
          <img src={cruel_prince} alt="book cover page" />
        </figure>

        <div className={styled["book-details"]}>
          <span>{starsList}</span>
          <h1 style={headingStyle}>The Cruel Prince</h1>
          <p>
            <b>Holly Black</b>
          </p>
          <p>
            <small>Fantasy</small>
          </p>
          <IoAddCircleSharp size="30px" style={addIconStyle} />
        </div>
      </article>
    </section>
  );
};

export default Recommendations;
