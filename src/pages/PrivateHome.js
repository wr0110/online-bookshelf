import React from "react";
import Genre from "../components/home/Genre";
import Hero from "../components/home/Hero";
import cover from "../images/private_cover.png";
import bookSitting from "../images/book_sitting.png";
import TopPicks from "../components/home/TopPicks";
import Add from "../components/home/Add";
import Footer from "../components/nav/Footer";

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
      Start <span>organizing</span>
    </>
  );

  const heroText =
    "BookMark makes it easy for you to find and keep track of the books you want to read. Add to your library and create shelves to help stay organized. Keep track of the books you've read, the books you're currently reading, the books you want to read and those hard to finish books.";

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
      <Add />
      <TopPicks
        text={
          <>
            We think you <span>might like</span> these
          </>
        }
        paragraph="Looking for something new and exciting to read? Check out these top picks for you. We are making it easier for you to get started with a curated list of some of our favourites."
      />
      <Genre
        genreList={genreList}
        headingClassName="heading-md"
        headingText={genreHeading}
        src={bookSitting}
        alt="person reading a book"
        imgClassName="med-img"
      />
      <Footer />
    </>
  );
};

export default PrivateHome;
