import React from "react";
import styled from "./Heading.module.css";

const Heading = (props) => {
  return <p className={styled[`${props.className}`]}>{props.text}</p>;
};

export default Heading;
