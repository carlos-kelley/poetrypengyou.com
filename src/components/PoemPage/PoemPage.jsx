import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import opencc-js
import * as OpenCC from "opencc-js";
// import css
import WordPage from "../WordPage/WordPage";
import EnglishPage from "../EnglishPage/EnglishPage";
import NextButton from "../NextButton/NextButton";
import LastButton from "../LastButton/LastButton";
import BackButton from "../BackButton/BackButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  // const OpenCC = require("opencc");

  const converter = OpenCC.Converter({
    from: "cn",
    to: "hk",
  });
  const converterSimp = OpenCC.Converter({
    from: "hk",
    to: "cn",
  });
  const character = useSelector(
    (store) => store.character
  );
  const [localCharacter, setLocalCharacter] =
    useState("simplified");

  const [titleTraditional, setTitleTraditional] =
    useState("");
  const [poemTraditional, setPoemTraditional] =
    useState("");
  const [
    authorTraditional,
    setAuthorTraditional,
  ] = useState("");

  const params = useParams();

  const poemNumberParam = params.number;
  const poemTitle = null;
  // const poemTraditional =
  //   "";

  const [poemNumber, setPoemNumber] =
    useState(null);
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
    setPoemNumber(poemNumberParam);

    dispatch({
      type: "FETCH_POEM",
      payload: Number(poemNumberParam),
    });

    // then set poemTraditional

    // set poemTraditional
  }, [params.number]);

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
        converterSimp(
          window.getSelection().toString()
        )
      );
    // dispatch to word reducer
    dispatch({
      type: "LOOKUP_WORD",
      payload: converterSimp(
        window.getSelection().toString()
      ),
    });
  }

  return (
    <div>
      {/* onclick set local character to traditional */}
      <BackButton />
      <button
        className="characterButton"
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
        {localCharacter === "simplified" && "繁"}
        {localCharacter === "traditional" &&
          "简 "}
      </button>
      <div className="poem">
        {/* if poem[0] exists and character is simplified */}
        {poem[0] &&
          localCharacter === "simplified" && (
            <h3 className = "titleClass" onMouseUp={selection}>
              {poem[0].title_simplified}
            </h3>
          )}
        {poem[0] &&
          localCharacter === "simplified" && (
            <h3 className = "authorClass" onMouseUp={selection}>
              {poem[0].author_simplified}
            </h3>
          )}
        {poem[0] &&
          localCharacter === "simplified" && (
            <p onMouseUp={selection}>
              {poem[0].poem_simplified}
            </p>
          )}

        {poem[0] &&
          localCharacter === "traditional" && (
            <h3 onMouseUp={selection}>
              {titleTraditional}
            </h3>
          )}
        {poem[0] &&
          localCharacter === "traditional" && (
            <h3 onMouseUp={selection}>
              {authorTraditional}
            </h3>
          )}
        {poem[0] &&
          localCharacter === "traditional" && (
            <p onMouseUp={selection}>
              {poemTraditional}
            </p>
          )}
      </div>
      <EnglishPage />
      <WordPage />
      <LastButton className="navButton" />
      <NextButton className="navButton" />
    </div>
  );
}

export default PoemPage;
