import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReactComponent as NextButtonSVG } from "./navigate_next.svg";
import "./NextButton.css";
import { fetchPoem } from "../../services/api";

function NextButton(props) {
  const history = useHistory();
  const params = useParams();
  const [nextPoemLocal, setNextPoemLocal] =
    useState(null);

  useEffect(() => {
    fetchPoem(
      "nextpoem",
      params.number,
      setNextPoemLocal
    );
  }, [params.number]);

  function pushNext() {
    if (nextPoemLocal !== null) {
      console.log(
        "NextPoem push is:",
        nextPoemLocal
      );
      history.push(`/poem/${nextPoemLocal}`);
    } else {
      console.log("NextPoem is null");
    }
  }

  return (
    <div>
      {nextPoemLocal !== 0 && (
        <NextButtonSVG
          className="nextButton"
          onClick={pushNext}
        />
      )}
    </div>
  );
}

export default NextButton;
