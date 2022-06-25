import React from "react";
import { Route, Routes } from "react-router-dom";
import BookDetails from "../components/books/BookDetails";
import Nav from "../components/nav/Nav";
import SearchResults from "../components/search/SearchResults";
import ProtectedRoute from "../helpers/ProtectedRoute";
import ScrollToTop from "../helpers/ScrollToTop";
import Explore from "./Explore";
import Library from "./Library";
import PublicHome from "./PublicHome";
import Shelves from "./Shelves";

const Pages = () => {
  return (
    <>
      <Nav />
      <ScrollToTop>
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
      </ScrollToTop>
    </>
  );
};

export default Pages;
