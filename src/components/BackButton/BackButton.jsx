import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function BackButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const history = useHistory();
  const poem = useSelector((store) => store.poem);
  const dispatch = useDispatch();
  function pushBack() {
    history.push("/poem/1");
  }

  return (
    <div>
      <button onClick={pushBack}> Back </button>
    </div>
  );
}

export default BackButton;
