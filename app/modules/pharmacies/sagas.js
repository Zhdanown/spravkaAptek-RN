import { put, takeEvery, call } from 'redux-saga/effects';

import { REQUEST_PHARMACIES, FETCH_PHARMACIES } from './index';

import { showLoader, setError } from './index';
import api from '../../services/api';

export function* watchPharmaciesRequest() {
  yield takeEvery(REQUEST_PHARMACIES, requestPharmacies);
}

function* requestPharmacies() {
  try {
    yield put(showLoader(true));
    const payload = yield call(fetchPharmacies);
    yield put({ type: FETCH_PHARMACIES, payload });
    yield put(showLoader(false));
  } catch (err) {
    yield put(setError(err));
    yield put(showLoader(false));
  }
}

async function fetchPharmacies() {
  
  const response = await api.get('/pharmacies/?format=json&page=1', {
    params: {
      order_type: 'order_number',
      town__region: 1,
      // town_district: 15
    },
  });
  return response.data;
}
