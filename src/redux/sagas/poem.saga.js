import {
  put,
  takeLatest,
} from "redux-saga/effects";

function* fetchPoem(action) {
  //get poem from the poem router
  try {
    const config = {
      url: `https://evening-fortress-34828.herokuapp.com/https://poetrypengyou.com/api/poem/${action.payload}`,
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods":
      //     "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      // },
      params: {
        size: "XL",
      },
    };

    const response = yield CapacitorHttp.get(
      config
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
