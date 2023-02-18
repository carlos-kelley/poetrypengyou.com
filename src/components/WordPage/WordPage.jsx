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
      <div className="definitionClass">
      <div className="wordClass">
        {word[0] && <p>{word[0].english}</p>}
      </div>
      <div className="pinyinClass">
        {word[0] && word[0].tone === 1 && (
          <p className="pinyinRedClass">
            {word[0].pinyin}
          </p>
        )}
        {/* if word[0].tone is 2, change class to pinyinOrangeClass */}
        {word[0] && word[0].tone === 2 && (
          <p className="pinyinOrangeClass">
            {word[0].pinyin}
          </p>
        )}
        {/* if word[0].tone is 3, change class to pinyinGreenClass */}
        {word[0] && word[0].tone === 3 && (
          <p className="pinyinGreenClass">
            {word[0].pinyin}
          </p>
        )}
        {/* if word[0].tone is 4, change class to pinyinBlueClass */}
        {word[0] && word[0].tone === 4 && (
          <p className="pinyinBlueClass">
            {word[0].pinyin}
          </p>
          )}
          </div>
      </div>
    </div>
  );
}

export default WordPage;
