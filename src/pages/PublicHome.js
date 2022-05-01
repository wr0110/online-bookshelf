import React from "react";
import Booktok from "../components/publichome/Booktok";
import Genre from "../components/publichome/Genre";
import Hero from "../components/publichome/Hero";
import Review from "../components/publichome/Review";
import TopPicks from "../components/publichome/TopPicks";
import reading_svg from "../images/reading_svg.png";

const PublicHome = () => {
  // props to pass to the genre component
  const genreList = [
    "Fiction",
    "Fantasy",
    "Romance",
    "Humour",
    "Horror",
    "New Adult",
  ];

  // props to pass to the genre component
  const text = (
    <>
      All your favourites in <span>one</span> place
    </>
  );

  // props to pass to the genre component
  const paragraph =
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus eleifend cras praesent purus nec, quis aliquet.";

  return (
    <section>
      <Hero />
      <Genre
        genreList={genreList}
        headingClassName="heading-md"
        headingText={text}
        src={reading_svg}
        alt="person reading a book"
        paragraph={paragraph}
      />
      {/* <Booktok /> */}
      <TopPicks />

      <Review />
    </section>
  );
};

export default PublicHome;
