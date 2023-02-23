import {
  put,
  takeLatest,
} from "redux-saga/effects";
import { CapacitorHttp } from "@capacitor/core";

function* fetchNextPoem() {
  //get poem from the poem router
  try {
    const config = {
      url: `https://poetrypengyou.com/api/nextpoem/${action.payload}`,
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
