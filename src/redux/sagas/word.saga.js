import axios from "axios";
import {
  put,
  takeLatest,
} from "redux-saga/effects";

// function* fetchPoem(action) {
//   let poem = action.payload;
//   console.log("in fetchPoem:", poem);
//   try {
//     const poem = yield axios.get(
//       `/api/poem/${poem}`
//     );
//     console.log("get poem:", response.data);
//     yield put({
//       type: "SET_POEM",
//       payload: response.data,
//     });
//   } catch (error) {
//     console.log("Error with poem GET:", error);
//   }
// }

function* lookupWord(action) {
  //get poem from the poem router
  try {
    const word = yield axios.get(`/api/word/`);
    console.log("get word:", word.data);
    yield put({
      type: "SET_WORD",
      payload: poem.data,
    });
  } catch (error) {
    console.log("Error with word GET:", error);
  }
}

function* lookupWordSaga() {
  yield takeLatest("LOOKUP_WORD", lookupWord);
}

export default lookupWordSaga;
