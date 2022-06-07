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

  //get the books on the shelf

  const booksOnSelectedShelf = user?.booksOnShelves
    ?.filter((book) => book.shelf.includes(selectedShelf))
    .map((record) => {
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
