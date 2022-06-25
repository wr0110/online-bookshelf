import React from "react";
import styled from "./ExploreNav.module.css";

const exploreLinks = [
  "Romance Picks",
  "BookTok Sensation",
  "Spicy Book Recs ",
  "Fantasy Picks",
  "Fiction Picks",
  "Easy Reads",
];

const ExploreNav = () => {
  const links = exploreLinks.map((link) => {
    return <p key={link}>{link}</p>;
  });

  return <nav className={styled["explore-nav"]}>{links}</nav>;
};

export default ExploreNav;
