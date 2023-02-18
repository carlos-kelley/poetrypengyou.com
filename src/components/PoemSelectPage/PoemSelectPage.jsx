import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PoemSelectPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const poems = useSelector(
    (store) => store.poem
  );

  useEffect(() => {
    // dispatch to get all poems
    dispatch({
      type: "FETCH_ALL_POEMS",
    });
  }, []);

  return <div>
    <h2>Select a Poem</h2>
  </div>;
}

export default PoemSelectPage;
