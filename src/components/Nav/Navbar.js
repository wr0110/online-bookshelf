import React, { useEffect, useState } from "react";
import styled from "./Navbar.module.css";

import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../button/Button";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  function showItems() {
    if (window.innerWidth > 767) {
      setShowMenu(true);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", showItems);

    return () => window.removeEventListener("resize", showItems);
  }, [showMenu]);

  return (
    <nav>
      <p className={styled.logo}>Bookmark</p>

      {showMenu && (
        <div className={styled.menu}>
          <ul className={styled.navlinks}>
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

          <div className={styled.btngroup}>
            <form>
              <label htmlFor="search" className={styled["search-icon"]}>
                <BiSearch size="20px" color="#c2a410" />
              </label>
              <input type="text" name="search" placeholder="Search" />
            </form>

            <Button>Sign In</Button>
          </div>
        </div>
      )}

      <div onClick={toggleMenu} className={styled["menu-icon"]}>
        <GiHamburgerMenu size="25px" color="#c2a410" />
      </div>
    </nav>
  );
};

export default Navbar;
