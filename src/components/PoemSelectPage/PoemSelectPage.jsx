import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PoemSelectPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();

  const allPoems = useSelector(
    (store) => store.allPoems
  );

  useEffect(() => {
    // dispatch to get all poems
    dispatch({
      type: "FETCH_ALL_POEMS",
    });
    console.log(
      "In PoemSelectPage, allPoems:",
      allPoems
    );
  }, []);

  const goToPoem = (poemNumber) => {
    console.log(
      "In PoemSelectPage, goToPoem, poemNumber:",
      poemNumber
    );
    history.push(`/poem/${poemNumber}`);
  };

  return (
    <div>
      <h2>Select a Poem</h2>
      {!allPoems ? (
        <p>...loading...</p>
      ) : (
        <ul>
          {allPoems.map((poem, index) => (
            <li
              key={poem.id}
              onClick={() => {
                goToPoem(poem.number);
              }}
            > {poem.number} &nbsp;
              {poem.author_simplified}《
              {poem.title_simplified}》
              <br />
              {poem.author_english} &nbsp; "
              {poem.title_english}""
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PoemSelectPage;
