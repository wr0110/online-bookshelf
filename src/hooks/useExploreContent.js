import useExplore from "./useExplore";

const useExploreContent = () => {
  //custom hook to fetch books
  const romance = useExplore("Romance");
  const spice = useExplore("spice");
  const helen = useExplore("Helen");
  const tiktok = useExplore("Tiktok");
  const easyReads = useExplore("Easy Reads");

  //array with results from useExplore hook
  const contents = [
    { title: "Romance", books: romance },
    { title: "Add a little bit of Spice", books: spice },
    { title: "From Helen Hoang", books: helen },
    { title: "BookTok Sensations", books: tiktok },
    { title: "Read in a day", books: easyReads },
  ];
  return contents;
};

export default useExploreContent;
