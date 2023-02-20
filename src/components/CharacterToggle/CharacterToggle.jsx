// currently unused, character toggle is in the PoemPage component


// import React from "react";
// import { useDispatch } from "react-redux";
// // import reducers
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import "./CharacterToggle.css";

// function CharacterToggle(props) {
//   const dispatch = useDispatch();
//   const character = useSelector(
//     (store) => store.character
//   );

//   return (
//     <button
//       className = "characterButton"
//       //   if character is simplified, set to traditional
//       onClick={() => {
//         character === "simplified"
//           ? dispatch({ type: "SET_TRADITIONAL" })
//           : dispatch({ type: "SET_SIMPLIFIED" });
//         console.log("character:", character);
//       }}
//     >
//           {character === "simplified"
//               && "Switch to Traditional"
//           }
//           {character === "traditional"
//               && "Switch to Simplified"
//             }
    
//     </button>

    
//   );
// }

// export default CharacterToggle;
