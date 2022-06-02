import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import { removeBookFromLibrary } from "../../store/features/library/librarySlice";
import styled from "./RemoveBook.module.css";

const RemoveBook = ({ book, setOpenIconModal }) => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  // function remove the book from the library
  const removeHandler = () => {
    dispatch(
      removeBookFromLibrary({ user: currentUser.email, bookId: book.id })
    );
    setOpenIconModal(false);
    alert(`${book.title} has been removed from your library`);
  };

  return (
    <section className={styled["remove-book-container"]}>
      <section className={styled["remove-book"]}>
        <article>
          <h2>Remove This Book</h2>
          <p className={styled.prompt}>
            Are you sure you want to remove
            <span className={styled.name}> {book.title} </span>from your
            library?
          </p>

          <div className={styled.actions}>
            <button onClick={removeHandler}>Remove</button>

            <button onClick={() => setOpenIconModal(false)}>Cancel</button>
          </div>
        </article>
      </section>
    </section>
  );
};

export default RemoveBook;
