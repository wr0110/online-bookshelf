import React from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import BookDetails from "../components/books/BookDetails";
import Nav from "../components/nav/Nav";
import SearchResults from "../components/search/SearchResults";
import { AuthContext } from "../contexts/authContext";
import NoMatch from "../helpers/routes/NoMatch";
import ProtectedRoute from "../helpers/routes/ProtectedRoute";
import Explore from "./Explore";
import Library from "./Library";
import PrivateHome from "./PrivateHome";
import PublicHome from "./PublicHome";
import Shelves from "./Shelves";

const Pages = () => {
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const auth = currentUser?.email !== "" && isSignedIn;

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          exact
          element={!auth ? <PublicHome /> : <PrivateHome />}
        />

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
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default Pages;
