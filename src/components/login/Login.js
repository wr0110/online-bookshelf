import React from "react";
import styled from "./Login.module.css";
import Container from "../../ui/wrapper/Container";
import shelves from "../../images/shelves.svg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <Container>
      <section className={styled.login}>
        <Container>
          <h1>Start Organizing</h1>
          <p className="para">
            Join BookMark and access all your favourites in one place.
          </p>

          <figure className={styled.shelf}>
            <img src={shelves} alt="lady standing beside a bookshelf" />
          </figure>

          <button className={styled["sign-in"]}>
            <FcGoogle size="25px" /> Sign in with Google
          </button>
        </Container>
      </section>
    </Container>
  );
};

export default Login;
