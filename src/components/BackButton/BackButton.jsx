import React, { useState } from "react";
import {
  useHistory,
} from "react-router-dom";
import { ReactComponent as BackButtonIcon } from "./arrow_back.svg";
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
      <BackButtonIcon className="backButton"
        onClick={pushBack}
        color="disabled"
        sx={{
          fontSize: 30,
          color: "hsl(0, 0%, 25%)",
        }}
      >
        {" "}
        Select Poem{" "}
      </BackButtonIcon>
    </div>
  );
}

export default BackButton;
