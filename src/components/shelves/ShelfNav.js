import React, { useContext, useEffect, useState } from "react";
import styled from "./ShelfNav.module.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { AuthContext } from "../../contexts/authContext";
import { useSelector } from "react-redux";
import Modal from "../../helpers/modal/Modal";
import CreateShelf from "./CreateShelf";

const ShelfNav = ({ searchParams, setSearchParams }) => {
  const { shelf } = useSelector((state) => state.bookShelf);
  const { currentUser } = useContext(AuthContext);
  const [shelfName, setShelfName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const addHandler = () => setOpenModal((state) => !state);
  const handleShelfName = (shelf) => setShelfName(shelf);

  //get current shelf from url
  const currentShelf = searchParams.get("shelf");

  //update the search params when the shelf changes
  useEffect(() => {
    setSearchParams({ shelf: shelfName });
  }, [shelfName, setSearchParams]);

  //find the current user
  const user = shelf.find((shelf) => shelf.user === currentUser?.email);

  /**get the shelves created by the current user
   * apply correct className to the current shelf
   */
  const links = user?.shelves?.map((shelf) => (
    <p
      key={shelf}
      onClick={() => handleShelfName(shelf)}
      className={currentShelf === shelf ? styled.active : ""}
    >
      {shelf}
    </p>
  ));

  console.log(currentShelf);

  return (
    <>
      <nav className={styled["shelf-navbar"]}>
        <h2
          onClick={() => setShelfName("All")}
          className={currentShelf === "All" ? styled.active : ""}
        >
          Books
        </h2>
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
