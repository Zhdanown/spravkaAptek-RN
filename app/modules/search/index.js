import api from '../../services/api';

const SET_SEARCH_PHARM = 'search/SELECT_PHARM';
export const FETCH_SEARCH_ITEMS = 'search/FETCH_ITEMS';
const IS_LOADING_ITEMS = 'search/IS_LOADING_ITEMS';
const IS_LOADING_NEXT_PAGE = 'search/IS_LOADING_NEXT_PAGE';
const LOAD_NEXT_PAGE = 'search/LOAD_NEXT_PAGE';

export const REQUEST_SUGGESTIONS = 'search/REQUEST_SUGGESTIONS';
const TOGGLE_SUGGESTIONS_LOADER = 'search/TOGGLE_SUGGESTIONS_LOADER';
const SET_SUGGESTIONS = 'search/SET_SUGGESTIONS';

export const LOG_SEARCH_RESULT = 'search/LOG_RESULT';
const REMOVE_HISTORY_ITEM = 'search/REMOVE_HISTORY_ITEM';
const CLEAR_SEARCH_HISTORY = 'search/CLEAR_HISTORY';

const initialState = {
  fetchedItems: [],
  value: '',
  count: null,
  nextPage: '',
  selectedPharm: null,
  isLoading: false,
  isLoadingNextPage: false,
  suggestions: [],
  isLoadingSuggestions: false,
  history: [],
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_PHARM:
      return {
        ...state,
        selectedPharm: action.pharm,
      };

    case FETCH_SEARCH_ITEMS:
      return {
        ...state,
        fetchedItems: action.payload.results,
        count: action.payload.count,
        nextPage: action.payload.next,
        value: action.payload.value,
        isLoading: false,
      };

    case IS_LOADING_ITEMS:
      return {
        ...state,
        isLoading: action.isLoading,
        value: action.value,
      };

    case LOAD_NEXT_PAGE:
      return {
        ...state,
        fetchedItems: state.fetchedItems.concat(action.payload.results),
        nextPage: action.payload.next,
        isLoadingNextPage: false,
      };

    case IS_LOADING_NEXT_PAGE:
      return {
        ...state,
        isLoadingNextPage: action.isLoading,
      };

    case TOGGLE_SUGGESTIONS_LOADER:
      return { ...state, isLoadingSuggestions: action.payload };

    case SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload}

    case LOG_SEARCH_RESULT:
      return {
        ...state,
        history: [action.payload, ...state.history],
      };

    case REMOVE_HISTORY_ITEM:
      return {
        ...state,
        history: state.history.filter(
          item => item.id !== action.itemToRemove.id,
        ),
      };

    case CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        history: [],
      };

    default:
      return state;
  }
}


export function loadSuggestions(value) {
  return { type: REQUEST_SUGGESTIONS, payload: value };
}

export function showSuggestionsLoader(payload) {
  return { type: TOGGLE_SUGGESTIONS_LOADER, payload };
}

export function showSuggestions (payload) {
  return { type: SET_SUGGESTIONS, payload}
}

export const searchResults = value => async (dispatch, getState) => {
  dispatch({ type: IS_LOADING_ITEMS, isLoading: true, value });

  try {
    var response = await api.get(`/search/?format=json&name=${value}`, {
      params: { ...withParams() },
    });
  } catch (error) {
    console.log(error);
  }

  dispatch({ type: FETCH_SEARCH_ITEMS, payload: { ...response.data, value } });

  function withParams() {
    const state = getState();
    const { selectedRegion: region, selectedTown: town, selectedDistrict: district } = state.settings;
    const { selectedOrder } = state.settings;

    let params = {
      page: 1,
      price_list__pharmacy__town: (town && town.id) || '',
      price_list__pharmacy__town__region: (region && region.id) || '',
      price_list__pharmacy__town_district: (district && district.id) || '',
      order_type: selectedOrder.value,
    };

    params = withPharmParams(params);
    params = withRangeParams(params);

    return params;

    function withPharmParams(params) {
      const { selectedPharm: pharm } = state.search;
      return { ...params, ...(pharm && { price_list__pharmacy: pharm.id }) };
    }

    function withRangeParams(params) {
      const { selectedRange: range } = state.settings;
      const { location: userPosition } = state.location;
      const { latitude, longitude } = userPosition || {};

      return {
        ...params,
        ...(range &&
          userPosition && {
            distance: range,
            user_position: `${latitude},${longitude}`,
          }),
      };
    }
  }
};

export const loadNextPage = () => async (dispatch, getState) => {
  const { nextPage: nextPageURL, isLoadingNextPage } = getState().search;
  if (!nextPageURL || isLoadingNextPage) return;

  dispatch({ type: IS_LOADING_NEXT_PAGE, isLoading: true });

  const response = await api.get(nextPageURL);

  dispatch({ type: LOAD_NEXT_PAGE, payload: response.data });
};

export const setSearchPharm = (pharm, navigation) => async (
  dispatch,
  getState,
) => {
  if (navigation) {
    navigation.navigate('Search');
  }

  dispatch({ type: SET_SEARCH_PHARM, pharm });

  // refresh results with selected pharm
  const { value } = getState().search;
  if (value.length > 2) {
    dispatch(searchResults(value));
  }
};

export const clearSearchPharm = () => (dispatch, getState) => {
  dispatch({ type: SET_SEARCH_PHARM, pharm: null });

  // refresh results without selected pharn
  const { value } = getState().search;
  if (value.length > 2) {
    dispatch(searchResults(value));
  }
};

export const logResult = newHistoryItem => ({
  type: LOG_SEARCH_RESULT,
  payload: newHistoryItem,
});

export const removeHistoryItem = itemToRemove => ({
  type: REMOVE_HISTORY_ITEM,
  itemToRemove,
});

export const clearSearchHistory = () => ({ type: CLEAR_SEARCH_HISTORY });
