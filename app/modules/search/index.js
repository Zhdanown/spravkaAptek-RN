import api from '../../services/api';

const SET_SEARCH_PHARM = 'search/SELECT_PHARM';
export const FETCH_SEARCH_ITEMS = 'search/FETCH_ITEMS';
const IS_LOADING_ITEMS = 'search/IS_LOADING_ITEMS';
const IS_LOADING_NEXT_PAGE = 'search/IS_LOADING_NEXT_PAGE';
const LOAD_NEXT_PAGE = 'search/LOAD_NEXT_PAGE';
const MULTI_SEARCH = 'search/MULTI_SEARCH';
const START_MULTI_SEARCHING = 'search/START_MULTI_SEARCHING';
export const LOG_SEARCH_RESULT = 'search/LOG_RESULT';
const REMOVE_HISTORY_ITEM = 'search/REMOVE_HISTORY_ITEM';
const CLEAR_SEARCH_HISTORY = 'search/CLEAR_HISTORY';

const initialState = {
  fetchedItems: [],
  value: '', // searched value
  count: null, // coune of found values
  nextPage: '', // next page url
  selectedPharm: null,
  isLoading: false,
  isLoadingNextPage: false,
  multiSearchItems: [],
  multiSearchValue: '',
  isMultiSearching: false,
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

    case MULTI_SEARCH:
      return {
        ...state,
        multiSearchItems: action.results,
        isMultiSearching: false,
      };

    case START_MULTI_SEARCHING:
      return {
        ...state,
        isMultiSearching: true,
      };

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

// Action craeators
export const multiSearch = value => async (dispatch, getState) => {
  dispatch({ type: START_MULTI_SEARCHING });

  if (value.length > 2) {
    var response = await api.get(
      `/multi-search/?format=json&name=${value}&region=1`,
    );
    dispatch({ type: MULTI_SEARCH, results: response.data.slice(0, 7) });
  } else if (!value) {
    dispatch({ type: MULTI_SEARCH, results: [] });
  }
};

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
    const { selectedRegion: region, selectedTown: town } = state.settings;
    const { selectedOrder } = state.settings;

    let params = {
      page: 1,
      price_list__pharmacy__town: (town && town.id) || '',
      price_list__pharmacy__town__region: (region && region.id) || '',
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
