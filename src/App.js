import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Pages from "./pages/Pages";
import ShowNotification from "./helpers/notification/ShowNotification";
import { addLibraryToFirebase, addShelfToFirebase } from "./firebase";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import useGetDataFromFirebase from "./hooks/useGetDataFromFirebase";
import { updateLibraryState } from "./store/features/library/librarySlice";
import { updateShelf } from "./store/features/shelf/shelfSlice";

function App() {
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const { library } = useSelector((state) => state.bookStore);
  const { shelf } = useSelector((state) => state.bookShelf);
  const dataForUser = useGetDataFromFirebase();
  const dispatch = useDispatch();

  // valid if email exists and user is signed in
  const auth = currentUser.email !== null && isSignedIn;

  //add library data to the database when there is a change in the library
  useEffect(() => {
    const id = currentUser?.userId;

    // get current user
    const user = library?.find((shelf) => shelf.user === currentUser?.email);

    if (auth && user !== undefined) {
      const { userLibrary } = user;
      addLibraryToFirebase(id, userLibrary);
    }
  }, [library, auth, currentUser]);

  // add shelf data to database
  useEffect(() => {
    const id = currentUser?.userId;
    const user = shelf?.find((shelf) => shelf.user === currentUser?.email);

    if (auth && user !== undefined) {
      const { booksOnShelves, shelves } = user;

      //if shelves or booksOnShelves is undefined, set to []
      const data = {
        booksOnShelves: booksOnShelves ?? [],
        shelves: shelves ?? [],
      };

      if (data) addShelfToFirebase(id, data);
    }
  }, [currentUser, auth, shelf]);

  //when app first mounts get data from database
  useEffect(() => {
    if (currentUser?.email && !!dataForUser) {
      //destructure library and shelf
      const { library, shelf } = dataForUser;
      //if library is not null, update the store
      if (!!library) {
        const data = { email: currentUser?.email, library };
        dispatch(updateLibraryState(data));
      }

      //if shelf is not null, update the store
      if (!!shelf) {
        const { booksOnShelves, shelves } = shelf[0];
        const data = { user: currentUser?.email, booksOnShelves, shelves };
        dispatch(updateShelf(data));
      }
    }
  }, [currentUser, dispatch, dataForUser]);

  return (
    <>
      <ReactNotifications isMobile={true} />
      <ShowNotification />
      <Pages />
    </>
  );
}

export default App;
