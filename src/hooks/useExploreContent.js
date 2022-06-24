import useExplore from "./useExplore";

const useExploreContent = () => {
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
    { title: "Fiction", books: fictionBooks, loading: loadingFictionBooks },
    { title: "Romance", books: romanceBooks, loading: loadingRomanceBooks },
    { title: "Love", books: loveBooks, loading: loadingLoveBooks },
    { title: "Fantasy", books: fantasyBooks, loading: loadingFantasyBooks },
    { title: "Mystery", books: mysteryBooks, loading: loadingMysteryBooks },
    { title: "Horror", books: horrorBooks, loading: loadingHorrorBooks },
    { title: "Sci-Fi", books: sciFiBooks, loading: loadingSciFiBooks },
    {
      title: "Thriller",
      books: thrillerBooks,
      loading: loadingThrillerBooks,
    },

    {
      title: "Contemporary",
      books: contemporaryBooks,
      loading: loadingContemporaryBooks,
    },
  ];
  return contents;
};

export default useExploreContent;
