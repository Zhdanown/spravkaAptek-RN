import api from '../../services/api';

const SET_SEARCH_PHARM = 'search/SELECT_PHARM';
const FETCH_SEARCH_ITEMS = 'search/FETCH_ITEMS';
const IS_LOADING_ITEMS = 'search/IS_LOADING_ITEMS';
const IS_LOADING_NEXT_PAGE = 'search/IS_LOADING_NEXT_PAGE';
const LOAD_NEXT_PAGE = 'search/LOAD_NEXT_PAGE';
const MULTI_SEARCH = 'search/MULTI_SEARCH';
const START_MULTI_SEARCHING = 'search/START_MULTI_SEARCHING';

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
  // history: TODO
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

    default:
      return state;
  }
}

// Action craeators
export const multiSearch = value => async (dispatch, getState) => {
  dispatch({type: START_MULTI_SEARCHING});

  if (value.length > 2) {
    var response = await api.get(
      `/multi-search/?format=json&name=${value}&region=1`,
    );
    dispatch({type: MULTI_SEARCH, results: response.data.slice(0, 7)});
  } else if (!value) {
    dispatch({type: MULTI_SEARCH, results: []});
  }
};

export const searchResults = value => async (dispatch, getState) => {
  // GET params
  const {selectedPharm} = getState().search;
  const pharmId = (selectedPharm && selectedPharm.id) || '';

  dispatch({type: IS_LOADING_ITEMS, isLoading: true});
  const response = await api.get(`/search/?format=json&name=${value}`, {
    params: {
      order_type: '-add_date',
      page: 1,
      price_list__pharmacy__town__region: 1,
      price_list__pharmacy: pharmId,
    },
  });

  dispatch({type: FETCH_SEARCH_ITEMS, payload: {...response.data, value}});
};

export const loadNextPage = () => async (dispatch, getState) => {
  const {nextPage: nextPageURL, isLoadingNextPage} = getState().search;
  if (!nextPageURL || isLoadingNextPage) return;

  dispatch({type: IS_LOADING_NEXT_PAGE, isLoading: true});

  const response = await api.get(nextPageURL);

  dispatch({type: LOAD_NEXT_PAGE, payload: response.data});
};

export const setSearchPharm = (pharm, navigation) => async (
  dispatch,
  getState,
) => {
  if (navigation) {
    navigation.navigate('Search');
  }

  dispatch({type: SET_SEARCH_PHARM, pharm});

  // refresh results with selected pharm
  const {value} = getState().search;
  if (value.length > 2) {
    dispatch(searchResults(value));
  }
};

export const clearSearchPharm = () => (dispatch, getState) => {
  dispatch({type: SET_SEARCH_PHARM, pharm: null});

  // refresh results without selected pharn
  const {value} = getState().search;
  if (value.length > 2) {
    dispatch(searchResults(value));
  }
};
