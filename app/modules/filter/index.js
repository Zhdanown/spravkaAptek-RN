// Actions
const SET_FILTER = "filter/SET";
const CLEAR_FILTER = "filter/CLEAR";

const initialState = {
  schedule: '24/7',
  district: null,
  range: null,
  showClosedLast: false
};

// Reducer
export default function reducer (state = initialState, action)  {
  switch (action.type) {
    case CLEAR_FILTER:
      return initialState;

    case SET_FILTER:
      return action.payload;
  
    default:
      return state;
  }
};

// Action creators
export function setFilter(newFilter) {
  return { type: SET_FILTER, payload: newFilter };
};
export function clearFilter() {
  return { type: CLEAR_FILTER };
};
