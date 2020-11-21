import {FETCH_SEARCH_ITEMS, LOG_SEARCH_RESULT, logResult} from '../search'


export default function logSearchHistory({dispatch}) {
  return next => action => {
    // if (action.type === LOG_SEARCH_RESULT) {
    //   console.log('logged in history: ', action.payload);
    // }

    if (action.type === FETCH_SEARCH_ITEMS && action.payload.count) {
      
      const newHistoryItem = {
        id: Math.random(),
        value: action.payload.value,
        count: action.payload.count,
        date: new Date()
      }
      dispatch(logResult(newHistoryItem))
    }

    return next(action);
  }
  
}