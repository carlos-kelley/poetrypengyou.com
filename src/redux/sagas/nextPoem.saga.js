import axios from "axios";
import {
  put,
  takeLatest,
} from "redux-saga/effects";

function* fetchNextPoem(action) {
  //get poem from the poem router
  try {
    const response = yield axios.get(
      `/api/nextpoem/${action.payload}`
    );
    console.log(
      "next poem response.data:",
      response.data
    );
    yield put({
      type: "SET_NEXT_POEM",
      payload: response.data,
    });
  } catch (error) {
    console.log(
      "Error with next poem GET:",
      error
    );
  }
}
function* fetchNextPoemSaga() {
  yield takeLatest(
    "FETCH_NEXT_POEM",
    fetchNextPoem
  );
}

export default fetchNextPoemSaga;
