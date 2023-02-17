const nextPoemReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NEXT_POEM":
      return action.payload;
    case "UNSET_NEXT_POEM":
      return null;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default nextPoemReducer;
