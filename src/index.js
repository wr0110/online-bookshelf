import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./contexts/authContext";
import LibraryContextProvider from "./contexts/libraryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LibraryContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LibraryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
