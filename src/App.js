import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Pages from "./pages/Pages";
import ShowNotification from "./helpers/notification/ShowNotification";
import { database } from "./firebase";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/authContext";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import GetLibraryFromFirebase from "./components/firebase/GetLibraryFromFirebase";

function App() {
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const { library } = useSelector((state) => state.bookStore);

  //Add current user's data to the database when there is a change in the library
  const auth = currentUser.email !== null && isSignedIn;

  useEffect(() => {
    //get current user's data from the library
    const id = currentUser?.userId;

    const user = library.find((shelf) => shelf.user === currentUser.email);

    const addData = async () => {
      await setDoc(doc(database, "library", id), {
        library: user?.userLibrary,
      });
    };

    if (auth && user) {
      addData();
    }
  }, [library, auth, currentUser]);

  return (
    <>
      <ReactNotifications isMobile={true} />
      <ShowNotification />
      <GetLibraryFromFirebase />
      <Pages />
    </>
  );
}

export default App;
