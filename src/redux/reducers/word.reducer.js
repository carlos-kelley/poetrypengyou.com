const wordReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_WORD":
      return action.payload;
    case "UNSET_WORD":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default wordReducer;
