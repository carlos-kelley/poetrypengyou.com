import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./WordPage.css";

// This component displays the english word and pinyin
function WordPage(props) {
  const word = useSelector((store) => store.word);

  return (
    <div>
      <div className="wordContainer">
          {word[0] && (
            <p className="englishDefinition">
              {word[0].english}
            </p>
          )}


          {word[0] && word[0].tone === 1 && (
            <p className="pinyinRedClass">
              {word[0].pinyin}
            </p>
          )}

          {word[0] && word[0].tone === 2 && (
            <p className="pinyinOrangeClass">
              {word[0].pinyin}
            </p>
          )}

          {word[0] && word[0].tone === 3 && (
            <p className="pinyinGreenClass">
              {word[0].pinyin}
            </p>
          )}

          {word[0] && word[0].tone === 4 && (
            <p className="pinyinBlueClass">
              {word[0].pinyin}
            </p>
          )}

      </div>
    </div>
  );
}

export default WordPage;
