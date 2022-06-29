import React, { useContext, useState } from "react";
import Heading from "../../helpers/heading/Heading";
import Container from "../../helpers/wrapper/Container";
import Button from "../button/Button";
import styled from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import Modal from "../../helpers/modal/Modal";
import Login from "../login/Login";

const Hero = (props) => {
  const navigate = useNavigate();
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const auth = currentUser.email && isSignedIn;

  //navigate to explore page or show login prompt
  const handleClick = () => {
    if (auth) {
      navigate("/explore");
    } else {
      setOpenLoginModal((state) => !state);
    }
  };

  const heroStyle = { backgroundImage: `url(${props.src})` };
  return (
    <>
      <section
        style={heroStyle}
        className={`${styled.hero} ${styled[props.className]}`}
      >
        <Container>
          <article className={styled["hero-text"]}>
            <Heading className="heading-lg" text={props.heroHeading} />
            <p className="para">{props.text}</p>
            <Button onClick={handleClick}>{props.buttonText}</Button>
          </article>
        </Container>
      </section>

      {/* open modal if user is not logged in */}
      {openLoginModal && (
        <Modal openModal={openLoginModal} setOpenModal={setOpenLoginModal}>
          <Login setOpenModal={setOpenLoginModal} />
        </Modal>
      )}
    </>
  );
};

export default Hero;
