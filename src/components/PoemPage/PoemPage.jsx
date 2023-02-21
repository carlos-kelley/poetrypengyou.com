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
    console.log("PARAM CHANGED, REFERESHING");
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

  useEffect(() => {
    console.log("poem changed, refreshing");
    // this is the opencc conversion
    // if character set is traditional, set the hook to the traditional variants

    setTimeout(() => {
      localCharacter === "traditional" &&
        setPoemTraditional(
          converter(poem[0].poem_simplified)
        );
      setTitleTraditional(
        converter(poem[0].title_simplified)
      );
      setAuthorTraditional(
        converter(poem[0].author_simplified)
      );
    }, 4);

    //i think this has to run because when the page loads, titleTraditional is still empty
    setTimeout(() => {
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
    }, 4);
  }, [poem]);

  //get the word that is selected. FIX: should be on hover instead of mouseup
  function selection() {
    if (window.getSelection)
      console.log(
        "selected:",
        converterSimp()
        // get the clicked on span
      );
    dispatch({
      type: "LOOKUP_WORD",
      payload: converterSimp(
        window.getSelection().toString()
      ),
    });
  }

  const splitPoemTraditional =
    poemTraditional.split("");
  const splitTitleTraditional =
    titleTraditional.split("");
  const splitAuthorTraditional =
    authorTraditional.split("");

  function lookupWord(character) {
    console.log("character in span:", character);
    dispatch({
      type: "LOOKUP_WORD",
      payload: converterSimp(character),
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
              // localCharacter === "traditional" &&
              //   setPoemTraditional(
              //     converter(
              //       poem[0].poem_simplified
              //     )
              //   );
              // setTitleTraditional(
              //   converter(
              //     poem[0].title_simplified
              //   )
              // );
              // setAuthorTraditional(
              //   converter(
              //     poem[0].author_simplified
              //   )
              // );

              // //i think this has to run because when the page loads, titleTraditional is still empty
              // titleTraditional === "" &&
              //   setTitleTraditional(
              //     converter(
              //       poem[0].title_simplified
              //     )
              //   );
              // setPoemTraditional(
              //   converter(poem[0].poem_simplified)
              // );
              // setAuthorTraditional(
              //   converter(
              //     poem[0].author_simplified
              //   )
              // );
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
                    // map over the split title and display each character with no spaces
                    <h3 className="chineseTitle">
                      {splitTitleTraditional.map(
                        (character, index) => {
                          return (
                            <span
                              key={index}
                              //onclick get character, convert to simplified, and dispatch to saga
                              onClick={() => {
                                lookupWord(
                                  character
                                );
                              }}
                            >
                              {character}
                            </span>
                          );
                        }
                      )}
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
                  // map over the split poem and display each character with no spaces
                  <p className="chinesePoem">
                    {splitPoemTraditional.map(
                      (character, index) => {
                        return (
                          <span
                            key={index}
                            //onclick get character, convert to simplified, and dispatch to saga
                            onClick={() => {
                              lookupWord(
                                character
                              );
                            }}
                          >
                            {character}
                          </span>
                        );
                      }
                    )}
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
