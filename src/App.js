import "./App.css";
import Nav from "./components/nav/Nav";
import PublicHome from "./pages/PublicHome";

function App() {
  return (
    <div>
      <Nav />

      <main>
        <PublicHome />
      </main>
    </div>
  );
}

export default App;
