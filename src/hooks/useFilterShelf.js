import { useContext } from "react";
import { useSelector } from "react-redux";
import Books from "../components/books/Books";
import ShelfActions from "../components/shelves/ShelfActions";
import { AuthContext } from "../contexts/authContext";

const useFilterShelf = (selectedShelf) => {
  const { currentUser } = useContext(AuthContext);
  const { shelf } = useSelector((state) => state.bookShelf);

  //find the current user
  const user = shelf.find((shelf) => shelf.user === currentUser?.email);

  //each user has booksOnShelves
  const booksOnShelves = user?.booksOnShelves;

  //filter the booksOnShelves by the selected shelf
  const filteredBooksOnShelves = booksOnShelves
    ?.filter((book) => book.shelf.find((item) => item.shelf === selectedShelf))

    //sort by selected shelf by timeAdded (most recent first) in the shelf array
    .sort((a, b) => {
      const aTime = a.shelf.find(
        (item) => item.shelf === selectedShelf
      ).timeAdded;
      const bTime = b.shelf.find(
        (item) => item.shelf === selectedShelf
      ).timeAdded;
      return bTime - aTime;
    });

  const booksOnSelectedShelf = filteredBooksOnShelves?.map((record) => {
    return (
      <Books
        key={record.bookData.id}
        book={record.bookData}
        actionsComponent={<ShelfActions book={record.bookData} />}
      />
    );
  });

  return booksOnSelectedShelf;
};

export default useFilterShelf;
