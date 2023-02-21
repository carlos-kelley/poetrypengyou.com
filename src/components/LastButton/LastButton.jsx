import React, { useState } from "react";
import {
  useHistory,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReactComponent as LastButtonSVG } from "./navigate_before.svg";
import "./LastButton.css";

// This is the LastButton component. It is a button that takes the user to the last poem.
function LastButton(props) {
  const history = useHistory();
  const params = useParams();
  const poemNumberParam = params.number;

  const [poemNumber, setPoemNumber] = useState(
    poemNumberParam
  );
  const [lastPoemLocal, setLastPoemLocal] =
    useState(null);

  //   axios call to get last poem
  function fetchLastPoem() {
    console.log(
      "In fetchLastPoem, param number is:",
      Number(poemNumber)
    );
    axios({
      method: "GET",
      url: `/api/lastpoem/${params.number}`,
    })
      .then((response) => {
        console.log(
          "lastpoem response.data:",
          response.data
        );
        console.log(
          "Last poem will be",
          response.data[0].max
        );
        // set the hook to the last poem
        setLastPoemLocal(
          Number(response.data[0].max)
        );

        console.log(
          "lastPoemLocal:",
          lastPoemLocal
        );
      })
      .catch((error) => {
        console.log("error in lastpoem:", error);
      });
  }

  useEffect(() => {
    console.log(
      "in useEffect, poemNumber:",
      params.number
    );
    //   fetch the last poem on page load
    fetchLastPoem();
    console.log("lastPoemLocal:", lastPoemLocal);
  }, [params.number]);

//  push to the last poem on click
  function pushLast() {
    if (lastPoemLocal !== null) {
      console.log(
        "lastPoem push is:,",
        lastPoemLocal
      );
      history.push(`/poem/${lastPoemLocal}`);
    } else {
      console.log("lastPoem is null");
    }
  }

 
  return (
    <div>
      {lastPoemLocal !== 0 && (
        <LastButtonSVG className = "lastButton" onClick={pushLast} />
      )}
    </div>
  );
}

export default LastButton;
