import { useContext } from "react";
import { useSelector } from "react-redux";
import Books from "../components/books/Books";
import LibraryActions from "../components/books/LibraryActions";
import { AuthContext } from "../contexts/authContext";

const useGetAllBooks = () => {
  // retrieve the library from the store
  const { library } = useSelector((state) => state.bookStore);
  //destructure the current user from the context object
  const { currentUser } = useContext(AuthContext);

  const detailsForCurrentUser = library.find(
    (shelf) => shelf.user === currentUser?.email
  );

  //map over each book record in the current user's library and return a Book
  const AllBooks = detailsForCurrentUser?.userLibrary.map((record) => {
    return (
      <Books
        key={record.bookData.id}
        book={record.bookData}
        showDeleteIcon={true}
        actionsComponent={<LibraryActions book={record.bookData} />}
      />
    );
  });

  return AllBooks;
};

export default useGetAllBooks;
