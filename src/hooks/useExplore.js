import Books from "../components/books/Books";
import LibraryActions from "../components/library/LibraryActions";
import { exploreBooks } from "../components/explore/ExploreBooks";

const useExplore = (subject) => {
  const results = exploreBooks?.filter((book) =>
    book.subject?.includes(subject)
  );

  //sort in a random order
  const random = results?.sort(() => Math.random() - 0.5);

  /**map over the array and return a Book with the info
   * destucture properties from the book object and pass them as props
   */
  const allBooks = random?.map((book) => {
    const { id, searchInfo } = book;
    const { title, authors, publishedDate, categories, imageLinks } =
      book.volumeInfo;

    const bookData = {
      id,
      searchInfo,
      title,
      authors,
      publishedDate,
      categories,
      imageLinks,
    };
    return (
      <Books
        key={id}
        book={bookData}
        actionsComponent={<LibraryActions book={bookData} />}
        showLibraryBookmark={true}
      />
    );
  });

  return allBooks;
};

export default useExplore;
