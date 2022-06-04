import React, { useContext } from "react";
import styled from "./AddToShelf.module.css";
import { useSelector } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import shelves from "../../images/shelves.svg";

const AddToShelf = () => {
  //context and store
  const { currentUser } = useContext(AuthContext);
  const { shelf } = useSelector((state) => state.bookShelf);

  const user = shelf.find((shelf) => shelf.user === currentUser?.email);

  const AllShelves = user?.shelves?.map((shelf) => <p key={shelf}>{shelf} </p>);

  return (
    <section className={styled["add-to-shelf-container"]}>
      <section className={styled["add-to-shelf"]}>
        <h2>Which shelf would you like to place this book on?</h2>
        <figure>
          <img
            src={shelves}
            alt="Illustration of a girl placing a book on a shelf"
          />
        </figure>

        <div className={styled.allShelves}>{AllShelves}</div>
      </section>
    </section>
  );
};

export default AddToShelf;
