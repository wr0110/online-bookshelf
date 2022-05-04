import React from "react";
import ReactDOM from "react-dom";
import styled from "./Modal.module.css";
// import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = (props) => {
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
        {/* set the modal state to false and close the modal */}
        {/* <span
          onClick={() => props.setOpenModal(false)}
          className={styled.close}
        >
          <IoCloseCircleSharp size="30px" color="white" />
        </span> */}

        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
