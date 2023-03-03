import { combineReducers } from "redux";
import poem from "./poem.reducer";
import word from "./word.reducer";
import allPoems from "./allPoems.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  poem, // will have poem data
  word, // will have word data
  allPoems, // will have all poems data
});

export default rootReducer;
