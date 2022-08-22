import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Pages from "./pages/Pages";
import ShowNotification from "./helpers/notification/ShowNotification";
import { addDataToFirebase } from "./firebase";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/authContext";
import { useSelector } from "react-redux";

// import GetLibraryFromFirebase from "./firebase/GetLibraryFromFirebase";

function App() {
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const { library } = useSelector((state) => state.bookStore);

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

  return (
    <>
      <ReactNotifications isMobile={true} />
      <ShowNotification />
      {/* {auth && <GetLibraryFromFirebase />} */}
      <Pages />
    </>
  );
}

export default App;
