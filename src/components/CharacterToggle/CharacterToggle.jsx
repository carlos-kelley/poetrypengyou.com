import React from "react";
import { useDispatch } from "react-redux";
// import reducers
import { useSelector } from "react-redux";
import { useEffect } from "react";

function CharacterToggle(props) {
  const dispatch = useDispatch();
  const character = useSelector(
    (store) => store.character
  );

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      //   if character is simplified, set to traditional
      onClick={() => {
        character === "simplified"
          ? dispatch({ type: "SET_TRADITIONAL" })
          : dispatch({ type: "SET_SIMPLIFIED" });
        console.log("character:", character);
      }}
    >
          {character === "simplified"
              && "Switch to Traditional"
          }
          {character === "traditional"
              && "Switch to Simplified"
            }
    
    </button>
  );
}

export default CharacterToggle;
