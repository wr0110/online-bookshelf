import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import { renameShelf } from "../../store/features/shelf/shelfSlice";
import styled from "./RenameShelf.module.css";

const RenameShelf = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [newShelfName, setNewShelfName] = useState(props.selectedShelf);
  const urlParams = props.searchParams.get("shelf");

  //dispatch the action to rename the shelf
  const handleRenaming = (e) => {
    e.preventDefault();

    dispatch(
      renameShelf({
        shelf: props.selectedShelf,
        newShelfName,
        user: currentUser.email,
      })
    );

    //if the shelf in the url is the same as the shelf being renamed, update the url
    if (urlParams === props.selectedShelf) {
      props.setSearchParams({ shelf: newShelfName });
    }

    //close the modal
    props.setOpenMenuAction(false);
  };

  return (
    <div className={styled["rename-container"]}>
      <form onSubmit={handleRenaming} className={styled.rename}>
        <h2>Rename Shelf</h2>
        <p>What would you like to rename this shelf to?</p>

        <input
          type="text"
          placeholder="New Shelf Name"
          onChange={(e) => setNewShelfName(e.target.value)}
          value={newShelfName}
        />

        <button type="submit">Rename</button>
      </form>
    </div>
  );
};

export default RenameShelf;
