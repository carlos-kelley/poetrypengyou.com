import {
  put,
  takeLatest,
} from "redux-saga/effects";
import { CapacitorHttp } from "@capacitor/core";

function* fetchLastPoem() {
  //get last poem from the poem router
  try {
    const config = {
      url: "https://poetrypengyou.com/api/lastpoem/${action.payload}",
      // headers: {
      // }
      params: {
        size: "XL",
      },
    };

    const response = yield CapacitorHttp.get(
      config
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
