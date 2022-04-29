import React, { useEffect, useRef, useState } from "react";
import styled from "./Nav.module.css";
import { BiSearch } from "react-icons/bi";
import Button from "./button/Button";

const Nav = () => {
  const [width, setwidth] = useState(0);
  const [showSearch, setshowSearch] = useState(false);
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

  return (
    <nav className={styled.navbar}>
      <div className={styled["search-icon"]} onClick={handleSearch}>
        <BiSearch size="25px" color="#c2a410" />
      </div>

      <p className={styled.logo}>BookMark</p>

      <Button className={styled.btnlog}> Sign In</Button>

      {/*use Link for li */}
      <ul className={styled["nav-items"]} ref={ulRef}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Explore</a>
        </li>
        <li>
          <a href="/">Genres</a>
        </li>
        <li>
          <a href="/">Library</a>
        </li>
      </ul>

      {/* if showSearch is true apply the appropriate class */}
      <div
        className={
          showSearch ? `${styled.searchbar}` : `${styled["desktop-search-bar"]}`
        }
      >
        <form>
          <label htmlFor="search">
            <BiSearch size="20px" color="#c2a410" />
          </label>
          <input type="text" name="search" placeholder="Search" />
        </form>
      </div>
    </nav>
  );
};

export default Nav;
