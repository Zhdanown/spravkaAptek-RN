import { put, takeEvery, call, select } from 'redux-saga/effects';

import { REQUEST_PHARMACIES, FETCH_PHARMACIES } from './index';

import { showLoader, setError } from './index';
import { getRegionTownDistrict } from '../settings';
import api from '../../services/api';

export function* watchPharmaciesRequest() {
  yield takeEvery(REQUEST_PHARMACIES, requestPharmacies);
}

function* requestPharmacies() {
  try {
    yield put(showLoader(true));
    let settings = yield select(getRegionTownDistrict);
    const payload = yield call(fetchPharmacies, settings);
    yield put({ type: FETCH_PHARMACIES, payload });
    yield put(showLoader(false));
  } catch (err) {
    yield put(setError(err));
    yield put(showLoader(false));
  }
}

async function fetchPharmacies({ region, town, district }) {
  console.log(district)
  const response = await api.get('/pharmacies/', {
    params: { ...getParams() },
  });
  return response.data;

  function getParams() {
    return {
      format: 'json',
      page: 1,
      order_type: 'order_number',
      town__region: (region && region.id) || '',
      town: (town && town.id) || '',
      town_district: (district && district.id) || '',
    };
  }
}
