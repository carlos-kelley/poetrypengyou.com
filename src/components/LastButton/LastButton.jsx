import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReactComponent as LastButtonSVG } from "./navigate_before.svg";
import "./LastButton.css";
import { fetchPoem } from "../../services/api";

// This is the LastButton component. It is a button that takes the user to the last poem.
function LastButton(props) {
  const history = useHistory();
  const params = useParams();
  const [lastPoemLocal, setLastPoemLocal] =
    useState(null);

  useEffect(() => {
    fetchPoem(
      "lastpoem",
      params.number,
      setLastPoemLocal
    );
  }, [params.number]);

  function pushLast() {
    if (lastPoemLocal !== null) {
      console.log(
        "LastPoem push is:",
        lastPoemLocal
      );
      history.push(`/poem/${lastPoemLocal}`);
    } else {
      console.log("LastPoem is null");
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
