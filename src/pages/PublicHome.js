import React from "react";
import Booktok from "../components/home/Booktok";
import Genre from "../components/home/Genre";
import Hero from "../components/home/Hero";
import Review from "../components/home/Review";
import TopPicks from "../components/home/TopPicks";
import reading_svg from "../images/reading_svg.png";
import covers from "../images/covers.png";

// props to pass to the genre component
const genreList = [
  "Fiction",

  "Fantasy",
  "Romance",
  "Humour",
  "Horror",
  "New Adult",
  "Non-Fiction",
  "Mystery",
];

const PublicHome = () => {
  //Hero Props
  const heroHeading = (
    <>
      Your <span>online</span> bookshelf
    </>
  );

  const heroText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus velit senectus in nunc ut dictum aliquam id platea. In eget amet, imperdiet tellus. Sit sit orci in eu. Quis pellentesque.";

  const buttonText = "Start Organizing";

  // props to pass to the genre component
  const text = (
    <>
      All your favourites in <span>one</span> place
    </>
  );

  // props to pass to the genre component
  const paragraph =
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus eleifend cras praesent purus nec, quis aliquet.";

  // props to pass to the top picks component

  return (
    <section>
      <Hero
        src={covers}
        text={heroText}
        buttonText={buttonText}
        heroHeading={heroHeading}
      />
      <Genre
        genreList={genreList}
        headingClassName="heading-md"
        headingText={text}
        src={reading_svg}
        alt="person reading a book"
        paragraph={paragraph}
      />
      <TopPicks
        text={
          <>
            Top picks of the <span>month</span>
          </>
        }
        paragraph="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
            blanditiis quis perferendis doloremque ipsa, reprehenderit saepe
            repellendus illo deleniti assumenda!"
      />
      <Booktok />
      <Review />
    </section>
  );
};

export default PublicHome;
