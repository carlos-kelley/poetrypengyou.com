import {
  put,
  takeLatest,
} from "redux-saga/effects";
import { CapacitorHttp } from "@capacitor/core";

function* fetchAllPoems() {
  //get poem from the poem router
  try {
    const config = {
      url: "https://evening-fortress-34828.herokuapp.com/https://poetrypengyou.com/api/allpoems",
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
      "allPoems response.data:",
      response.data
    );
    yield put({
      type: "SET_ALL_POEMS",
      payload: response.data,
    });
  } catch (error) {
    console.log(
      "Error with allPoems GET:",
      error
    );
  }
}

function* fetchAllPoemsSaga() {
  yield takeLatest(
    "FETCH_ALL_POEMS",
    fetchAllPoems
  );
}

export default fetchAllPoemsSaga;
