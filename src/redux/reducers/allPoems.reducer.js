const allPoemsReducer = (
  state = null,
  action
) => {
  switch (action.type) {
    case "SET_ALL_POEMS":
      return action.payload;
    case "UNSET_ALL_POEMS":
      return null;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default allPoemsReducer;
