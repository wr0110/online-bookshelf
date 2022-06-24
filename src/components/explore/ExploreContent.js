import React from "react";
import styled from "./ExploreContent.module.css";
import useExplore from "../../hooks/useExplore";

const ExploreContent = () => {
  //custom hook to fetch books
  const [loadingFictionBooks, fictionBooks] = useExplore("", "fiction");
  const [loadingRomanceBooks, romanceBooks] = useExplore("", "romance");
  const [loadingLoveBooks, loveBooks] = useExplore("", "love");
  const [loadingFantasyBooks, fantasyBooks] = useExplore("", "fantasy");
  const [loadingMysteryBooks, mysteryBooks] = useExplore("", "mystery");
  const [loadingHorrorBooks, horrorBooks] = useExplore("", "horror");
  const [loadingSciFiBooks, sciFiBooks] = useExplore("", "science fiction");
  const [loadingThrillerBooks, thrillerBooks] = useExplore("", "thriller");
  const [loadingContemporaryBooks, contemporaryBooks] = useExplore(
    "",
    "contemporary"
  );

  const contents = [
    {
      id: 1,
      title: "Fiction",
      books: fictionBooks,
      loading: loadingFictionBooks,
    },
    {
      id: 2,
      title: "Romance",
      books: romanceBooks,
      loading: loadingRomanceBooks,
    },
    { id: 3, title: "Love", books: loveBooks, loading: loadingLoveBooks },
    {
      id: 4,
      title: "Fantasy",
      books: fantasyBooks,
      loading: loadingFantasyBooks,
    },
    {
      id: 5,
      title: "Mystery",
      books: mysteryBooks,
      loading: loadingMysteryBooks,
    },
    { id: 6, title: "Horror", books: horrorBooks, loading: loadingHorrorBooks },
    { id: 7, title: "Sci-Fi", books: sciFiBooks, loading: loadingSciFiBooks },
    {
      id: 8,
      title: "Thriller",
      books: thrillerBooks,
      loading: loadingThrillerBooks,
    },

    {
      id: 9,
      title: "Contemporary",
      books: contemporaryBooks,
      loading: loadingContemporaryBooks,
    },
  ];

  const renderContents = contents.map((content, i) => {
    return (
      <div key={Date.now() + i}>
        {content.loading && "Getting  Books..."}

        {!content.loading && (
          <section>
            <h2>{content.title}</h2>
            <div className={styled["explore-books"]}>{content.books}</div>
          </section>
        )}
      </div>
    );
  });

  return <section>{renderContents}</section>;
};

export default ExploreContent;
