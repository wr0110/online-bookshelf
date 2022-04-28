import React from "react";
import styled from "./Navbar.module.css";

import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav>
      <p className={styled.logo}>Bookmark</p>

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

        <div>
          <input type="text" placeholder="Search" />
          <button>Login</button>
        </div>
      </div>

      <div className={styled["menu-icon"]}>
        <GiHamburgerMenu size="25px" color="#c2a410" />
      </div>
    </nav>
  );
};

export default Navbar;
