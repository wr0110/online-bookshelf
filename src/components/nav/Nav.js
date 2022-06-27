import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "./Nav.module.css";
import { BiSearch } from "react-icons/bi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import Button from "../button/Button";
import { NavLink as Link, useNavigate } from "react-router-dom";
import Modal from "../../helpers/modal/Modal";
import Login from "../login/Login";
import { AuthContext } from "../../contexts/authContext";
import Search from "../search/Search";

const Nav = () => {
  // states contexts and refs
  const { isSignedIn, signUserOut } = useContext(AuthContext);
  const [width, setwidth] = useState(0);
  const [showSearch, setshowSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  // sets the current width of the screen
  const widthfunction = () => setwidth(window.innerWidth);

  /**
   * add event listener to the window to check if the current width >= 768
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

  //todo : change pageyoffset to scrollx
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
  const handleSearch = () => setshowSearch((state) => !state);

  // apply the appropriate class based on the status of showSearch
  const result = showSearch
    ? `${styled.searchbar}`
    : `${styled["desktop-search-bar"]}`;

  // set the state of the modal
  const handleButtonClick = () => setOpenModal((state) => !state);

  const handleLogout = async () => {
    await signUserOut();
    navigate("/", { replace: true });
  };

  //active link style
  const navStyle = ({ isActive }) => {
    return {
      color: isActive ? " var(--dark-blue)" : "var(--med-grey)",
      fontWeight: isActive ? "bold" : "normal",
    };
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

        {/**
         * call appropriate function when user clicks
         * show appropriate buttons based on the isSigned state
         *  */}
        {!isSignedIn ? (
          <Button onClick={handleButtonClick} className={styled.btnlog}>
            Sign In
          </Button>
        ) : (
          <Button onClick={handleLogout} className={styled.btnlog}>
            Logout
          </Button>
        )}

        <ul className={styled["nav-items"]} ref={ulRef}>
          <li>
            <Link style={navStyle} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link style={navStyle} to="/explore">
              Explore
            </Link>
          </li>

          {/* this link will only be available if the user is signed in */}
          {isSignedIn && (
            <li>
              <Link style={navStyle} to="/library">
                Library
              </Link>
            </li>
          )}

          {isSignedIn && (
            <li>
              <Link style={navStyle} to="/shelves">
                Shelves
              </Link>
            </li>
          )}
        </ul>

        {/* if showSearch is true apply the appropriate class */}
        <div className={result}>
          <Search setshowSearch={setshowSearch} />
        </div>
      </nav>

      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <Login setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};

export default Nav;
