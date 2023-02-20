import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as OpenCC from "opencc-js";
import WordPage from "../WordPage/WordPage";
import EnglishPage from "../EnglishPage/EnglishPage";
import NextButton from "../NextButton/NextButton";
import LastButton from "../LastButton/LastButton";
import BackButton from "../BackButton/BackButton";
// import poempage.css
import "./PoemPage.css";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PoemPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const poem = useSelector((store) => store.poem);

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

  const [poemNumber, setPoemNumber] =
    useState(null);
  useEffect(() => {
    console.log(
      "titleTraditional:",
      titleTraditional
    );
    // setTitleTraditional("");
    // setPoemTraditional("");
    // setAuthorTraditional("");

    dispatch({
      type: "UNSET_WORD",
    });
    setPoemNumber(poemNumberParam);

    dispatch({
      type: "FETCH_POEM",
      payload: Number(poemNumberParam),
    });
  }, [params.number]);

  function selection() {
    if (window.getSelection)
      console.log(
        "selected:",
        converterSimp(
          window.getSelection().toString()
        )
      );
    dispatch({
      type: "LOOKUP_WORD",
      payload: converterSimp(
        window.getSelection().toString()
      ),
    });
  }

  return (
    <div>
      <div
        className="selectionField"
        onMouseUp={selection}
      >
        {/* onclick set local character to traditional */}
        <BackButton />
        <div className="characterButtonClass">
          {/* Button to conditionally toggle character sets via a Saga */}
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
                  converter(
                    poem[0].title_simplified
                  )
                );
              setPoemTraditional(
                converter(poem[0].poem_simplified)
              );
              setAuthorTraditional(
                converter(
                  poem[0].author_simplified
                )
              );

              titleTraditional === "" &&
                setTitleTraditional(
                  converter(
                    poem[0].title_simplified
                  )
                );
              setPoemTraditional(
                converter(poem[0].poem_simplified)
              );
              setAuthorTraditional(
                converter(
                  poem[0].author_simplified
                )
              );
              // wait 1 second then clear

              console.log(
                "titleTraditional:",
                titleTraditional
              );
            }}
          >
            {localCharacter === "simplified" &&
              "简"}

            {localCharacter === "traditional" &&
              "繁 "}
          </button>
        </div>

        {poem[0] &&
          localCharacter === "simplified" && (
            <div className="poem">
              <div className="chineseInfoContainer">
                {poem[0] &&
                  localCharacter ===
                    "simplified" && (
                    <h3
                      className="chineseTitle"
                      onMouseUp={selection}
                    >
                      {poem[0].title_simplified}
                    </h3>
                  )}
                {poem[0] &&
                  localCharacter ===
                    "simplified" && (
                    <h3
                      className="chineseAuthor"
                      onMouseUp={selection}
                    >
                      {poem[0].author_simplified}
                    </h3>
                  )}
              </div>

              {poem[0] &&
                localCharacter ===
                  "simplified" && (
                  <p className="chinesePoem">
                    {poem[0].poem_simplified}
                  </p>
                )}
            </div>
          )}

        {poem[0] &&
          localCharacter === "traditional" && (
            <div className="poem">
              <div className="chineseInfoContainer">
                {poem[0] &&
                  localCharacter ===
                    "traditional" && (
                    <h3
                      className="chineseTitle"
                      onMouseUp={selection}
                    >
                      {titleTraditional}
                    </h3>
                  )}
                {poem[0] &&
                  localCharacter ===
                    "traditional" && (
                    <h3
                      className="chineseAuthor"
                      onMouseUp={selection}
                    >
                      {authorTraditional}
                    </h3>
                  )}
              </div>
              {poem[0] &&
                localCharacter ===
                  "traditional" && (
                  <p
                    className="chinesePoem"
                    onMouseUp={selection}
                  >
                    {poemTraditional}
                  </p>
                )}
            </div>
          )}

        <EnglishPage />
        <WordPage />

        <div className="navContainer">
          <div className="leftNav">
            <LastButton />
          </div>
          <div className="rightNav">
            <NextButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoemPage;
