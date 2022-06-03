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
