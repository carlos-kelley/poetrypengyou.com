import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function LastButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const history = useHistory();
  const poem = useSelector((store) => store.poem);
  // useParam
  const params = useParams();
  const poemNumberParam = params.number;
  const [poemNumber, setPoemNumber] = useState(
    poemNumberParam
  );

  const location = useLocation();
  const dispatch = useDispatch();
  // nextPoemLocal setter
  const [lastPoemLocal, setLastPoemLocal] =
    useState(null);

  const lastPoem = useSelector(
    (store) => store.lastPoem
  );
  //   function pushNext() {
  // dispatch({
  //   type: "FETCH_NEXT_POEM",
  //   payload: poem[0].number,
  // });

  //   axios call to get next poem
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
    fetchLastPoem();
    console.log("lastPoemLocal:", lastPoemLocal);
  }, [params.number]);

  // console.log("poem.number:", poem[0].number);
  //   if nextPoem is not null, push nextPoem

  function pushLast() {
    if (lastPoemLocal !== null) {
      console.log(
        "lastPoem push is:,",
        lastPoemLocal
      );
      history.push(`/poem/${lastPoemLocal}`);
      // if lastPoem is null, log it
    } else {
      console.log("lastPoem is null");
    }
  }

  // history.push(`/poem/${nextPoem}`);
  // //   refresh page
  // window.location.reload();
  // //log poem number
  // console.log(
  //   "poem.number is now:",
  //   poem[0].number
  // );

  //   useEffect(() => {
  //     fetchData();
  //   }, [location.key]);

  return (
    <div>
      {/* if lastpoemlocal exists */}
      {lastPoemLocal !== 0   && (
        <button onClick={pushLast}> Last Poem </button>
      )}

          
    </div>
  );
}

export default LastButton;
