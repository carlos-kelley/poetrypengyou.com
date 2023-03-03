import React from "react";
import { useSelector } from "react-redux";
import "./WordPage.css";

function WordPage() {
  const getToneClass = (tone) => {
    const toneClasses = [
      "pinyinRedClass",
      "pinyinOrangeClass",
      "pinyinGreenClass",
      "pinyinBlueClass",
    ];

    return toneClasses[tone - 1] || "";
  };

  const word = useSelector((store) => store.word);
  const { english, tone, pinyin } =
    word?.[0] || {};

  return (
    <div>
      <div className="wordDetailsContainer">
        {english && (
          <>
            <p className="englishDefinition">
              {english}
            </p>
            <p className={getToneClass(tone)}>
              {pinyin}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default WordPage;
