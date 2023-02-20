import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ReactComponent as FontDownloadIcon } from "./font_download.svg";
import { ReactComponent as FontDownloadOffIcon } from "./font_download_off.svg";
// import css
import "./EnglishPage.css";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EnglishPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const params = useParams();
  const dispatch = useDispatch();
  const poem = useSelector((store) => store.poem);
  const [englishToggle, setEnglishToggle] =
    useState(false);

  useEffect(() => {
    setEnglishToggle(false);
  }, []);

  return (
    <div>
      {englishToggle === false && (
        <FontDownloadOffIcon
          className="englishButton"
          onClick={() => {
            dispatch({
              type: "UNSET_WORD",
            });
            setEnglishToggle(true);
            console.log(
              "englishToggle:",
              englishToggle
            );
          }}
        ></FontDownloadOffIcon>
      )}
      {englishToggle === true && (
        <FontDownloadIcon
          className="englishButton"
          onClick={() => {
            dispatch({
              type: "UNSET_WORD",
            });
            setEnglishToggle(false);
            console.log(
              "englishToggle:",
              englishToggle
            );
          }}
        ></FontDownloadIcon>
      )}

      <div className="englishInfoContainer">
        {englishToggle === true && poem[0] && (
          <h3 className="englishTitleClass">
            {poem[0].title_english}
          </h3>
        )}
        {englishToggle === true && poem[0] && (
          <h3 className="englishAuthorClass">
            {poem[0].author_english}
          </h3>
        )}
      </div>
      {englishToggle === true && poem[0] && (
        <p className="englishPoemClass">
          {poem[0].poem_english}
        </p>
      )}
    </div>
  );
}

export default EnglishPage;
