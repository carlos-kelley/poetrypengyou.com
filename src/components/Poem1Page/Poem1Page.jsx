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
  const word = useSelector((store) => store.word);
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
    // dispatch to word reducer
    dispatch({
      type: "LOOKUP_WORD",
      payload: window.getSelection().toString(),
    });
  }

  return (
    <div>
      <h2>{heading}</h2>
      <div className="poem">
        {poem[0] && (
          <p onMouseUp={selection}>
            {poem[0].chinese}
          </p>
        )}
      </div>
    </div>
  );
}

export default Poem1Page;
