import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "./Nav.module.css";
import { BiSearch } from "react-icons/bi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import Modal from "../../ui/modal/Modal";
import Login from "../login/Login";
import { AuthContext } from "../../contexts/authContext";

const Nav = () => {
  // states contexts and refs
  const { isSignedIn } = useContext(AuthContext);

  const [width, setwidth] = useState(0);
  const [showSearch, setshowSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const ulRef = useRef();

  // sets the current width of the screen
  const widthfunction = () => {
    setwidth(window.innerWidth);
  };

  /**
   * add event listener to the window
   * checks if the current width >= 768
   * if width >= 768, set the state to the opposite of what it currently is
   * use the cleanup function to remove the eventlistener
   */
  useEffect(() => {
    window.addEventListener("resize", widthfunction);
    if (showSearch && width >= 768) {
      setshowSearch((state) => !state);
    }
    return () => window.removeEventListener("resize", widthfunction);
  }, [width, showSearch]);

  //!todo : change pageyoffset to scrollx
  useEffect(() => {
    if (width <= 768) {
      let prevScrollpos = window.pageYOffset;
      window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          ulRef.current.style.top = "70px";
        } else {
          ulRef.current.style.top = "-80px";
        }
        prevScrollpos = currentScrollPos;
      };
    }
  }, [width]);

  //set the state when the user clicks on the search icon
  const handleSearch = () => {
    setshowSearch((state) => !state);
  };

  // apply the appropriate class based on the status of showSearch
  const result = showSearch
    ? `${styled.searchbar}`
    : `${styled["desktop-search-bar"]}`;

  // set the state of the modal
  const handleButtonClick = () => {
    setOpenModal((state) => !state);
  };

  return (
    <>
      <nav className={styled.navbar}>
        <div className={styled["search-icon"]} onClick={handleSearch}>
          <BiSearch size="25px" style={{ color: ` var(--yellow)` }} />
        </div>

        <p className={styled.logo}>
          <BsJournalBookmarkFill
            size="20px"
            style={{ color: ` var(--yellow)` }}
          />
          BookMark
        </p>

        {/* call handleButtonClick when user clicks */}
        <Button onClick={handleButtonClick} className={styled.btnlog}>
          Sign In
        </Button>

        <ul className={styled["nav-items"]} ref={ulRef}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/genres">Genres</Link>
          </li>

          {/* this link will only be available if the user is signed in */}
          {isSignedIn && (
            <li>
              <Link to="/library">Library</Link>
            </li>
          )}
        </ul>

        {/* if showSearch is true apply the appropriate class */}
        <div className={result}>
          <form>
            <label htmlFor="search">
              <BiSearch size="20px" style={{ color: ` var(--yellow)` }} />
            </label>
            <input type="text" name="search" placeholder="Search" />
          </form>
        </div>
      </nav>

      {/**
       * only show the modal if the state is true
       * Modal accepts the setState function as props
       * Modal has the login component as a child
       */}
      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <Login />
        </Modal>
      )}
    </>
  );
};

export default Nav;
