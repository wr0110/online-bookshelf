import { Route, Routes } from "react-router-dom";
import "./App.css";
import BookDetails from "./components/books/BookDetails";
import Nav from "./components/nav/Nav";
import SearchResults from "./components/search/SearchResults";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Explore from "./pages/Explore";
import Library from "./pages/Library";
import PublicHome from "./pages/PublicHome";
import Shelves from "./pages/Shelves";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { Store } from "react-notifications-component";
import Notification from "./helpers/Notification";

function App() {
  const { feedback } = useSelector((state) => state.bookStore);
  const { shelfFeedback } = useSelector((state) => state.bookShelf);
  useEffect(() => {
    if (feedback.message !== "") {
      Store.addNotification({
        content: (
          <Notification
            type={feedback.type}
            message={feedback.message}
            title={feedback.title}
          />
        ),

        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],

        dismiss: {
          duration: 1200,
          //showIcon: true,
          // onScreen: true,
        },
      });
    }
    console.log(feedback);
  }, [feedback]);

  useEffect(() => {
    if (shelfFeedback.message !== "") {
      Store.addNotification({
        content: (
          <Notification
            type={shelfFeedback.type}
            message={shelfFeedback.message}
            title={shelfFeedback.title}
          />
        ),

        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        // width: "700px",

        dismiss: {
          duration: 1200,
          //showIcon: true,
          // onScreen: true,
        },
      });
    }
  }, [shelfFeedback]);

  return (
    <div>
      <ReactNotifications isMobile={true} />
      <Nav />
      <Routes>
        <Route path="/" exact element={<PublicHome />} />
        <Route path="/explore" element={<Explore />} />

        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shelves"
          element={
            <ProtectedRoute>
              <Shelves />
            </ProtectedRoute>
          }
        />

        <Route path="/results" element={<SearchResults />} />
        <Route path="results/:bookId" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
