import React from "react";
import styled from "./Heading.module.css";

const Heading = (props) => {
  return (
    <p className={`${styled[`${props.className}`]} ${styled.heading}`}>
      {props.text}
    </p>
  );
};

export default Heading;
