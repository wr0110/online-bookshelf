import React from "react";
import { Route, Routes } from "react-router-dom";
import BookDetails from "../components/books/BookDetails";
import SearchResults from "../components/search/SearchResults";
import ProtectedRoute from "../helpers/ProtectedRoute";
import Explore from "./Explore";
import Library from "./Library";
import PublicHome from "./PublicHome";
import Shelves from "./Shelves";

const Pages = () => {
  return (
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
  );
};

export default Pages;
