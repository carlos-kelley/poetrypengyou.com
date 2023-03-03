import { all } from "redux-saga/effects";
import fetchPoemSaga from "./poem.saga";
import lookupWordSaga from "./word.saga";
import fetchAllPoemsSaga from "./allPoems.saga";



// This is imported in index.js as rootSaga


export default function* rootSaga() {
  yield all([
    fetchPoemSaga(),
    lookupWordSaga(),
    fetchAllPoemsSaga(),
  ]);
}
