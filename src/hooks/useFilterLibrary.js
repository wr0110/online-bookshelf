import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/authContext";
import Books from "../components/books/Books";
import Summary from "../components/books/Summary";
import { RiBookmarkFill } from "react-icons/ri";

import RemoveBook from "../components/books/RemoveBook";

//custom hook to filter the current user's library based on the category recieved
const useFilterLibrary = (category) => {
  const [openIconModal, setOpenIconModal] = useState(false);
  // retrieve the library from the store
  const { library } = useSelector((state) => state.bookStore);

  //destructure the current user from the context object
  const { currentUser } = useContext(AuthContext);

  //find the record for currentUser in the library array
  const detailsForCurrentUser = library.find(
    (shelf) => shelf.user === currentUser?.email
  );

  /**
   * filter the current user's userLibrary based on the category received
   * map over the filtered results and return a Book for each record
   */
  const libraryForCurrentUser = detailsForCurrentUser?.userLibrary
    .filter((record) => record.category === `${category}`)
    .map((record) => {
      return (
        <Books
          key={record.bookData.id}
          modalComponent={<Summary book={record.bookData} />}
          book={record.bookData}
          icon={<RiBookmarkFill color="white" size="22px" />}
          iconComponent={
            <RemoveBook
              book={record.bookData}
              setOpenIconModal={setOpenIconModal}
            />
          }
          openIconModal={openIconModal}
          setOpenIconModal={setOpenIconModal}
        />
      );
    });

  // return the results from the filter and map
  return libraryForCurrentUser;
};

export default useFilterLibrary;
