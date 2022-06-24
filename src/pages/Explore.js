import React from "react";
import styled from "../components/explore/Explore.module.css";
import ExploreContent from "../components/explore/ExploreContent";
import ExploreNav from "../components/explore/ExploreNav";
import Container from "../helpers/wrapper/Container";

const Explore = () => {
  return (
    <section className={styled.explore}>
      <Container>
        <ExploreNav />
        <ExploreContent />
      </Container>
    </section>
  );
};

export default Explore;
