import React, { useContext, useEffect, useState } from "react";
import styled from "./ShelfNav.module.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { AuthContext } from "../../contexts/authContext";
import { useSelector } from "react-redux";
import Modal from "../../helpers/modal/Modal";
import CreateShelf from "./CreateShelf";
import ContextMenu from "./ContextMenu";

const ShelfNav = ({ searchParams, setSearchParams }) => {
  //states and context
  const { shelf } = useSelector((state) => state.bookShelf);
  const { currentUser } = useContext(AuthContext);
  const [shelfName, setShelfName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [positions, setPositions] = useState({ top: 0, left: 0 });
  const [selectedShelf, setSelectedShelf] = useState(null);

  //functions
  const addHandler = () => setOpenModal((state) => !state);
  const handleShelfName = (shelf) => setShelfName(shelf);

  //function to open conrext menu and set the position of the menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
    setSelectedShelf(e.target.innerText);
    setPositions({ top: e.clientY, left: e.clientX });
  };

  //function to close the context menu
  useEffect(() => {
    const closeContextMenu = () => setShowContextMenu(false);
    window.addEventListener("click", closeContextMenu);

    //cleanup function to remove the event listener
    return () => window.removeEventListener("click", closeContextMenu);
  }, [showContextMenu]);

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
      onContextMenu={handleContextMenu}
    >
      {shelf}
    </p>
  ));

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

      {/* show custom context menu */}
      {showContextMenu && (
        <ContextMenu
          setShowContextMenu={setShowContextMenu}
          shelfName={shelfName}
          setShelfName={setShelfName}
          positions={positions}
          selectedShelf={selectedShelf}
        />
      )}
    </>
  );
};

export default ShelfNav;
