import React from "react";
import { useSelector } from "react-redux";
import "./WordPage.css";

function WordPage() {
  const word = useSelector((store) => store.word);

  const toneClasses = [
    "pinyinRedClass",
    "pinyinOrangeClass",
    "pinyinGreenClass",
    "pinyinBlueClass",
  ];

  return (
    <div>
      <div className="wordContainer">
        {word[0] && (
          <p className="englishDefinition">
            {word[0].english}
          </p>
        )}

        {word[0] && (
          <p
            className={
              toneClasses[word[0].tone - 1]
            }
          >
            {word[0].pinyin}
          </p>
        )}
      </div>
    </div>
  );
}

export default WordPage;
