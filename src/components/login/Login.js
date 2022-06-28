import React, { useContext, useState } from "react";
import styled from "./Login.module.css";
import Container from "../../helpers/wrapper/Container";
import bookSittin from "../../images/book_sitting.png";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

const Login = (props) => {
  // destructured from the AuthContext object
  const { setIsSignedIn, setcurrentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * setIsAuth to true and store the state in local storage when user logs in
   * redirect the user to the home page when they login
   * update the state for the current user
   * set modal state to false to ensure it is closed
   */
  const handleLogin = async () => {
    setLoading(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isUserSignedIn", true);
        setIsSignedIn(true);
        setcurrentUser({
          name: result.user.displayName,
          userId: result.user.uid,
          email: result.user.email,
        });
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: result.user.displayName,
            userId: result.user.uid,
            email: result.user.email,
          })
        );
        setLoading(false);
      })
      .then(() => {
        navigate("/", { replace: true });
        props.setOpenModal(false);
      });
  };

  return (
    <Container>
      <section className={styled.login}>
        <Container className={styled.wrap}>
          <h1>Start Organizing</h1>
          <p className="">
            Join BookMark and access all your favourites in one place. Organize
            your books by adding them to your library and shelves.
          </p>

          <figure className={styled.shelf}>
            <img src={bookSittin} alt="lady siting on a stack of books" />
          </figure>

          {/* disable the button when loading */}
          <button
            disabled={loading}
            className={styled["sign-in"]}
            onClick={handleLogin}
          >
            <FcGoogle size="25px" /> Sign in with Google
          </button>
        </Container>
      </section>
    </Container>
  );
};

export default Login;
