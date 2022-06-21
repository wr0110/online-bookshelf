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

  const booksOnSelectedShelf = user?.booksOnShelves?.filter((book) =>
    book.shelf.find((item) => item.shelf === selectedShelf)
  );

  //sort the books on the shelf by the time they were added to the shelf
  const sortedBooksOnSelectedShelf = booksOnSelectedShelf?.forEach(
    (element) => {
      const temp = [...element.shelf];

      //map over temp and sort the books by the time they were added to the shelf
      temp.map((item) => {
        if (item.timeAdded) {
          item.timeAdded = new Date(item.timeAdded);
        }
        return item;
      });
    }
  );

  console.log(sortedBooksOnSelectedShelf);

  //map over results and sort them by time added, newest first, each result is an object with bookdata and shelf

  //   .map((record) => {
  //     return (
  //       <Books
  //         key={record.bookData.id}
  //         book={record.bookData}
  //         actionsComponent={<ShelfActions book={record.bookData} />}
  //       />
  //     );
  //   });
  // console.log(booksOnSelectedShelf);

  // return booksOnSelectedShelf;
};

export default useFilterShelf;
