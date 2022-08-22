import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Pages from "./pages/Pages";
import ShowNotification from "./helpers/notification/ShowNotification";
import { addDataToFirebase } from "./firebase";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import useGetDataFromFirebase from "./hooks/useGetDataFromFirebase";
import { updateLibraryState } from "./store/features/library/librarySlice";

function App() {
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const { library } = useSelector((state) => state.bookStore);
  const dataForUser = useGetDataFromFirebase();
  const dispatch = useDispatch();

  // valid if email exists and user is signed in
  const auth = currentUser.email !== null && isSignedIn;

  //Add current user's data to the database when there is a change in the library
  useEffect(() => {
    const id = currentUser?.userId;
    const user = library?.find((shelf) => shelf.user === currentUser.email);

    if (auth && user !== undefined) {
      const { userLibrary } = user;
      addDataToFirebase(userLibrary, id);
    }
  }, [library, auth, currentUser]);

  //when app first mounts get data from database
  useEffect(() => {
    if (currentUser?.email && !!dataForUser) {
      const { library } = dataForUser;
      const data = { email: currentUser?.email, library };
      if (!!library) dispatch(updateLibraryState(data));
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
