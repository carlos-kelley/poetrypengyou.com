import axios from "axios";
import {
  put,
  takeLatest,
} from "redux-saga/effects";

function* fetchAllPoems(action) {
  //get poem from the poem router
  try {
    const response = yield axios.get(
      `/api/poem/`
    );
    console.log(
      "poem response.data:",
      response.data
    );
    yield put({
      type: "SET_ALL_POEMS",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with poem GET:", error);
  }
}

function* fetchAllPoemsSaga() {
  yield takeLatest("FETCH_ALL_POEMS", fetchAllPoems);
}

export default fetchAllPoemsSaga;
