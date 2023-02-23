import React, { useState } from "react";
import "./TestBackground.css";
import { useHistory } from "react-router-dom";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TestBackgroundFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const history = useHistory();

  return (
    <div>
      <div className="testBackgroundBackground">
        <h2
          className="testBackgroundHeader"
          onClick={() => {
            console.log(
              "in test background onclick"
            );
            history.push(`/testroute`);
          }}
        >
          POOP
        </h2>
      </div>
    </div>
  );
}

export default TestBackgroundFunction;
