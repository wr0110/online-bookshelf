import React, { useContext } from "react";
import styled from "./UserLibrary.module.css";
import readingNook from "../../images/reading_svg.png";
import { AuthContext } from "../../contexts/authContext";
import { useDispatch } from "react-redux";
import { addBookToLibrary } from "../../store/features/library/librarySlice";

const UserLibrary = (props) => {
  const dispatch = useDispatch();

  //destructured from library context
  const { currentUser } = useContext(AuthContext);

  const libraryCategories = ["To Be Read", "In Progress", "Completed"];

  const book = props.selectedBook;

  //function to add the user and their selected book to the library
  const addToLibrary = (category) => {
    dispatch(
      addBookToLibrary({
        selectedBook: { book, category },
        user: currentUser.email,
      })
    );

    props.setOpenModal(false);
  };

  return (
    <section className={styled["library-container"]}>
      <section className={styled.library}>
        <article>
          <h2>Where would you like to add this book?</h2>
          <article className={styled.libraryCategory}>
            <figure>
              <img src={readingNook} alt="illustation of a bookshelf" />
            </figure>
            <div>
              {libraryCategories.map((category) => {
                return (
                  <p key={category} onClick={() => addToLibrary(category)}>
                    {category}
                  </p>
                );
              })}
            </div>
          </article>
        </article>
      </section>
    </section>
  );
};

export default UserLibrary;
