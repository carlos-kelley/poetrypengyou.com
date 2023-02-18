import axios from "axios";
import {
  put,
  takeLatest,
} from "redux-saga/effects";

function* fetchLastPoem(action) {
  //get poem from the poem router
  try {
    const response = yield axios.get(
      `/api/lastpoem/${action.payload}`
    );
    console.log(
      "last poem response.data:",
      response.data
    );
    yield put({
      type: "SET_LAST_POEM",
      payload: response.data,
    });
  } catch (error) {
    console.log(
      "Error with last poem GET:",
      error
    );
  }
}
function* fetchLastPoemSaga() {
  yield takeLatest(
    "FETCH_LAST_POEM",
    fetchLastPoem
  );
}

export default fetchLastPoemSaga;
