import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "../components/library/Library.module.css";
import Container from "../helpers/wrapper/Container";

const Library = () => {
  //if the link is active then apply the styles returned
  const active = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive && `var(--dark-blue)`,
    };
  };

  return (
    <section className={styled["library-container"]}>
      <Container>
        <nav className={styled["library-navbar"]}>
          <h1>Your Library</h1>

          <ul className={styled["library-links"]}>
            <li>
              <NavLink style={active} to="all">
                All
              </NavLink>
            </li>

            <li>
              <NavLink style={active} to="to-be-read">
                TBR
              </NavLink>
            </li>

            <li>
              <NavLink style={active} to="in-progress">
                In Progress
              </NavLink>
            </li>

            <li>
              <NavLink style={active} to="completed">
                Completed
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Outlet for the nested routes  */}
        <div className={styled["library-outlet"]}>
          <Outlet />
        </div>
      </Container>
    </section>
  );
};

export default Library;
