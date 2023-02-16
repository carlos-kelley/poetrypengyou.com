import axios from "axios";
import {
  put,
  takeLatest,
} from "redux-saga/effects";

function* fetchPoem(action) {
  let poem = action.payload;
  console.log("in fetchPoem:", poem);
  try {
    const poem = yield axios.get(
      `/api/poem/${poem}`
    );
    console.log("get poem:", response.data);
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
