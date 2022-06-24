import useExplore from "./useExplore";

const useExploreContent = () => {
  //custom hook to fetch books
  const [loadingFictionBooks, fictionBooks] = useExplore("", "fiction");
  const [loadingRomanceBooks, romanceBooks] = useExplore("", "romance");
  const [loadingLoveBooks, loveBooks] = useExplore("", "love");
  const [loadingFantasyBooks, fantasyBooks] = useExplore("", "fantasy");

  //array with results from useExplore hook
  const contents = [
    { title: "Fiction", books: fictionBooks, loading: loadingFictionBooks },
    { title: "Romance", books: romanceBooks, loading: loadingRomanceBooks },
    { title: "Love", books: loveBooks, loading: loadingLoveBooks },
    { title: "Fantasy", books: fantasyBooks, loading: loadingFantasyBooks },
  ];
  return contents;
};

export default useExploreContent;
