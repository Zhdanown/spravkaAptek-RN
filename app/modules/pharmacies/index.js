export const REQUEST_PHARMACIES = 'pharmacies/REQUEST_PHARMACIES';
export const FETCH_PHARMACIES = 'pharmacies/FETCH_PHARMACIES';
const SHOW_LOADER = 'pharmacies/SHOW_LOADER';
const SET_ERROR = 'pharmacies/SET_ERROR';

const initialState = {
  pharmacies: [],
  count: null,
  nextPage: '',
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: action.payload };

    case FETCH_PHARMACIES:
      return {
        ...state,
        pharmacies: action.payload.results,
        count: action.payload.count,
        nextPage: action.payload.next,
      };

    case SET_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
}

export function loadPharmacies() {
  return { type: REQUEST_PHARMACIES };
}
export function showLoader(payload) {
  return { type: SHOW_LOADER, payload };
}
export function setError(error) {
  return { type: SET_ERROR, error };
}
