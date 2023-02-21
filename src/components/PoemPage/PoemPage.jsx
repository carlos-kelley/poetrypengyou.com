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

  const [poemSimplified, setPoemSimplified] =
    useState("");
  const [titleSimplified, setTitleSimplified] =
    useState("");
  const [authorSimplified, setAuthorSimplified] =
    useState("");

  const params = useParams();

  const poemNumberParam = params.number;

  const [poemNumber, setPoemNumber] =
    useState(null);

  const [loader, setLoader] = useState(false);
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
      setLoader(true);
    }, 500);

    setTimeout(() => {
      // function that switches to true at end of timeout

      // this is the opencc conversion
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

    setTimeout(() => {
      localCharacter === "simplified" &&
        setPoemSimplified(
          poem[0].poem_simplified
        );
      setTitleSimplified(
        poem[0].title_simplified
      );
      setAuthorSimplified(
        poem[0].author_simplified
      );
    }, 4);
    setTimeout(() => {
      console.log(
        "titleSimplified after timeout:",
        titleSimplified
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

  const splitPoemSimplified =
    poemSimplified.split("");
  const splitTitleSimplified =
    titleSimplified.split("");
  const splitAuthorSimplified =
    authorSimplified.split("");

  function lookupWord(character) {
    console.log("character in span:", character);
    dispatch({
      type: "LOOKUP_WORD",
      payload: converterSimp(character),
    });
  }

  return (
    <div>
      {loader === false && (
        <h1 className="loader">loading...</h1>
      )}
      {loader === true && (
        <>
          {/* FIX: should not happen on mouse up but on touch, but how to get the word then? */}
          {/* this mouseup is not necessary */}
          <div onMouseUp={selection}>
            <BackButton />
            <div className="unsetWord"
              onClick={() => {
                dispatch({
                  type: "UNSET_WORD",
                });
              }}
            />
            <div className="characterButtonClass">
              {/* Button to conditionally toggle character sets via a Saga */}
              <button
                className="characterButton"
                onClick={() => {
                  // dispatch({
                  //   type: "UNSET_WORD",
                  // });
                  localCharacter === "simplified"
                    ? setLocalCharacter(
                        "traditional"
                      )
                    : setLocalCharacter(
                        "simplified"
                      );
                  console.log(
                    "character:",
                    localCharacter
                  );
                }}
              >
                {localCharacter ===
                  "simplified" && "简"}

                {localCharacter ===
                  "traditional" && "繁 "}
              </button>
            </div>

            {/* this is where the simplified poem is displayed */}
            {/* this should be componentized */}
            <div className="poemContainerSimplified">
              {poem[0] &&
                localCharacter ===
                  "simplified" && (
                  <div className="poem">
                    <div className="chineseInfoContainer">
                      {/* if poem exists and character sets are simplified, show the chinese title */}
                      {poem[0] &&
                        localCharacter ===
                          "simplified" && (
                          //map over the split title and display each character with no spaces
                          <h3 className="chineseTitle">
                            {splitTitleSimplified.map(
                              (
                                character,
                                index
                              ) => {
                                return (
                                  <span
                                    key={index}
                                    //onclick get character
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
                      {/* if poem exists and character sets are simplified, show the chinese author */}
                      {poem[0] &&
                        localCharacter ===
                          "simplified" && (
                          // map over the split author and display each character with no spaces
                          <h3 className="chineseAuthor">
                            {splitAuthorSimplified.map(
                              (
                                character,
                                index
                              ) => {
                                return (
                                  <span
                                    key={index}
                                    //onclick get character
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
                    </div>
                    {/* if poem exists and character sets are simplified, show the chinese poem  */}
                    {poem[0] &&
                      localCharacter ===
                        "simplified" && (
                        <p className="chinesePoem">
                          {splitPoemSimplified.map(
                            (
                              character,
                              index
                            ) => {
                              return (
                                <span
                                  key={index}
                                  //onclick get character
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
            </div>

            {/* this is where the traditional poem is displayed */}
            {/* this should be componentized */}
            <div className="poemContainerTraditional">
              {poem[0] &&
                localCharacter ===
                  "traditional" && (
                  <div className="poem">
                    <div className="chineseInfoContainer">
                      {/* if poem exists and character sets are traditional, show the chinese title onmouseup */}
                      {poem[0] &&
                        localCharacter ===
                          "traditional" && (
                          // map over the split title and display each character with no spaces
                          <h3 className="chineseTitle">
                            {splitTitleTraditional.map(
                              (
                                character,
                                index
                              ) => {
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
                      {/* if poem exists and character sets are traditional, show the chinese author */}
                      {poem[0] &&
                        localCharacter ===
                          "traditional" && (
                          <h3 className="chineseAuthor">
                            {splitAuthorTraditional.map(
                              (
                                character,
                                index
                              ) => {
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
                    </div>
                    {/* if poem exists and character sets are traditional, show the chinese poem  */}
                    {poem[0] &&
                      localCharacter ===
                        "traditional" && (
                        // map over the split poem and display each character with no spaces
                        <p className="chinesePoem">
                          {splitPoemTraditional.map(
                            (
                              character,
                              index
                            ) => {
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
            </div>
            <EnglishPage />
            <WordPage />
            <div
              className="unsetWord"
              onClick={() => {
                dispatch({
                  type: "UNSET_WORD",
                });
              }}
            />

            <div className="navContainer">
              <NavButtons />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PoemPage;
