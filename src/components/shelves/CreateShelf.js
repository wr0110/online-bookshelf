import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import { createShelf } from "../../store/features/shelf/shelfSlice";
import { GiBookshelf } from "react-icons/gi";
import styled from "./CreateShelf.module.css";

const CreateShelf = (props) => {
  const dispatch = useDispatch();
  const [newShelf, setNewShelf] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleCreateShelf = (e) => {
    e.preventDefault();

    if (newShelf === "") {
      alert("Please enter a shelf name");
      return;
    }

    dispatch(createShelf({ user: currentUser.email, shelf: newShelf }));
    props.setOpenModal(false);
    setNewShelf("");
  };

  return (
    <section className={styled["create-shelf-container"]}>
      <article className={styled["create-shelf"]}>
        <h2>Create New Shelf</h2>

        <p>
          Get creative and place the books in your library in custom shelves.
        </p>

        <GiBookshelf size="50px" style={{ color: "var(--yellow)" }} />

        <form
          onSubmit={handleCreateShelf}
          className={styled["create-shelf-form"]}
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

export default CreateShelf;
