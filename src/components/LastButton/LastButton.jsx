import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as LastButtonSVG } from "./navigate_before.svg";
import "./LastButton.css";
import { CapacitorHttp } from "@capacitor/core";

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
  async function fetchLastPoem() {
    console.log(
      "In fetchLastPoem, param number is:",
      Number(poemNumber)
    );
    const config = {
      url: `https://evening-fortress-34828.herokuapp.com/https://poetrypengyou.com/api/lastpoem/${params.number}`,
      params: {
        size: "XL",
      },
    };
    const response = await CapacitorHttp.get(
      config
    );
    console.log(
      "Last poem will be",
      response.data[0].max
    );
    // set the hook to the last poem
    setLastPoemLocal(
      Number(response.data[0].max)
    );
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
        <LastButtonSVG
          className="lastButton"
          onClick={pushLast}
        />
      )}
    </div>
  );
}

export default LastButton;
