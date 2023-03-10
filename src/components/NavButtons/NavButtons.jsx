import React from "react";
import LastButton from "../LastButton/LastButton";
import NextButton from "../NextButton/NextButton";
import "./NavButtons.css";

//this is just a container component for the last and next buttons
function NavButtons({ allReset }) {
  return (
    <div
      className="navContainer"
      onClick={allReset}
    >
      <LastButton />
      <NextButton />
    </div>
  );
}

export default NavButtons;
