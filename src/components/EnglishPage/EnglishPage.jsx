import React, {
  useEffect,
  useState,
} from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { ReactComponent as FontDownloadIcon } from "./font_download.svg";
import { ReactComponent as FontDownloadOffIcon } from "./font_download_off.svg";
import "./EnglishPage.css";

function EnglishPageToggleButton({
  isOn,
  onClick,
}) {
  const Icon = isOn
    ? FontDownloadOffIcon
    : FontDownloadIcon;
  return (
    <Icon
      className="englishButton"
      onClick={onClick}
    />
  );
}

function EnglishPageContent({ allReset, poem }) {
  const dispatch = useDispatch();

  function handleClick() {
    allReset();
    dispatch({ type: "UNSET_WORD" });
  }

  return (
    <div
      className="englishInfoContainer"
      onClick={() => {
        console.log(
          "englishInfoContainer clicked"
        );
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
          {poem[0].poem_english}
        </p>
      )}
    </div>
  );
}

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
