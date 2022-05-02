import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import PublicHome from "./pages/PublicHome";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" exact element={<PublicHome />} />
      </Routes>
    </div>
  );
}

export default App;
