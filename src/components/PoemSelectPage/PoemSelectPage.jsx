import React, { useEffect } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import "./PoemSelectPage.css";
import PoemItem from "./PoemItem";

function PoemSelectPage(props) {
  const dispatch = useDispatch();
  const { allPoems } = useSelector(
    (store) => store
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_POEMS" });
  }, []);

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
            <PoemItem key={poem.id} poem={poem} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default PoemSelectPage;
