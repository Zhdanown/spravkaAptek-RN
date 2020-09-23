
import { all } from "redux-saga/effects";

import { watchCategoryRequests, watchProductsRequests } from "./reference/sagas";
import { watchSuggestionsRequests } from "./search/sagas"
import { watchPharmaciesRequest } from "./pharmacies/sagas";

export default function* rootSaga() {
  yield all([
    watchCategoryRequests(),
    watchProductsRequests(),
    watchSuggestionsRequests(),
    watchPharmaciesRequest()
  ])
}