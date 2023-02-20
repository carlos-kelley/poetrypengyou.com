import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import css
import "./WordPage.css";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function WordPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
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
