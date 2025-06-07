import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as LastButtonSVG } from "./navigate_before.svg";
import "./LastButton.css";
import { fetchPoem } from "../../services/api";

// A button that takes the user to the last poem.
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
      history.push(`/poem/${lastPoemLocal}`);
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
