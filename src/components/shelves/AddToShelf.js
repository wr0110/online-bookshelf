import React, { useContext, useEffect } from "react";
import styled from "./AddToShelf.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import shelves from "../../images/shelves.svg";
import {
  addToShelf,
  getShelvesForCurrentBook,
} from "../../store/features/shelf/shelfSlice";

const AddToShelf = (props) => {
  //context and store
  const { currentUser } = useContext(AuthContext);
  const { shelf, currentBookShelves } = useSelector((state) => state.bookShelf);
  const dispatch = useDispatch();

  //function to dispatch action to add book to shelf
  const handleSelectedShelf = (shelf) => {
    dispatch(
      addToShelf({ user: currentUser.email, bookData: props.book, shelf })
    );
  };

  //everytime there is a change in the shelf, check if the selected book is already in the current user shelf
  useEffect(() => {
    dispatch(
      getShelvesForCurrentBook({
        user: currentUser.email,
        bookData: props.book,
      })
    );
  }, [dispatch, currentUser.email, props.book, shelf]);

  //find the data for the current user
  const user = shelf.find((shelf) => shelf.user === currentUser?.email);

  //get all the shelves created by the current user
  const AllShelves = user?.shelves?.map((shelf) => {
    //check if the selected book is already in the shelf
    const exists = currentBookShelves.includes(shelf);
    return (
      <p
        key={shelf}
        className={exists ? styled.onShelf : styled.offShelf}
        onClick={() => handleSelectedShelf(shelf)}
      >
        {shelf}
      </p>
    );
  });

  return (
    <section className={styled["add-to-shelf-container"]}>
      <section className={styled["add-to-shelf"]}>
        <h2>
          Which shelf would you like to place <span>{props.book.title}</span>{" "}
          on?
        </h2>
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
