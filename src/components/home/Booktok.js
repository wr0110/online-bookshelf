import React, { useState } from "react";
import styled from "./Booktok.module.css";
import Heading from "../../helpers/heading/Heading";
import Container from "../../helpers/wrapper/Container";
import booktok from "../../images/booktok2.jpg";
import Button from "../button/Button";
import Modal from "../../helpers/modal/Modal";
import Login from "../login/Login";

const Booktok = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleClick = () => setOpenLoginModal((state) => !state);

  // props for heading component
  const heading = (
    <>
      What side of <span>tiktok</span> are you on?
    </>
  );

  return (
    <>
      <section className={styled.booktok}>
        <figure className={styled.bookmark}>
          <img src={booktok} alt="books banner from tubefilter.com" />
        </figure>
        <Container>
          <article className={styled["booktok-info"]}>
            <Heading className="heading-md" text={heading} />

            <p className="para">
              TikTok made me read it! We are staying up to date with #BookTok
              and we've made it easier for you to see what's going viral. Add
              these popular books to your collection and stay up-to-date on the
              latest must-reads.
            </p>
            <Button onClick={handleClick}>Explore</Button>
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

export default Booktok;
