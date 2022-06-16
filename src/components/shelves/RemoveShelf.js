import React from "react";
import styled from "./RemoveShelf.module.css";
import { TiDelete } from "react-icons/ti";

const RemoveShelf = () => {
  return (
    <div className={styled["remove-container"]}>
      <section className={styled.remove}>
        <TiDelete size="50px" style={{ color: "var(--yellow)" }} />
        <h2>Remove Shelf</h2>
        <p>
          Are you sure you want to remove your <span>temp</span> shelf ?
        </p>
        <div className="button-actions">
          <button>Remove</button>
          <button>Cancel</button>
        </div>
      </section>
    </div>
  );
};

export default RemoveShelf;
