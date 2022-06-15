import React from "react";
import styled from "./ContextMenu.module.css";

const ContextMenu = (props) => {
  console.log(props.selectedShelf);

  const menuStyle = {
    top: props.positions.top + 20 + "px",
    left: props.positions.left - 40 + "px",
  };
  return (
    <section className={styled["context-menu"]} style={menuStyle}>
      <p>Rename Shelf</p>
      <p>Delete Shelf</p>
    </section>
  );
};

export default ContextMenu;
