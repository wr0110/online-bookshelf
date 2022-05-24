import React, { useEffect, useRef, useState } from "react";
import styled from "./Summary.module.css";
import { RiAddCircleLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from "../../helpers/modal/Modal";
import UserLibrary from "./UserLibrary";

const Summary = (props) => {
  const navigate = useNavigate();
  const snippetRef = useRef();
  const [openModal, setOpenModal] = useState(false);

  //  Destructured from the book object
  const {
    id,
    searchInfo,
    title,
    authors,
    publishedDate,
    categories,
    imageLinks,
  } = props.book;
  //const { book } = props;

  //navigate to the book details page for the specified book
  const handleDetails = () => navigate(`/results/${id}`);

  //set the modal state when the user clicks on the add to library button
  const handleLibrary = () => setOpenModal((state) => !state);

  /** the textSnippet includes html tags so use useRef to include the text in the innerHTML
   * if there is no snippet then show alternative text in else case
   */
  useEffect(() => {
    if (searchInfo) {
      snippetRef.current.innerHTML = ` ${searchInfo?.textSnippet}`;
    } else snippetRef.current.innerHTML = "Visit Details & More";
  }, [searchInfo]);

  return (
    <>
      <section className={styled.info}>
        <section className={styled["book-summary"]}>
          {/* if there is no image then show placeholder image */}
          <div className={styled.summary}>
            <figure>
              <img
                src={
                  imageLinks
                    ? imageLinks.smallThumbnail
                    : "https://via.placeholder.com/128x204"
                }
                alt={title}
              />
            </figure>

            <article>
              {/* Title */}
              <h1 className={styled["summary-title"]}>{title}</h1>

              {/* Author */}
              {<p className={styled["summary-author"]}>{authors?.[0]} </p> ||
                ""}

              {/* Year and Category */}
              <div className={styled["supporting-details"]}>
                {publishedDate && (
                  <p>{new Date(publishedDate).getFullYear().toString()}</p>
                )}
                {categories && <p>{categories[0]}</p>}
              </div>

              {/* Text Snippet */}
              <p className={styled["summary-snippet"]} ref={snippetRef}></p>
            </article>
          </div>

          {/* Buttons */}
          <div className={styled.actions}>
            {/* Button to add to library */}
            <p onClick={handleLibrary}>
              <span>
                <RiAddCircleLine size="25px" fontWeight="700" />
              </span>
              Add to Library
            </p>

            {/* Button to add to get more details */}
            <p onClick={handleDetails}>
              <span>
                <MdInfoOutline size="25px" fontWeight="700" />
              </span>
              Details & More
            </p>
          </div>
        </section>
      </section>

      {/**show options to add to library
       * pass the currently selected book to the library
       */}
      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <UserLibrary selectedBook={props.book} setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};

export default Summary;
