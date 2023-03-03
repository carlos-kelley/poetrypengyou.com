import React, {
  useEffect,
  useState,
} from "react";
import {
  useSelector,
} from "react-redux";
import "./EnglishPage.css";
import EnglishPageToggleButton from "./EnglishPageToggleButton";
import EnglishPageContent from "./EnglishPageContent";

function EnglishPage({ allReset }) {
  const poem = useSelector((store) => store.poem);
  const [englishToggle, setEnglishToggle] =
    useState(false);

  useEffect(() => {
    setEnglishToggle(false);
  }, []);

  return (
    <div>
      <EnglishPageToggleButton
        isOn={englishToggle}
        onClick={() =>
          setEnglishToggle(!englishToggle)
        }
      />
      {englishToggle && (
        <EnglishPageContent
          allReset={allReset}
          poem={poem}
        />
      )}
    </div>
  );
}

export default EnglishPage;
