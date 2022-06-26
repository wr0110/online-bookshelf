import React from "react";
import Hero from "../components/publichome/Hero";
import cover from "../images/private_cover.png";

const PrivateHome = () => {
  //Hero Props
  const heroHeading = (
    <>
      Start <span>Organizing</span> your reads
    </>
  );

  const heroText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus velit senectus in nunc ut dictum aliquam id platea. In eget amet, imperdiet tellus. Sit sit orci in eu. Quis pellentesque.";

  const buttonText = "Get Started";

  return (
    <>
      <Hero
        src={cover}
        heroHeading={heroHeading}
        text={heroText}
        buttonText={buttonText}
        className="hero-alt"
      />
    </>
  );
};

export default PrivateHome;
