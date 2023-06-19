import { useDispatch } from "react-redux";
import React from "react";
import "./EnglishPage.css";
import NavButtonsBottom from "../NavButtons/NavButtonsBottom";

function EnglishPageContent({ allReset, poem }) {
  const dispatch = useDispatch();

  function handleClick() {
    allReset();
    dispatch({ type: "UNSET_WORD" });
  }

  const splitPoemEnglish = poem[0]
    ? poem[0].poem_english.split("/")
    : [];

  return (
    <div
      className="englishInfoContainer"
      onClick={() => {
        handleClick();
      }}
    >
      {poem[0] && (
        <h3
          className="englishTitleClass"
          onClick={handleClick}
        >
          {poem[0].title_english}
        </h3>
      )}
      {poem[0] && (
        <h3
          className="englishAuthorClass"
          onClick={handleClick}
        >
          {poem[0].author_english}
        </h3>
      )}
      {poem[0] && (
        <p
          className="englishPoemClass"
          onClick={handleClick}
        >
          {splitPoemEnglish.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index <
                splitPoemEnglish.length - 1 && (
                <span className="englishLineBreak" />
              )}
            </React.Fragment>
          ))}
          <div className="navContainerBottom">
            <NavButtonsBottom
              allReset={allReset}
            />
          </div>
        </p>
      )}
    </div>
  );
}

export default EnglishPageContent;
