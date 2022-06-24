import React from "react";
import styled from "./ExploreContent.module.css";

import useExploreContent from "../../hooks/useExploreContent";

const ExploreContent = () => {
  const contents = useExploreContent();

  const renderContents = contents.map((content, i) => {
    return (
      <div key={Date.now() + i}>
        {content.loading && "Getting  Books..."}

        {!content.loading && (
          <section>
            <h2>{content.title}</h2>
            <div className={styled["explore-books"]}>{content.books}</div>
          </section>
        )}
      </div>
    );
  });

  return <section>{renderContents}</section>;
};

export default ExploreContent;
