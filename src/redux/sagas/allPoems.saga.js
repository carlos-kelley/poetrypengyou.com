import {
  put,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";

function* fetchAllPoems() {
  //get poem from the poem router
  try {
    const response = yield axios.get(
      `/api/allpoems`
    );
    yield put({
      type: "SET_ALL_POEMS",
      payload: response.data,
    });
  } catch (error) {
    console.log(
      "Error with allPoems GET:",
      error
    );
  }
}

function* fetchAllPoemsSaga() {
  yield takeLatest(
    "FETCH_ALL_POEMS",
    fetchAllPoems
  );
}

export default fetchAllPoemsSaga;
