import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function NextButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const history = useHistory();
  const poem = useSelector((store) => store.poem);
  const location = useLocation();
  const dispatch = useDispatch();
  function pushNext() {
    dispatch({
      type: "FETCH_NEXT_POEM",
      payload: poem[0].number,
    });

    console.log("poem.number:", poem[0].number);
    history.push(`/poem/${poem[0].number + 1}`);
    //   refresh page
    window.location.reload();
    //log poem number
    console.log(
      "poem.number is now:",
      poem[0].number
    );
  }

  //   useEffect(() => {
  //     fetchData();
  //   }, [location.key]);

  return (
    <div>
      <button onClick={pushNext}> Next </button>
    </div>
  );
}

export default NextButton;
