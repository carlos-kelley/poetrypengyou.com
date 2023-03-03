import {
  put,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";

function* lookupWord(action) {
  //get word from word router using the word in the word reducer
  try {
    const response = yield axios.get(
      `/api/word/${action.payload}`
    );
    yield put({
      type: "SET_WORD",
      payload: response.data,
    });
  }
  catch (error) {
    console.log(
      "Error with word GET:",
      error
    );
  }
}

function* lookupWordSaga() {
  yield takeLatest("LOOKUP_WORD", lookupWord);
}

export default lookupWordSaga;
