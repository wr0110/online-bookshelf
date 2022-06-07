import React, { useContext, useEffect, useState } from "react";
import styled from "./ShelfNav.module.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { AuthContext } from "../../contexts/authContext";
import { useSelector } from "react-redux";
import Modal from "../../helpers/modal/Modal";
import CreateShelf from "./CreateShelf";

const ShelfNav = ({ setSearchParams }) => {
  const { shelf } = useSelector((state) => state.bookShelf);
  const { currentUser } = useContext(AuthContext);
  const [shelfName, setShelfName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const addHandler = () => setOpenModal((state) => !state);
  const handleShelfName = (shelf) => setShelfName(shelf);

  //find the current user
  const user = shelf.find((shelf) => shelf.user === currentUser?.email);

  //get the shelves creates by the current user
  const links = user?.shelves?.map((shelf) => (
    <p key={shelf} onClick={() => handleShelfName(shelf)}>
      {shelf}
    </p>
  ));

  //update the search params when the shelf changes
  useEffect(() => {
    setSearchParams({ shelf: shelfName });
  }, [shelfName, setSearchParams]);

  return (
    <>
      <nav className={styled["shelf-navbar"]}>
        <div className={styled["shelf-links"]}>{links}</div>
        <div className={styled.add} onClick={addHandler}>
          <IoAddCircleSharp size="28px" color="#3f3d56" />
        </div>
      </nav>

      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <CreateShelf setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};

export default ShelfNav;
