import { useContext } from "react";
import { useSelector } from "react-redux";
import Books from "../components/books/Books";
import ShelfActions from "../components/shelves/ShelfActions";
import { AuthContext } from "../contexts/authContext";

const useFilterShelf = (selectedShelf) => {
  //context and store
  const { currentUser } = useContext(AuthContext);
  const { shelf } = useSelector((state) => state.bookShelf);

  //find the current user, then get the books on shelves for the current user
  const user = shelf.find((shelf) => shelf.user === currentUser?.email);
  const booksOnShelves = user?.booksOnShelves;

  /**
   * filter the booksOnShelves by the selected shelf
   * sort the results for the selected shelf by timeAdded (most recent first) in the shelf array
   * map over the resulting array and return the book data (Book component)
   * */
  const filteredBooksAndSortedBooks = booksOnShelves
    ?.filter((book) => book.shelf.find((item) => item.shelf === selectedShelf))
    .sort((a, b) => {
      const aTime = a.shelf.find(
        (item) => item.shelf === selectedShelf
      ).timeAdded;
      const bTime = b.shelf.find(
        (item) => item.shelf === selectedShelf
      ).timeAdded;
      return bTime - aTime;
    })
    .map((record) => {
      return (
        <Books
          key={record.bookData.id}
          book={record.bookData}
          actionsComponent={<ShelfActions book={record.bookData} />}
        />
      );
    });

  return filteredBooksAndSortedBooks;
};

export default useFilterShelf;
