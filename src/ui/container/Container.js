import React from "react";
import styled from "./Container.module.css";

const Container = (props) => {
  return <div className={styled.container}>{props.children}</div>;
};

export default Container;
