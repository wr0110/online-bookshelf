import React from "react";
import Heading from "../../helpers/heading/Heading";
import Container from "../../helpers/wrapper/Container";
import Button from "../button/Button";
import styled from "./Review.module.css";
import { reviews } from "./reviews";
import { GoStar } from "react-icons/go";

const Review = () => {
  // for loop to create 5 star icon and add them to the array
  let stars = [];
  for (let index = 0; index < 5; index++) {
    stars.push(<GoStar size="22px" style={{ color: ` var(--yellow)` }} />);
  }

  // map over the stars array and place each element with a span
  const starsList = stars.map((star, index) => {
    return <span key={index}>{star}</span>;
  });

  //props for heading component
  const heading = (
    <>
      See what <span> others </span>
      are saying
    </>
  );

  const reviewList = reviews.map((review) => {
    return (
      <article key={review.id} className={styled.review}>
        <p>
          <b>{review.name}</b>
        </p>
        {starsList}

        <p className="para">{review.review}</p>
      </article>
    );
  });

  return (
    <section className={styled.reviews}>
      <Container>
        <article className={styled["reviews-info"]}>
          <Heading className="heading-md" text={heading} />

          <p className="para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <Button>Start Organizing</Button>
        </article>
        <section className={styled["review-list"]}>{reviewList}</section>
      </Container>
    </section>
  );
};

export default Review;
