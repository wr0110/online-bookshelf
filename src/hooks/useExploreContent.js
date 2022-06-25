import useExplore from "./useExplore";

const useExploreContent = () => {
  //custom hook to fetch books
  const romance = useExplore("Romance");
  const spice = useExplore("spice");
  const tiktok = useExplore("Tiktok");
  const easyReads = useExplore("Easy Reads");
  const fiction = useExplore("Fiction");
  const fantasy = useExplore("Fantasy");

  //array with results from useExplore hook
  const contents = [
    { title: "Romance", books: romance },
    { title: "BookTok Sensations", books: tiktok },
    { title: "Add a little bit of Spice", books: spice },
    { title: "Fantasy", books: fantasy },
    { title: "Fiction", books: fiction },
    { title: "Read in a day", books: easyReads },
  ];
  return contents;
};

export default useExploreContent;
