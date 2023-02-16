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
  const store = useSelector((store) => store);
  const [heading, setHeading] =
    useState("Poem 1");

  useEffect(() => {
    dispatch({
      type: "FETCH_POEM",
      payload: 1,
    });
  }, []);

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default Poem1Page;
