import { takeLatest, put, call } from "redux-saga/effects";

import { REQUEST_SUGGESTIONS } from "./index";

import { showSuggestions, showSuggestionsLoader as showLoader } from "./index"
import api from "../../services/api";

export function* watchSuggestionsRequests(){
  yield takeLatest(REQUEST_SUGGESTIONS, requestSuggestions)
}

function* requestSuggestions(action) {
  if (action.payload.length < 3) {
    yield put(showSuggestions([]));
    yield put(showLoader(false))
    return;
  }

  try {
    yield put(showLoader(true));
    const payload = yield call(fetchSuggestions, action.payload);
    yield put(showSuggestions(payload));
    yield put(showLoader(false))
  } catch(err) {
    yield put(showLoader(false))
  }
}

async function fetchSuggestions(value) {
  // TODO region
  const response = await api.get(
    `/multi-search/?format=json&name=${value}&region=1`,
  );
  return response.data.slice(0, 7);
}
