import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../contexts/authContext";

const AddToShelf = () => {
  const { currentUser } = useContext(AuthContext);
  const { shelf } = useSelector((state) => state.bookShelf);

  const user = shelf.find((shelf) => shelf.user === currentUser?.email);

  const AllShelves = user?.shelves?.map((shelf) => <p key={shelf}>{shelf} </p>);

  return (
    <section className="content-container">
      <section className="content">
        <h2>Which shelf would you like to place this book on?</h2>

        <div className="allshelves">{AllShelves}</div>
      </section>
    </section>
  );
};

export default AddToShelf;
