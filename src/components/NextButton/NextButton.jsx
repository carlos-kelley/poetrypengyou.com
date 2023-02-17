import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

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
  // nextPoemLocal setter
  const [nextPoemLocal, setNextPoemLocal] =
    useState(null);

  const nextPoem = useSelector(
    (store) => store.nextPoem
  );
  function pushNext() {
    // dispatch({
    //   type: "FETCH_NEXT_POEM",
    //   payload: poem[0].number,
    // });

    //   axios call to get next poem
    axios({
      method: "GET",
      url: `/api/nextpoem/${poem[0].number}`,
    })
      .then((response) => {
        console.log(
          "nextpoem response.data:",
          response.data
        );
        console.log(response.data[0].min);
        setNextPoemLocal(
          Number(response.data[0].min)
        );

        console.log(
          "nextPoemLocal:",
          nextPoemLocal
        );
      })
      .catch((error) => {
        console.log("error in nextpoem:", error);
      });

    // console.log("poem.number:", poem[0].number);
    //   if nextPoem is not null, push nextPoem
    if (nextPoemLocal !== null) {
      console.log("nextPoem is:,", nextPoemLocal);
      history.push(`/poem/${nextPoemLocal}`);
      // if nextPoem is null, log it
    } else {
      console.log("nextPoem is null");
    }

    // history.push(`/poem/${nextPoem}`);
    // //   refresh page
    // window.location.reload();
    // //log poem number
    // console.log(
    //   "poem.number is now:",
    //   poem[0].number
    // );
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
