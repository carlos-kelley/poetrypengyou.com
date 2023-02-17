import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import opencc-js
import * as OpenCC from "opencc-js";

// import opencc
// import { OpenCC } from "opencc";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PoemPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const poem = useSelector((store) => store.poem);
  const word = useSelector((store) => store.word);
  // const OpenCC = require("opencc");
  // Convert Traditional Chinese (Hong Kong) to Simplified Chinese (Mainland China)
  const converter = OpenCC.Converter({
    from: "cn",
    to: "hk",
  });
  const character = useSelector(
    (store) => store.character
  );
  const [localCharacter, setLocalCharacter] =
    useState("simplified");
  const [englishToggle, setEnglishToggle] =
    useState(false);
  const [titleTraditional, setTitleTraditional] =
    useState("");
  const [poemTraditional, setPoemTraditional] =
    useState("");
  const [
    authorTraditional,
    setAuthorTraditional,
  ] = useState("");

  const params = useParams();

  const poemIDParam = params.id;
  const poemTitle = null;
  // const poemTraditional =
  //   "";

  const [poemID, setPoemID] = useState(null);
  useEffect(() => {
    console.log(
      "titleTraditional:",
      titleTraditional
    );
    setTitleTraditional("");
    setPoemTraditional("");
    setAuthorTraditional("");

    dispatch({
      type: "UNSET_WORD",
    });
    setPoemID(poemIDParam);

    dispatch({
      type: "FETCH_POEM",
      payload: Number(poemIDParam),
    });
    // then set poemTraditional

    // set poemTraditional
  }, [params.id]);

  // useEffect(() => {
  //   setPoemTraditional(poem[0].poem_simplified);
  //   console.log(
  //     "poemTraditional:",
  //     poemTraditional
  //   );
  // }, [poem]);

  // function setTitleTraditionalFunc() {
  //   // setPoemTraditional((converter(`${poem[0].poem_simplified}`)));
  //   console.log(converter(`${poem[0].title_simplified}`))

  // }

  // function logPoemTraditional() {
  //   console.log(
  //     "titleTraditional:",
  //     titleTraditional
  //   );
  // }
  function selection() {
    if (window.getSelection)
      console.log(
        "selected:",
        window.getSelection().toString()
      );
    // dispatch to word reducer
    dispatch({
      type: "LOOKUP_WORD",
      payload: window.getSelection().toString(),
    });
  }

  return (
    <div>
      {/* onclick set local character to traditional */}
      <button
        onClick={() => {
          dispatch({
            type: "UNSET_WORD",
          });
          localCharacter === "simplified"
            ? setLocalCharacter("traditional")
            : setLocalCharacter("simplified");
          console.log(
            "character:",
            localCharacter
          );

          localCharacter === "traditional" &&
            setTitleTraditional(
              converter(poem[0].title_simplified)
            );
          setPoemTraditional(
            converter(poem[0].poem_simplified)
          );
          setAuthorTraditional(
            converter(poem[0].author_simplified)
          );

          // if still null or empty try again
          // titleTraditional === null &&
          //   setTitleTraditional(
          //     converter(poem[0].title_simplified)
          //   );
          // setPoemTraditional(
          //   converter(poem[0].poem_simplified)
          // );
          // setAuthorTraditional(
          //   converter(poem[0].author_simplified)
          // );
          titleTraditional === "" &&
            setTitleTraditional(
              converter(poem[0].title_simplified)
            );
          setPoemTraditional(
            converter(poem[0].poem_simplified)
          );
          setAuthorTraditional(
            converter(poem[0].author_simplified)
          );
          // wait 1 second then clear

          console.log(
            "titleTraditional:",
            titleTraditional
          );
        }}
      >
        {localCharacter === "simplified" &&
          "Switch to Traditional"}
        {localCharacter === "traditional" &&
          "Switch to Simplified"}
      </button>
      <button
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
      >
        {englishToggle === true && "Hide English"}

        {englishToggle === false &&
          "Show English"}
      </button>

      <div className="poem">
        {/* if poem[0] exists and character is simplified */}
        {poem[0] &&
          localCharacter === "simplified" && (
            <h2>{poem[0].title_simplified}</h2>
          )}
        {poem[0] &&
          localCharacter === "simplified" && (
            <h3>{poem[0].author_simplified}</h3>
          )}
        {poem[0] &&
          localCharacter === "simplified" && (
            <p onMouseUp={selection}>
              {poem[0].poem_simplified}
            </p>
          )}

        {poem[0] &&
          localCharacter === "traditional" && (
            <h2>{titleTraditional}</h2>
          )}
        {poem[0] &&
          localCharacter === "traditional" && (
            <h3>{authorTraditional}</h3>
          )}
        {poem[0] &&
          localCharacter === "traditional" && (
            <p onMouseUp={selection}>
              {poemTraditional}
            </p>
          )}
      </div>
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
      <div className="word">
        <p>Word:</p>
        {word[0] && <p>{word[0].english}</p>}
        {word[0] && <p>{word[0].pinyin}</p>}
      </div>
    </div>
  );
}

export default PoemPage;
