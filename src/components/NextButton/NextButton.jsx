import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useHistory,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReactComponent as NextButtonSVG } from "./navigate_next.svg";
import "./NextButton.css"

// This is the NextButton component. It is a button that takes the user to the next poem.
function NextButton(props) {

  const history = useHistory();
  const params = useParams();
  const poemNumberParam = params.number;
  const [poemNumber, setPoemNumber] = useState(
    poemNumberParam
  );

  // nextPoemLocal setter
  const [nextPoemLocal, setNextPoemLocal] =
    useState(null);

  //   axios call to get next poem
  function fetchNextPoem() {
    console.log(
      "In fetchNextPoem, param number is:",
      Number(poemNumber)
    );
    axios({
      method: "GET",
      url: `/api/nextpoem/${params.number}`,
    })
      .then((response) => {
        console.log(
          "nextpoem response.data:",
          response.data
        );
        console.log(
          "Next poem will be",
          response.data[0].min
        );
        // set the hook to the next poem
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
  }

  useEffect(() => {
    console.log(
      "in useEffect, poemNumber:",
      params.number
    );
    fetchNextPoem();
    console.log("nextPoemLocal:", nextPoemLocal);
  }, [params.number]);


  function pushNext() {
    if (nextPoemLocal !== null) {
      console.log(
        "nextPoem push is:,",
        nextPoemLocal
      );
      history.push(`/poem/${nextPoemLocal}`);
      // if nextPoem is null, log it
    } else {
      console.log("nextPoem is null");
    }
  }


  return (
    <div>

      {nextPoemLocal !== 0 && (
        <NextButtonSVG className = "nextButton" onClick={pushNext} />
      )}
    </div>
  );
}

export default NextButton;
