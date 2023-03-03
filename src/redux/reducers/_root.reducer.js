import { combineReducers } from "redux";
import poem from "./poem.reducer";
import word from "./word.reducer";
import allPoems from "./allPoems.reducer";


// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  poem, // will have poem data
  word, // will have word data
  allPoems, // will have all poems data
});

export default rootReducer;
