import React from "react";
import "./styles.css";

import BrandImage from "./scenes/BrandImage";
import IntroText from "./scenes/IntroText";
import ContinentCityList from "../../components/ContinentCityList";

const LandingPage = () => {
  return (
    <>
      <div className="desktop mobile">
        <BrandImage className="icon-panel" />
        <div className="client-panel">
          <IntroText />
          <ContinentCityList />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
