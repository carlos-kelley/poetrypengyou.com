const characterReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case "SET_SIMPLIFIED":
  //       return "simplified";
  //     case "SET_TRADITIONAL":
  //       return "traditional";
  //     // default is simplified
  //     default:
  //       return "simplified";
  //   }
  // };

  // if SET_SIMPLIFIED, return simplified
  // if SET_TRADITIONAL, return traditional
  // if neither, return simplified
  if (action.type === "SET_SIMPLIFIED") {
    return "simplified";
  } else if (action.type === "SET_TRADITIONAL") {
    return "traditional";
  } else {
    return "simplified";
  }
};

// user will be on the redux state at:
// state.user
export default characterReducer;
