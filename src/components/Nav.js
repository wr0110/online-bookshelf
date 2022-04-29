import React, { useEffect, useRef, useState } from "react";
import styled from "./Nav.module.css";
import { BiSearch } from "react-icons/bi";
import Button from "./button/Button";
const Nav = () => {
  const [width, setwidth] = useState(0);
  const [showSearch, setshowSearch] = useState(false);
  const ulref = useRef();
  const searchref = useRef();
  // const width = window.matchMedia("(min-width:768px)");

  const widthfunction = () => {
    setwidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", widthfunction);
    if (showSearch && width >= 768) {
      setshowSearch((state) => !state);
      //console.log(width);
      console.log("hi");
    }
    console.log(width);

    //   if (width > 768) {
    //     setshowSearch(true);
    //     searchref.current.style.display = "grid";
    //   }

    return () => window.removeEventListener("resize", widthfunction);
  }, [width]);

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

  const handlesearchbar = () => {
    setshowSearch((s) => !s);
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
            <input type="text" ref={searchref} />
          </form>
        </div>
      </nav>
    </>
  );
};

export default Nav;
