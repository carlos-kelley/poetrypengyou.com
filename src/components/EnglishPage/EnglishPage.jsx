import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReactComponent as FontDownloadIcon } from "./font_download.svg";
import { ReactComponent as FontDownloadOffIcon } from "./font_download_off.svg";
import "./EnglishPage.css";

//this is the EnglishPage component. It is a page that displays the English translation of the poem.
function EnglishPage(props) {
  const dispatch = useDispatch();
  const poem = useSelector((store) => store.poem);
  const [englishToggle, setEnglishToggle] =
    useState(false);

  //by default the page does not show english
  useEffect(() => {
    setEnglishToggle(false);
  }, []);

  return (
    <div>
      {/* this button toggles the english translation on and off */}
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

      {/* this is the english translation, which conditionally renders based on the toggle */}
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
