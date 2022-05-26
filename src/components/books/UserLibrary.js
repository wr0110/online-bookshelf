import React, { useContext, useEffect, useMemo } from "react";
import styled from "./UserLibrary.module.css";
import readingNook from "../../images/reading_svg.png";
import { AuthContext } from "../../contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookToLibrary,
  checkIfBookAlreadyExistsInCurrentUserLibrary,
} from "../../store/features/library/librarySlice";

const libraryCategories = ["To Be Read", "In Progress", "Completed", "DNF"];

const UserLibrary = (props) => {
  //store and context
  const dispatch = useDispatch();
  const { bookAlreadyInLibraryCategory } = useSelector(
    (state) => state.bookStore
  );
  const { currentUser } = useContext(AuthContext);

  const book = props.selectedBook;

  //return empty string if the data is undefined
  const bookCategory = book.categories === undefined ? "" : book.categories;
  const info = book.searchInfo === undefined ? "" : book.searchInfo;

  const bookData = useMemo(() => {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      publishedDate: book.publishedDate,
      imageLinks: book.imageLinks,
      categories: bookCategory,
      searchInfo: info,
    };
  }, [book, bookCategory, info]);

  //function to add the user and the selected book to the library
  const addToLibrary = async (category) => {
    dispatch(
      addBookToLibrary({
        selectedBook: { bookData, category },
        user: currentUser.email,
      })
    );
    //close the modal
    props.setOpenModal(false);
  };

  // everytime there is a change in the library, check if the selected book is already in the current user library
  useEffect(() => {
    dispatch(
      checkIfBookAlreadyExistsInCurrentUserLibrary({
        bookData,
        user: currentUser.email,
      })
    );
  }, [bookData, currentUser, dispatch]);

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
              {/* if the isCurrentCategory is the same as the current category then let the buttons reflect that and apply the correct styles */}
              {libraryCategories.map((category) => {
                const isCurrentCategory =
                  bookAlreadyInLibraryCategory === category;
                return (
                  <p
                    key={category}
                    className={isCurrentCategory ? styled.exist : ""}
                    onClick={() => addToLibrary(category)}
                  >
                    {isCurrentCategory
                      ? `Currently in - ${category}`
                      : category}
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
