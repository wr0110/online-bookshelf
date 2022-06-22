import React from "react";
import styled from "./Notification.module.css";
import { useSelector } from "react-redux";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";

const Notification = () => {
  const { feedback } = useSelector((state) => state.bookStore);

  //switch case to determine the type of icon
  const icon = () => {
    switch (feedback.type) {
      case "success":
        return (
          <BsBookmarkCheckFill
            size="30px"
            style={{ color: "var(--dark-blue)" }}
          />
        );
      case "warning":
        return <RiErrorWarningFill size="30px" color="#856404" />;

      default:
        return (
          <BsBookmarkCheckFill
            size="30px"
            style={{ color: "var(--dark-blue)" }}
          />
        );
    }
  };

  return (
    <article className={`${styled[feedback.type]} ${styled.feedback} `}>
      <div className={styled.icon}>{icon()}</div>
      <div>
        <h1 className={styled.title}>{feedback.title}</h1>
        <p className={styled.message}>{feedback.message}</p>
      </div>
    </article>
  );
};

export default Notification;
