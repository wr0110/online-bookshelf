import React from "react";

const ContextMenu = (props) => {
  console.log(props.selectedShelf);
  return (
    <section>
      <p>Edit</p>
      <p>Delete</p>
    </section>
  );
};

export default ContextMenu;
