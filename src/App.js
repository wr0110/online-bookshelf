import "./App.css";
import Nav from "./components/nav/Nav";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import Pages from "./pages/Pages";
import ShowNotification from "./helpers/notification/ShowNotification";

function App() {
  return (
    <div>
      <ReactNotifications isMobile={true} />
      <ShowNotification />
      <Nav />
      <Pages />
    </div>
  );
}

export default App;
