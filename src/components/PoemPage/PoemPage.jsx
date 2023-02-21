import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as OpenCC from "opencc-js";
import WordPage from "../WordPage/WordPage";
import EnglishPage from "../EnglishPage/EnglishPage";
import BackButton from "../BackButton/BackButton";
import NavButtons from "../NavButtons/NavButtons";
import "./PoemPage.css";

// This component displays the Chinese poem and contains the buttons.
//TODO: Those buttons should be moved to a separate component later.
function PoemPage(props) {
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

    // fetch the poem on page load
    dispatch({
      type: "FETCH_POEM",
      payload: Number(poemNumberParam),
    });
  }, [params.number]);

  //get the word that is selected. FIX: should be on hover instead of mouseup
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
      {/* FIX: should not happen on mouse up but on touch, but how to get the word then? */}
      <div onMouseUp={selection}>
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

              // this is the opencc conversion
              //FIX: THIS ONLY HAPPENS ON BUTTONCLICK, NOT ON PAGE LOAD
              // if character set is traditional, set the hook to the traditional variants
              localCharacter === "traditional" &&
                setTitleTraditional(
                  converter(
                    poem[0].title_simplified
                  )
                );
              setAuthorTraditional(
                converter(
                  poem[0].author_simplified
                )
              );
              setPoemTraditional(
                converter(poem[0].poem_simplified)
              );

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

        {/* this is where the poem is displayed */}
        {poem[0] &&
          localCharacter === "simplified" && (
            <div className="poem">
              <div className="chineseInfoContainer">
                {/* if poem exists and character sets are simplified, show the chinese title onmouseup */}
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
                {/* if poem exists and character sets are simplified, show the chinese author onmouseup */}
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
              {/* if poem exists and character sets are simplified, show the chinese poem onmouseup */}
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
                {/* if poem exists and character sets are simplified, show the chinese title onmouseup */}
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
          <NavButtons />
        </div>
      </div>
    </div>
  );
}

export default PoemPage;
