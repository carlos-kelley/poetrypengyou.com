import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";

import "./EnglishPage.css";
import EnglishPageToggleButton from "./EnglishPageToggleButton";
import EnglishPageContent from "./EnglishPageContent";

function EnglishPage({
  allReset,
  englishToggle,
  setEnglishToggle,
}) {
  const poem = useSelector((store) => store.poem);

  return (
    <div>
      {/* sets the state of the button */}
      <EnglishPageToggleButton
        isOn={englishToggle}
        onClick={() =>
          setEnglishToggle(!englishToggle)
        }
      />
      {/* if the button is on, show the EnglishPageContent */}
      {englishToggle ? (
        <EnglishPageContent
          allReset={allReset}
          poem={poem}
        />
      ) : null}
    </div>
  );
}

export default EnglishPage;
