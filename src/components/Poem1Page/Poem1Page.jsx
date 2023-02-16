import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Poem1Page(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const poem = useSelector((store) => store.poem);
  const [heading, setHeading] =
    useState("Poem 1");

  useEffect(() => {
    dispatch({
      type: "FETCH_POEM",
      payload: 1,
    });
  }, []);

  function selection() {
    if (window.getSelection)
      console.log(
        "selected:",
        window.getSelection().toString()
      );
    return window.getSelection();
  }

  return (
    <div>
      <h2>{heading}</h2>
      {/* console log the poem reducer */}
      {/* stringify */}
      {/* if poem reducer is not null */}
      {poem[0] && <p>{poem[0].chinese}</p>}
      <button onClick={selection}>Select</button>
    </div>
    // button to trigger selection function
  );
}

export default Poem1Page;
