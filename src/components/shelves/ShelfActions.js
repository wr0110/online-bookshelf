import React, { useContext, useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { checkIfUserHasShelves } from "../../store/features/shelf/shelfSlice";
import { AuthContext } from "../../contexts/authContext";
import CreateShelf from "./CreateShelf";
import Modal from "../../helpers/modal/Modal";
import AddToShelf from "./AddToShelf";
import { useNavigate } from "react-router-dom";

const ShelfActions = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isShelfEmpty } = useSelector((state) => state.bookShelf);
  const { currentUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [openShelfModal, setOpenShelfModal] = useState(false);

  const addToShelfHandler = () => {
    if (isShelfEmpty) {
      setOpenModal((state) => !state);
    } else if (!isShelfEmpty) {
      setOpenShelfModal((state) => !state);
    }
  };

  //check if user has shelves
  useEffect(() => {
    dispatch(checkIfUserHasShelves(currentUser.email));
  }, [dispatch, currentUser, openModal]);

  //navigate to the book details page for the specified book
  const handleDetails = () => navigate(`/results/${props.book.id}`);

  return (
    <section>
      <div className="actions">
        {/* Button to add to library */}
        <p onClick={addToShelfHandler}>
          <span>
            <RiAddCircleLine size="25px" fontWeight="700" />
          </span>
          Add to Shelf
        </p>

        {/* Button to add to get more details */}
        <p onClick={handleDetails}>
          <span>
            <MdInfoOutline size="25px" fontWeight="700" />
          </span>
          Details & More
        </p>
      </div>

      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <CreateShelf setOpenModal={setOpenModal} />
        </Modal>
      )}

      {openShelfModal && (
        <Modal setOpenModal={setOpenShelfModal} openModal={openShelfModal}>
          <AddToShelf book={props.book} setOpenModal={setOpenShelfModal} />
        </Modal>
      )}
    </section>
  );
};

export default ShelfActions;
