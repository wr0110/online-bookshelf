import React from "react";
import styled from "./ExploreNav.module.css";

const exploreLinks = [
  "Romance Picks",
  "BookTok Sensations",
  "Spicy Book Recs ",
  "Fantasy Picks",
  "Fiction Picks",
  "Easy Reads",
];

const ExploreNav = () => {
  const links = exploreLinks.map((link) => {
    return <p key={link}>{link}</p>;
  });

  return (
    <nav className={styled["explore-nav"]}>
      <h2 className={styled.title}>Categories</h2>
      <div className={styled.links}>{links}</div>
    </nav>
  );
};

export default ExploreNav;
