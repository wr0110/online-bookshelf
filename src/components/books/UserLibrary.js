import React, { useContext, useEffect, useMemo } from "react";
import styled from "./UserLibrary.module.css";
import readingNook from "../../images/reading_svg.png";
import { AuthContext } from "../../contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import { addBookToLibrary } from "../../store/features/library/librarySlice";

const UserLibrary = (props) => {
  const { library } = useSelector((state) => state.bookStore);
  const dispatch = useDispatch();

  //destructured from library context
  const { currentUser } = useContext(AuthContext);

  const libraryCategories = ["To Be Read", "In Progress", "Completed"];

  const book = props.selectedBook;

  //retutrn empty string if the data is undefined
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

    props.setOpenModal(false);
  };

  useEffect(() => {
    //get the library of the current user
    const user = library.find((shelf) => shelf.user === currentUser.email);

    //check if the selected book is already in the userLibrary of the current user
    let bookAlreadyExists = {};
    if (user) {
      bookAlreadyExists = user?.userLibrary?.find((record) => {
        return record.bookData.id === bookData.id;
      });
    }

    bookAlreadyExists && console.log(bookAlreadyExists?.category);
  }, [library, bookData, currentUser]);

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
