import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiAddCircleLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import Modal from "../../helpers/modal/Modal";
import AddToLibrary from "./AddToLibrary";
import { AuthContext } from "../../contexts/authContext";

const LibraryActions = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  //navigate to the book details page for the specified book
  const handleDetails = () => navigate(`/results/${props.book.id}`);

  //set the modal state when the user clicks on the add to library button
  const handleLibrary = () => {
    if (currentUser.email) {
      setOpenModal((state) => !state);
    } else {
      alert("You must be logged in to add a book to your library");
    }
  };

  return (
    <>
      <div className="actions">
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

      {/**show options to add to library
       * pass the currently selected book to the library
       */}
      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <AddToLibrary selectedBook={props.book} setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};

export default LibraryActions;
