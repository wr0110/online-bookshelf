import React, { useContext } from "react";
import styled from "./UserLibrary.module.css";
import readingNook from "../../images/reading_svg.png";
import { LibraryContext } from "../../contexts/libraryContext";
import { ACTIONS } from "../../reducers/bookReducer";
import { AuthContext } from "../../contexts/authContext";

const UserLibrary = (props) => {
  //destructured from library context
  const { dispatch } = useContext(LibraryContext);
  const { currentUser } = useContext(AuthContext);

  const libraryCategories = ["To Be Read", "In Progress", "Completed"];

  const book = props.selectedBook.volumeInfo;

  //function to add the selected book to the library
  const addToLibrary = (category) => {
    dispatch({
      type: ACTIONS.ADD_TO_LIBRARY,
      payload: {
        book: `${book}`,
        category,
        user: currentUser.email,
      },
    });
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
