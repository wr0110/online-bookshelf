import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Pages from "./pages/Pages";
import ShowNotification from "./helpers/notification/ShowNotification";

function App() {
  return (
    <>
      <ReactNotifications isMobile={true} />
      <ShowNotification />
      <Pages />
    </>
  );
}

export default App;
