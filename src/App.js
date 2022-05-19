import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllBooks from "./components/library/AllBooks";
import BookDetails from "./components/books/BookDetails";
import Completed from "./components/library/Completed";
import InProgress from "./components/library/InProgress";
import ToBeRead from "./components/library/ToBeRead";
import Nav from "./components/nav/Nav";
import SearchResults from "./components/search/SearchResults";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Explore from "./pages/Explore";
import Library from "./pages/Library";
import PublicHome from "./pages/PublicHome";

function App() {
  return (
    <div>
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
        >
          <Route path="all" element={<AllBooks />} />
          <Route path="to-be-read" element={<ToBeRead />} />
          <Route path="in-progress" element={<InProgress />} />
          <Route path="completed" element={<Completed />} />
        </Route>

        <Route path="/results" element={<SearchResults />} />
        <Route path="results/:bookId" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
