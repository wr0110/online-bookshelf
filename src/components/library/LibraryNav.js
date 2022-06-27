import React, { useEffect, useState } from "react";
import styled from "./LibraryNav.module.css";

const links = ["All", "TBR", "In Progress", "Completed", "DNF"];

const LibraryNav = ({ searchParams, setSearchParams }) => {
  const [link, setlink] = useState("All");

  //get the category from the url params
  let urlParam = searchParams?.get("category");
  //function to change the link state
  const handleLink = (link) => setlink(link);

  //update the search params when the link changes
  useEffect(() => {
    setSearchParams({ category: link });
  }, [link, setSearchParams]);

  return (
    <nav className={styled["library-navbar"]}>
      <h1>Your Library</h1>

      <div className={styled["library-links"]}>
        {links.map((link) => {
          return (
            <p
              key={link}
              onClick={() => handleLink(link)}
              className={
                urlParam === link ||
                (urlParam === "To Be Read" && link === "TBR")
                  ? styled.active
                  : styled.link
              }
            >
              {link}
            </p>
          );
        })}
      </div>
    </nav>
  );
};

export default LibraryNav;
