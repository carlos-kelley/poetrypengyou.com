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
import { ReactComponent as TraditionalOff } from "./traditional_off.svg";
import { ReactComponent as TraditionalOn } from "./traditional_on.svg";

import "./PoemPage.css";

// This component displays the Chinese poem and contains the buttons.
//TODO: Those buttons should be moved to a separate component later.
function PoemPage() {
  const dispatch = useDispatch();
  const poem = useSelector((store) => store.poem);

  const converterTrad = OpenCC.Converter({
    from: "cn",
    to: "hk",
  });
  const converterSimp = OpenCC.Converter({
    from: "hk",
    to: "cn",
  });

  const [englishToggle, setEnglishToggle] =
    useState(false);

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
    allReset();
    dispatch({
      type: "UNSET_WORD",
    });
    setPoemNumber(poemNumberParam);

    // Set loader to true before fetching the poem
    setLoader(true);
    console.log("loader is true");

    // Fetch the poem on page load
    dispatch({
      type: "FETCH_POEM",
      payload: Number(poemNumberParam),
    });

    // Set loader to false after the poem is fetched
    setLoader(false);
    console.log("loader is false");
  }, [params.number]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 500);

    setTimeout(() => {
      // this is the opencc conversion
      setPoemTraditional(
        converterTrad(poem[0].poem_simplified)
      );
      setTitleTraditional(
        converterTrad(poem[0].title_simplified)
      );
      setAuthorTraditional(
        converterTrad(poem[0].author_simplified)
      );
    }, 4);

    setTimeout(() => {
      setPoemSimplified(poem[0].poem_simplified);
      setTitleSimplified(
        poem[0].title_simplified
      );
      setAuthorSimplified(
        poem[0].author_simplified
      );
    }, 4);
    setTimeout(() => {}, 4);

    //i think this has to run because when the page loads, titleTraditional is still empty
    setTimeout(() => {
      titleTraditional === "" &&
        setTitleTraditional(
          converterTrad(poem[0].title_simplified)
        );
      setPoemTraditional(
        converterTrad(poem[0].poem_simplified)
      );
      setAuthorTraditional(
        converterTrad(poem[0].author_simplified)
      );
    }, 4);
  }, [poem]);

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

  const [titleClicked, setTitleClicked] =
    useState(null);
  const [poemClicked, setPoemClicked] =
    useState(null);
  const [authorClicked, setAuthorClicked] =
    useState(null);

  const titleReset = () => {
    setAuthorClicked(null);
    setPoemClicked(null);
  };
  const poemReset = () => {
    setAuthorClicked(null);
    setTitleClicked(null);
  };
  const authorReset = () => {
    setPoemClicked(null);
    setTitleClicked(null);
  };
  const allReset = () => {
    setAuthorClicked(null);
    setPoemClicked(null);
    setTitleClicked(null);
  };

  function lookupWord(character) {
    dispatch({
      type: "LOOKUP_WORD",
      payload: converterSimp(character),
    });
  }

  function isValidCharacter(character) {
    const invalidChars = [",", ".", "?"];
    return !invalidChars.includes(character);
  }

  return (
    <div>
      {loader === false && (
        <h1 className="loader">loading...</h1>
      )}
      {loader === true && (
        <>
          <BackButton />
          <div className="navContainer">
            <NavButtons allReset={allReset} />
          </div>

          <div
            className="unsetWord"
            onClick={() => {
              dispatch({
                type: "UNSET_WORD",
              });
            }}
          />

          <div>
            {/* Button to conditionally toggle character sets via a Saga */}
            {/* if localCharacter is simplified, show TraditionalOff */}

            {localCharacter === "simplified" && (
              <TraditionalOff
                className="traditionalOff"
                onClick={() => {
                  localCharacter === "simplified"
                    ? setLocalCharacter(
                        "traditional"
                      )
                    : setLocalCharacter(
                        "simplified"
                      );
                }}
              ></TraditionalOff>
            )}
            {/* else */}
            {localCharacter === "traditional" && (
              <TraditionalOn
                className="traditionalOff"
                onClick={() => {
                  localCharacter === "simplified"
                    ? setLocalCharacter(
                        "traditional"
                      )
                    : setLocalCharacter(
                        "simplified"
                      );
                }}
              ></TraditionalOn>
            )}
          </div>

          {/* this is where the simplified poem is displayed */}
          <div className="poemContainerSimplified">
            {poem[0] &&
              localCharacter === "simplified" && (
                <div className="poem">
                  {poem[0] &&
                    localCharacter ===
                      "simplified" && (
                      //map over the split title and display each character with no spaces
                      <h3 className="chineseTitle">
                        {splitTitleSimplified.map(
                          (character, index) => {
                            return (
                              <span
                                key={index}
                                onClick={() => {
                                  setTitleClicked(
                                    index
                                  );
                                  titleReset();
                                  lookupWord(
                                    character
                                  );
                                }}
                                style={{
                                  background:
                                    titleClicked ===
                                    index
                                      ? "lightblue"
                                      : null,
                                }}
                              >
                                {character}
                              </span>
                            );
                          }
                        )}
                      </h3>
                    )}
                  {/* if poem exists and character sets are simplified, show the chinese AUTHOR */}
                  {poem[0] &&
                    localCharacter ===
                      "simplified" && (
                      // map over the split author and display each character with no spaces
                      <h3 className="chineseAuthor">
                        {splitAuthorSimplified.map(
                          (character, index) => {
                            return (
                              <span
                                key={index}
                                //onclick get character
                                onClick={() => {
                                  setAuthorClicked(
                                    index
                                  );
                                  authorReset();
                                  lookupWord(
                                    character
                                  );
                                }}
                                style={{
                                  background:
                                    authorClicked ===
                                    index
                                      ? "lightblue"
                                      : null,
                                }}
                              >
                                {character}
                              </span>
                            );
                          }
                        )}
                      </h3>
                    )}
                  {/* if poem exists and character sets are simplified, show the chinese POEM  */}
                  {poem[0] &&
                    localCharacter ===
                      "simplified" && (
                      <p className="chinesePoem">
                        {splitPoemSimplified.map(
                          (character, index) => {
                            // Add a newline after comma or period
                            const isNewline =
                              character === "," ||
                              character === "." ||
                              character === "?";
                            return (
                              <React.Fragment
                                key={index}
                              >
                                <span
                                  // change classname of target to selected
                                  //onclick get character
                                  onClick={() => {
                                    if (
                                      isValidCharacter(
                                        character
                                      )
                                    ) {
                                      setPoemClicked(
                                        index
                                      );
                                      poemReset();
                                      lookupWord(
                                        character
                                      );
                                    }
                                  }}
                                  style={{
                                    background:
                                      poemClicked ===
                                      index
                                        ? "lightblue"
                                        : null,
                                  }}
                                >
                                  {character}
                                </span>
                                {isNewline && (
                                  <br />
                                )}
                              </React.Fragment>
                            );
                          }
                        )}
                      </p>
                    )}
                </div>
              )}
          </div>

          {/* this is where the traditional poem is displayed */}
          <div className="poemContainerTraditional">
            {poem[0] &&
              localCharacter ===
                "traditional" && (
                <div className="poem">
                  {/* if poem exists and character sets are traditional, show the chinese TITLE */}
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
                                  setTitleClicked(
                                    index
                                  );
                                  titleReset();
                                  lookupWord(
                                    character
                                  );
                                }}
                                style={{
                                  background:
                                    titleClicked ===
                                    index
                                      ? "lightblue"
                                      : null,
                                }}
                              >
                                {character}
                              </span>
                            );
                          }
                        )}
                      </h3>
                    )}
                  {/* if poem exists and character sets are traditional, show the chinese AUTHOR */}
                  {poem[0] &&
                    localCharacter ===
                      "traditional" && (
                      <h3 className="chineseAuthor">
                        {splitAuthorTraditional.map(
                          (character, index) => {
                            return (
                              <span
                                key={index}
                                //onclick get character, convert to simplified, and dispatch to saga
                                onClick={() => {
                                  setAuthorClicked(
                                    index
                                  );
                                  authorReset();
                                  lookupWord(
                                    character
                                  );
                                }}
                                style={{
                                  background:
                                    authorClicked ===
                                    index
                                      ? "lightblue"
                                      : null,
                                }}
                              >
                                {character}
                              </span>
                            );
                          }
                        )}
                      </h3>
                    )}
                  {/* if poem exists and character sets are traditional, show the chinese POEM  */}
                  {poem[0] &&
                    localCharacter ===
                      "traditional" && (
                      <p className="chinesePoem">
                        {splitPoemTraditional.map(
                          (character, index) => {
                            // Add a newline after comma, period, or question mark
                            const isNewline =
                              character === "," ||
                              character === "." ||
                              character === "?";

                            return (
                              <React.Fragment
                                key={index}
                              >
                                {!isNewline ? (
                                  <span
                                    onClick={() => {
                                      if (
                                        isValidCharacter(
                                          character
                                        )
                                      ) {
                                        setPoemClicked(
                                          index
                                        );
                                        poemReset();
                                        lookupWord(
                                          character
                                        );
                                      }
                                    }}
                                    style={{
                                      background:
                                        poemClicked ===
                                        index
                                          ? "lightblue"
                                          : null,
                                    }}
                                  >
                                    {character}
                                  </span>
                                ) : (
                                  character
                                )}
                                {isNewline && (
                                  <br />
                                )}
                              </React.Fragment>
                            );
                          }
                        )}
                      </p>
                    )}
                </div>
              )}
          </div>

          <WordPage allReset={allReset} />
          <div
            className="unsetWord"
            onClick={() => {
              dispatch({
                type: "UNSET_WORD",
              });
              allReset();
            }}
          />

          <EnglishPage
            // pass down Clicked props
            englishToggle={englishToggle}
            setEnglishToggle={setEnglishToggle}
            allReset={allReset}
          />
        </>
      )}
    </div>
  );
}

export default PoemPage;
