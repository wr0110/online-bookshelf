import React, { useEffect, useRef, useState } from "react";
import styled from "./Nav.module.css";
import { BiSearch } from "react-icons/bi";
import Button from "./button/Button";
const Nav = () => {
  const [width, setwidth] = useState(0);
  const [showSearch, setshowSearch] = useState(false);
  const ulref = useRef();

  const widthfunction = () => {
    setwidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", widthfunction);
    if (showSearch && width >= 768) {
      setshowSearch((state) => !state);
    }
    return () => window.removeEventListener("resize", widthfunction);
  }, [width, showSearch]);

  useEffect(() => {
    if (width <= 768) {
      let prevScrollpos = window.pageYOffset;
      window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          ulref.current.style.top = "70px";
        } else {
          ulref.current.style.top = "-80px";
        }
        prevScrollpos = currentScrollPos;
      };
    }
  }, [width]);

  const handlesearchbar = () => {
    setshowSearch((state) => !state);
  };

  return (
    <>
      <nav className={styled.navbar}>
        <div className={styled.searchicon} onClick={handlesearchbar}>
          <BiSearch size="20px" />
        </div>
        <p className={styled.logo}>Bookmark</p>
        <Button className={styled.btnlog}> Sign In</Button>
        <ul className={styled.navitems} ref={ulref}>
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

        <div
          id="search"
          className={
            showSearch ? `${styled.searchbar}` : `${styled.nosearchbar}`
          }
        >
          <form>
            <input type="text" />
          </form>
        </div>
      </nav>
    </>
  );
};

export default Nav;
