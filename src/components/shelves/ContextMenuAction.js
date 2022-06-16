import React from "react";
import RemoveShelf from "./RemoveShelf";
import RenameShelf from "./RenameShelf";

const ContextMenuAction = (props) => {
  if (props.action.includes("Rename")) {
    return (
      <RenameShelf
        selectedShelf={props.selectedShelf}
        setSearchParams={props.setSearchParams}
        setOpenMenuAction={props.setOpenMenuAction}
        searchParams={props.searchParams}
      />
    );
  }

  if (props.action.includes("Remove")) {
    return <RemoveShelf />;
  }
};

export default ContextMenuAction;
