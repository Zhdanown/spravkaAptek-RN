
import { all } from "redux-saga/effects"

import { watchCategoryRequests, watchProductsRequests } from "./reference/sagas"

export default function* rootSaga() {
  yield all([
    watchCategoryRequests(),
    watchProductsRequests()
  ])
}