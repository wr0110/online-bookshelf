import React from "react";
import useExplore from "../../hooks/useExplore";

const ExploreContent = () => {
  const [loadingFictionBooks, fictionBooks] = useExplore("Fiction");

  return (
    <section>
      <div>
        {loadingFictionBooks ? "Getting Fiction Books..." : fictionBooks}
      </div>
    </section>
  );
};

export default ExploreContent;
