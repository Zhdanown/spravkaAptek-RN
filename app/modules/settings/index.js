import api from '../../services/api';
import { loadPharmacies } from '../pharmacies';
import { searchResults } from '../search';

const LOAD_REGIONS = 'settings/LOAD_REGIONS';
const LOAD_TOWNS = 'settings/LOAD_DISTRICTS';
const APPLY_SETTINGS = 'settings/SET';

const orderOptions = [
  { id: 1, name: 'По дате (сначала новые)', value: '-add_date' },
  { id: 3, name: 'По цене (сначала дешёвые)', value: 'price' },
  { id: 4, name: 'По цене (сначала дорогие)', value: '-price' },
];

const defaultTown = { id: '', name: 'Не выбрано' };

const initialState = {
  regions: [],
  selectedRegion: null,
  towns: [defaultTown],
  selectedTown: defaultTown,
  orderOptions,
  selectedOrder: orderOptions[0],
  selectedRange: 0, // search radius (do not use radius by default)
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REGIONS:
      return {
        ...state,
        regions: action.regions,
      };

    case LOAD_TOWNS:
      return {
        ...state,
        towns: action.towns,
        // mark region for which the towns has been loaded
        regions: state.regions.map(region => {
          if (region.id === action.regionId) {
            region.townsLoaded = true;
            return region;
          }
          return region;
        }),
      };

    case APPLY_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export const applySettings = newSettings => async (dispatch, getState) => {
  dispatch({ type: APPLY_SETTINGS, payload: newSettings });

  // refresh search results without selected pharm
  const { value } = getState().search;
  if (value.length > 2) {
    dispatch(searchResults(value));
  }
  dispatch(loadPharmacies())
};

export const loadRegions = () => async dispatch => {
  try {
    var response = await api.get('/regions');
  } catch (error) {}

  dispatch({ type: LOAD_REGIONS, regions: response.data });
};

export const loadTowns = regionId => async (dispatch, getState) => {
  try {
    var response = await api.get(`/region_towns/?region=${regionId}`);
  } catch (error) {}

  // get already added districts
  let { towns } = getState().settings;
  // and add to them fetched ones
  response.data.forEach(town => {
    if (!towns.find(x => x.id === town.id)) towns.push(town);
  });

  dispatch({
    type: LOAD_TOWNS,
    towns,
    regionId,
  });
};


export const getRegionAndTown = (state) => {
  const {selectedRegion: region, selectedTown: town} = state.settings
  return {region, town}
}