import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Footer from "../Footer/Footer";
import "./PoemSelectPage.css";

//this is the page that displays all the poems
function PoemSelectPage(props) {

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
    //push to the selected poem page
    history.push(`/poem/${poemNumber}`);
  };

  return (
    <div>
      <h2 className = "poemSelectHeading">Select a Poem</h2>
      {!allPoems ? (
        //if allPoems is not loaded yet, display loading
        <p>...loading...</p>
      ) : (
          //map through all poems and display them
        <ul>
          {allPoems.map((poem, index) => (
            <li
              key={poem.id}
              className = "poemListItem"
              onClick={() => {
                goToPoem(poem.number);
              }}
            > {poem.number} &nbsp;
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
