import React, { useEffect } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { useHistory } from "react-router-dom";
import "./PoemSelectPage.css";

function PoemSelectPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { allPoems } = useSelector(
    (store) => store
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_POEMS" });
  }, []);

  const goToPoem = (poemNumber) => {
    history.push(`/poem/${poemNumber}`);
  };

  return (
    <div>
      <h2 className="poemSelectHeading">
        Select a Poem
      </h2>
      {!allPoems ? (
        <p>...loading...</p>
      ) : (
        <ul>
          {allPoems.map((poem, index) => (
            <li
              key={poem.id}
              className="poemListItem"
              onClick={() => {
                goToPoem(poem.number);
              }}
            >
              {poem.number} &nbsp;
              {poem.author_simplified}《
              {poem.title_simplified}》
              <br />
              {poem.author_english} &nbsp; "
              {poem.title_english}"
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PoemSelectPage;
