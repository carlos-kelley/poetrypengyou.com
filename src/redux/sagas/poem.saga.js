import {
  put,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";

function* fetchPoem(action) {
  //get poem from the poem router
  try {
    const response = yield axios.get(
      `/api/poem/${action.payload}`
    );
    console.log(
      "poem response.data:",
      response.data
    );
    yield put({
      type: "SET_POEM",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with poem GET:", error);
  }
}

function* fetchPoemSaga() {
  yield takeLatest("FETCH_POEM", fetchPoem);
}

export default fetchPoemSaga;
