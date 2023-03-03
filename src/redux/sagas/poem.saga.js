import {
  put,
  takeLatest,
} from "redux-saga/effects";

function* fetchPoem(action) {
  //get poem from the poem router
  try {
    const response = yield axios.get(
      `https://sdnii-cors-anywhere.herokuapp.com/https://poetrypengyou.com/api/poem/${action.payload}`
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
