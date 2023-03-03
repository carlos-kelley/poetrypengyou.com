import {
  put,
  takeLatest,
} from "redux-saga/effects";

function* lookupWord(action) {
  //get word from word router using the word in the word reducer
  try {
    const config = {
      url: `https://evening-fortress-34828.herokuapp.com/https://poetrypengyou.com/api/word/${action.payload}`,
      // headers: {
      // },
      params: {
        size: "XL",
      },
    };

    const response = yield CapacitorHttp.get(
      config
    );
    console.log(
      "word response.data:",
      response.data
    );
    yield put({
      type: "SET_WORD",
      payload: response.data,
    });
  } catch (error) {
    console.log("error in lookupWord:", error);
  }
}

function* lookupWordSaga() {
  yield takeLatest("LOOKUP_WORD", lookupWord);
}

export default lookupWordSaga;
