import React, { useState } from "react";
import Button from "../button/Button";
import styled from "./AddToShelf.module.css";

const AddToShelf = () => {
  const [newShelf, setNewShelf] = useState("");

  const handleAddToShelf = (e) => {
    e.preventDefault();
    console.log(newShelf);
    setNewShelf("");
  };

  return (
    <section className={styled["add-to-shelf-container"]}>
      <article className={styled["add-to-shelf"]}>
        <h2>Create New Shelf</h2>
        <p>
          Get creative and place the books in your library in custom shelves.
        </p>

        <form
          onSubmit={handleAddToShelf}
          className={styled["add-to-shelf-form"]}
        >
          <input
            type="text"
            placeholder="Eg. My Mafia Faves"
            value={newShelf}
            onChange={(e) => setNewShelf(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </article>
    </section>
  );
};

export default AddToShelf;
