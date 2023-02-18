import React, { useState } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function BackButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const history = useHistory();

  function pushBack() {
    history.push(`/poemselect`);
  }

  return (
    <div>
      <button onClick={pushBack}>
        {" "}
        Select Poem{" "}
      </button>
    </div>
  );
}

export default BackButton;
