import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "./UserLibrary.module.css";
import readingNook from "../../images/reading_svg.png";
import { AuthContext } from "../../contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import { addBookToLibrary } from "../../store/features/library/librarySlice";

const UserLibrary = (props) => {
  //states, store and context
  const { library } = useSelector((state) => state.bookStore);
  const dispatch = useDispatch();
  const [bookExistsCategory, setBookExistsCategory] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const libraryCategories = ["To Be Read", "In Progress", "Completed"];
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

  //this checks if the selected book is already in the userLibrary of the current user
  useEffect(() => {
    //get the library of the current user
    const user = library.find((shelf) => shelf.user === currentUser.email);

    //check if the selected book is already in the userLibrary of the user
    if (user) {
      const bookAlreadyExists = user.userLibrary.find(
        (record) => record.bookData.id === bookData.id
      );

      //setBookExistsCategory to the category array of the bookAlreadyExists object
      bookAlreadyExists
        ? setBookExistsCategory(bookAlreadyExists.category)
        : setBookExistsCategory([]);
    }
  }, [library, bookData, currentUser]);

  console.log(bookExistsCategory);
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
                    {/* if the category exists in bookExistsCategory, the text should say "Already in category */}
                    {bookExistsCategory.includes(category) ? (
                      ` Already in ${category}`
                    ) : (
                      <>{category}</>
                    )}
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
