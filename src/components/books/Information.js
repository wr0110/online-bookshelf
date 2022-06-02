import React from "react";
import styled from "./Information.module.css";
import Summary from "./Summary";

const Information = (props) => {
  return (
    <section className={styled["information-container"]}>
      <section className={styled.information}>
        <Summary book={props.book} />
        <>{props.actionsComponent}</>
      </section>
    </section>
  );
};

export default Information;
