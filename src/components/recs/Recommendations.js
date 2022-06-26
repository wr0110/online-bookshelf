import React from "react";
import styled from "./Recommendations.module.css";
import useExplore from "../../hooks/useExplore";

const Recommendations = (props) => {
  //get books from explorebooks
  const picks = useExplore("Picks");

  //only get 6 books
  const limitPicks = picks?.slice(0, 6);

  return <section className={styled.recs}>{limitPicks}</section>;
};

export default Recommendations;
