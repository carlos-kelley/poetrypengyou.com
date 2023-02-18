import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
// import css

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EnglishPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const poem = useSelector((store) => store.poem);
  const [englishToggle, setEnglishToggle] =
    useState(false);

  useEffect(() => {
    setEnglishToggle(false);
  }, []);

  return (
    <div>
      <FontDownloadIcon
        onClick={() => {
          dispatch({
            type: "UNSET_WORD",
          });
          englishToggle === false
            ? setEnglishToggle(true)
            : setEnglishToggle(false);
          console.log(
            "englishToggle:",
            englishToggle
          );
        }}
        // change color to disabled if no english
        color={
          englishToggle === true ? "" : "disabled"
        }
      >
        {englishToggle === true && "Hide English"}

        {englishToggle === false &&
          "Show English"}
      </FontDownloadIcon>
      <div className="englishTitleClass">
        {englishToggle === true && poem[0] && (
          <h2>{poem[0].title_english}</h2>
        )}
      </div>
      <div className="englishAuthorClass">
        {englishToggle === true && poem[0] && (
          <h3>{poem[0].author_english}</h3>
        )}
      </div>
      <div className="englishPoemClass">
        {englishToggle === true && poem[0] && (
          <p>{poem[0].poem_english}</p>
        )}
      </div>
    </div>
  );
}

export default EnglishPage;
