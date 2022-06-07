import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "./Modal.module.css";
// import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = (props) => {
  //if modal is open, prevent scrolling
  useEffect(() => {
    if (props.openModal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.openModal]);

  //todo: try handling closing the modal with useRef
  return ReactDOM.createPortal(
    // set the modal state to false and close the modal
    <div
      onClick={() => props.setOpenModal(false)}
      className={styled["modal-background"]}
    >
      {/* prevent the event from bubbling up */}
      <div
        className={styled["modal-container"]}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
