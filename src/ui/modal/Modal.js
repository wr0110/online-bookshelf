import React from "react";
import ReactDOM from "react-dom";
import styled from "./Modal.module.css";
import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className={styled["modal-background"]}>
      <div className={styled["modal-container"]}>
        <span className={styled.close}>
          <IoCloseCircleSharp size="30px" color="white" />
        </span>
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
