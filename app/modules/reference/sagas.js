import { takeEvery, put, call } from 'redux-saga/effects';

import { REQUEST_CATEGORIES, FETCH_CATEGORIES } from './index';
import { REQUEST_PRODUCTS, FETCH_PRODUCTS } from './index';

import { showProductsLoader, showCategoriesLoader, setCategoriesError, setProductsError } from './index';
import api from '../../services/api';

export function* watchCategoryRequests() {
  yield takeEvery(REQUEST_CATEGORIES, requestCategories);
}

function* requestCategories() {
  try {
    yield put(showCategoriesLoader(true));
    const payload = yield call(fetchCategories);
    yield put({ type: FETCH_CATEGORIES, payload });
    yield put(showCategoriesLoader(false));
  } catch (err) {
    yield put(setCategoriesError(err));
    yield put(showCategoriesLoader(false));
  }
}

async function fetchCategories() {
  const response = await api.get('/drug-categories/');
  response.data.sort(sortByName);
  return response.data;
}

export function* watchProductsRequests() {
  yield takeEvery(REQUEST_PRODUCTS, requestProducts);
}

function* requestProducts(action) {
  try {
    yield put(showProductsLoader(true));
    const payload = yield call(fetchProducts, action.categoryId);
    yield put({ type: FETCH_PRODUCTS, payload });
  } catch (err) {
    yield put(showProductsLoader(false));
    yield put(setProductsError(err));
  }
}

async function fetchProducts(categoryId) {
  const response = await api.get(`/drug-list/?category=${categoryId}`);
  response.data.results.sort(sortByName);
  return response.data.results;
}

function sortByName (a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
}