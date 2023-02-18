const lastPoemReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_LAST_POEM":
      return action.payload;
    case "UNSET_LAST_POEM":
      return null;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default lastPoemReducer;
