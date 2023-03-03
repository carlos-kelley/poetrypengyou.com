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
import ChineseText from "./ChineseText";

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
    allReset();
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
    setTimeout(() => {
      setLoader(true);
    }, 500);

    setTimeout(() => {
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
    setTimeout(() => {}, 4);

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

  return (
    <div>
      {loader === false && (
        <h1 className="loader">loading...</h1>
      )}
      {loader === true && (
        <>
          <BackButton />
          <div
            className="unsetWord"
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
                localCharacter === "simplified"
                  ? setLocalCharacter(
                      "traditional"
                    )
                  : setLocalCharacter(
                      "simplified"
                    );
              }}
            >
              {localCharacter === "simplified" &&
                "繁"}

              {localCharacter === "traditional" &&
                "简 "}
            </button>
          </div>

          {/* this is where the simplified poem is displayed */}
          {/* this should be componentized */}
          <div className="poemContainerSimplified">
            {poem[0] &&
              localCharacter === "simplified" && (
                <div className="poem">
                  <div className="chineseInfoContainer">
                    <ChineseText
                      characters={
                        splitTitleSimplified
                      }
                      clickedIndex={titleClicked}
                      onclick={(index) => {
                        setTitleClicked(index);
                        titleReset();
                        lookupWord(
                          splitTitleSimplified[
                            index
                          ]
                        );
                      }}
                    />
                    <ChineseText
                      characters={
                        splitAuthorSimplified
                      }
                      clickedIndex={authorClicked}
                      onClick={(index) => {
                        setAuthorClicked(index);
                        authorReset();
                        lookupWord(
                          splitAuthorSimplified[
                            index
                          ]
                        );
                      }}
                    />
                  </div>

                  {/* if poem exists and character sets are simplified, show the chinese POEM  */}
                  {poem[0] &&
                    localCharacter ===
                      "simplified" && (
                      <p className="chinesePoem">
                        <ChineseText
                          characters={
                            splitPoemSimplified
                          }
                          clickedIndex={
                            poemClicked
                          }
                          onClick={(index) => {
                            setPoemClicked(index);
                            poemReset();
                            lookupWord(
                              splitPoemSimplified[
                                index
                              ]
                            );
                          }}
                        />
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
                    {/* if poem exists and character sets are traditional, show the chinese TITLE */}
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
                            (
                              character,
                              index
                            ) => {
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
                  </div>
                  {/* if poem exists and character sets are traditional, show the chinese POEM  */}
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
                                  setPoemClicked(
                                    index
                                  );
                                  poemReset();
                                  lookupWord(
                                    character
                                  );
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
                            );
                          }
                        )}
                      </p>
                    )}
                </div>
              )}
          </div>
          <EnglishPage
            // pass down Clicked props
            allReset={allReset}
          />
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

          <div className="navContainer">
            <NavButtons allReset={allReset} />
          </div>
        </>
      )}
    </div>
  );
}

export default PoemPage;
