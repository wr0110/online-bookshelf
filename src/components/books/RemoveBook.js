import React, { useContext } from "react";
import styled from "./RemoveBook.module.css";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import { removeBookFromLibrary } from "../../store/features/library/librarySlice";
import { TiDelete } from "react-icons/ti";
import { removeBookFromAllShelves } from "../../store/features/shelf/shelfSlice";

const RemoveBook = ({ book, setOpenIconModal }) => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  // function remove the book from the library
  const removeHandler = async () => {
    const data = { user: currentUser.email, bookId: book.id };

    await Promise.all([
      dispatch(removeBookFromLibrary(data)),
      dispatch(removeBookFromAllShelves(data)),
    ]);
    await setOpenIconModal(false);
    alert(`${book.title} has been removed from your library`);
  };

  return (
    <section className={styled["remove-book-container"]}>
      <section className={styled["remove-book"]}>
        <article>
          <TiDelete size="50px" style={{ color: "var(--yellow)" }} />
          <h2>Remove This Book</h2>
          <p className={styled.prompt}>
            Are you sure you want to remove
            <span className={styled.name}> {book.title} </span>from your
            library? This will also remove it from your shelves.
          </p>

          <div className="button-actions">
            <button onClick={removeHandler}>Remove</button>
            <button onClick={() => setOpenIconModal(false)}>Cancel</button>
          </div>
        </article>
      </section>
    </section>
  );
};

export default RemoveBook;
