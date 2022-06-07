import { useContext } from "react";
import { useSelector } from "react-redux";
import Books from "../components/books/Books";
import ShelfActions from "../components/shelves/ShelfActions";
import { AuthContext } from "../contexts/authContext";

const useGetAllShelfBooks = () => {
  const { currentUser } = useContext(AuthContext);
  const { library } = useSelector((state) => state.bookStore);
  const detailsForCurrentUser = library.find(
    (shelf) => shelf.user === currentUser?.email
  );
  const all = detailsForCurrentUser?.userLibrary.map((record) => {
    return (
      <Books
        key={record.bookData.id}
        book={record.bookData}
        actionsComponent={<ShelfActions book={record.bookData} />}
      />
    );
  });

  return all;
};

export default useGetAllShelfBooks;
