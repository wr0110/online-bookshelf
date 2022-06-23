import React, { useEffect } from "react";
import { Store } from "react-notifications-component";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const ShowNotification = () => {
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
          pauseOnHover: true,
        },
      });
    }
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
          pauseOnHover: true,
        },
      });
    }
  }, [shelfFeedback]);
  return <div></div>;
};

export default ShowNotification;
