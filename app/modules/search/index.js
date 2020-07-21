import api from "../../services/api";

import {v4 as uuidv4} from "uuid";

const SET_SEARCH_PHARM = 'search/SELECT_PHARM';
const FETCH_SEARCH_ITEMS = 'search/FETCH_ITEMS';
const IS_LOADING_ITEMS = 'search/IS_LOADING_ITEMS';
const IS_LOADING_NEXT_PAGE = 'search/IS_LOADING_NEXT_PAGE';
const LOAD_NEXT_PAGE = 'search/LOAD_NEXT_PAGE';

const initialState = {
  fetchedItems: [],
  value: '', // searched value
  count: null, // coune of found values
  nextPage: '', // next page url
  selectedPharm: null, 
  isLoading: false,
  isLoadingNextPage: false
  // history: TODO
};

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_PHARM:
      return {
        ...state,
        selectedPharm: action.pharm
      }
    
    case FETCH_SEARCH_ITEMS:
      return {
        ...state,
        fetchedItems: action.payload.results,
        count: action.payload.count,
        nextPage: action.payload.next,
        value: action.payload.value,
        isLoading: false
      }

    case IS_LOADING_ITEMS:
      return {
        ...state,
        isLoading: action.isLoading
      }
      
    case LOAD_NEXT_PAGE:
      return {
        ...state,
        fetchedItems: state.fetchedItems.concat(action.payload.results),
        nextPage: action.payload.next,
        isLoadingNextPage: false
      }
      
    case IS_LOADING_NEXT_PAGE:
      return {
        ...state,
        isLoadingNextPage: action.isLoading
      }
    
    default:
      return state;
  }
}

// Action craeators
export const searchResults = value => async (dispatch, getState) => {
  // GET params
  const {selectedPharm} = getState().search;
  const pharmId = selectedPharm && selectedPharm.id || '';
  
  dispatch({ type: IS_LOADING_ITEMS, isLoading: true });
  const response = await api.get(`/search/?format=json&name=${value}`, {
    params: {
      order_type: '-add_date',
      page: 1,
      price_list__pharmacy__town__region: 1,
      price_list__pharmacy: pharmId
    }
  });

  response.data.results = response.data.results.map(x => ({...x, id: uuidv4()}))

  dispatch({type: FETCH_SEARCH_ITEMS, payload: { ...response.data, value} });
}

export const loadNextPage = () => async (dispatch, getState) => {
  const { nextPage: nextPageURL, isLoadingNextPage } = getState().search;
  if (!nextPageURL || isLoadingNextPage ) return;

  dispatch({ type: IS_LOADING_NEXT_PAGE, isLoading: true });

  const response = await api.get(nextPageURL);

  response.data.results = response.data.results.map(x => ({...x, id: uuidv4()}))

  dispatch({ type: LOAD_NEXT_PAGE, payload: response.data })
}

export function setSearchPharm(pharm, navigation) {
  if (navigation) {
    navigation.navigate('Search')
  }
  console.log(pharm)
  return { type: SET_SEARCH_PHARM, pharm}
}

export function clearSearchPharm() {
  return { type: SET_SEARCH_PHARM, pharm: null}
}
