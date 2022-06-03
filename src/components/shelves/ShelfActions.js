import React from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";

const ShelfActions = () => {
  return (
    <section>
      <div className="actions">
        {/* Button to add to library */}
        <p>
          <span>
            <RiAddCircleLine size="25px" fontWeight="700" />
          </span>
          Add to Shelf
        </p>

        {/* Button to add to get more details */}
        <p>
          <span>
            <MdInfoOutline size="25px" fontWeight="700" />
          </span>
          Details & More
        </p>
      </div>
    </section>
  );
};

export default ShelfActions;
