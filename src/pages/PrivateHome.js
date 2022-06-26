import React from "react";
import Genre from "../components/home/Genre";
import Hero from "../components/home/Hero";
import cover from "../images/private_cover.png";
import bookSitting from "../images/book_sitting.png";
import TopPicks from "../components/home/TopPicks";

const genreList = [
  "Crime Fiction",
  "Self-Help",
  "Fantasy",
  "Romance",
  "Humour",
  "Historical Fiction",
  "Horror",
  "Young Adult",
  "Dystopian Fiction",
];

const PrivateHome = () => {
  //Hero Props
  const heroHeading = (
    <>
      Start <span>Organizing</span> your reads
    </>
  );

  const heroText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus velit senectus in nunc ut dictum aliquam id platea. In eget amet, imperdiet tellus. Sit sit orci in eu. Quis pellentesque.";

  const buttonText = "Get Started";

  //Genre Props
  const genreHeading = (
    <>
      Seach from your <span>favourite </span> categories
    </>
  );

  return (
    <>
      <Hero
        src={cover}
        heroHeading={heroHeading}
        text={heroText}
        buttonText={buttonText}
        className="hero-alt"
      />
      <TopPicks />
      <Genre
        genreList={genreList}
        headingClassName="heading-md"
        headingText={genreHeading}
        src={bookSitting}
        alt="person reading a book"
        imgClassName="med-img"
      />
    </>
  );
};

export default PrivateHome;
