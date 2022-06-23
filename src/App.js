import "./App.css";
import Nav from "./components/nav/Nav";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { Store } from "react-notifications-component";
import Notification from "./helpers/Notification";
import Pages from "./pages/Pages";

function App() {
  const { feedback } = useSelector((state) => state.bookStore);
  const { shelfFeedback } = useSelector((state) => state.bookShelf);
  useEffect(() => {
    if (feedback.message !== "") {
      Store.addNotification({
        content: (
          <Notification
            type={feedback.type}
            message={feedback.message}
            title={feedback.title}
          />
        ),

        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],

        dismiss: {
          duration: 1200,
          //showIcon: true,
          // onScreen: true,
        },
      });
    }
    console.log(feedback);
  }, [feedback]);

  useEffect(() => {
    if (shelfFeedback.message !== "") {
      Store.addNotification({
        content: (
          <Notification
            type={shelfFeedback.type}
            message={shelfFeedback.message}
            title={shelfFeedback.title}
          />
        ),

        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],

        dismiss: {
          duration: 1200,
        },
      });
    }
  }, [shelfFeedback]);

  return (
    <div>
      <ReactNotifications isMobile={true} />
      <Nav />
      <Pages />
    </div>
  );
}

export default App;
