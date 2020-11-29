import api from '../../services/api';
import { loadPharmacies } from '../pharmacies';
import { searchResults } from '../search';

const LOAD_REGIONS = 'settings/LOAD_REGIONS';
const LOAD_TOWNS = 'settings/LOAD_TOWNS';
const LOAD_DISTRICTS = 'settings/LOAD_DISTRICTS';
const APPLY_SETTINGS = 'settings/SET';

const orderOptions = [
  { id: 1, name: 'По дате (сначала новые)', value: '-add_date' },
  { id: 3, name: 'По цене (сначала дешёвые)', value: 'price' },
  { id: 4, name: 'По цене (сначала дорогие)', value: '-price' },
];

const defaultNotSelected = { id: '', name: 'Не выбрано' };

const initialState = {
  regions: [],
  selectedRegion: null,
  towns: [defaultNotSelected],
  selectedTown: defaultNotSelected,
  districts: [defaultNotSelected],
  selectedDistrict: defaultNotSelected,
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

    case LOAD_DISTRICTS:
      return {
        ...state,
        districts: action.districts,
        towns: state.towns.map(town => {
          if (town.id === action.townId) {
            town.districtsLoaded = true;
            return town;
          }
          return town;
        })
      }

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
  dispatch(loadPharmacies());
};

export const loadRegions = () => async dispatch => {
  try {
    var response = await api.get('/regions');
    dispatch({ type: LOAD_REGIONS, regions: response.data });
  } catch (error) {}
  
};

export const loadTowns = regionId => async (dispatch, getState) => {
  try {
    var response = await api.get(`/region_towns/?region=${regionId}`);
  } catch (error) {}

  // get already added towns
  let { towns } = getState().settings;
  // and add to them fetched ones
  response.data.forEach(town => {
    if (!towns.find(x => x.id === town.id)) {
      towns.push(town);
    }
  });

  dispatch({
    type: LOAD_TOWNS,
    towns,
    regionId,
  });
};

export const loadDistricts = townId => async (dispatch, getState) => {
  try {
    var response = await api.get(`/town-districts-list/?town=${townId}`);
  } catch (error) {
    console.log(error)
  }
  // get already added districts
  let { districts } = getState().settings;
  // and add to them fetched ones
  response.data.forEach(district => {
    if (!districts.find(x => x.id === district.id)) {
      districts.push(district) 
    }
  });

  dispatch({
    type: LOAD_DISTRICTS,
    districts,
    townId,
  });
};

export const getRegionTownDistrict = state => {
  const { selectedRegion: region, selectedTown: town, selectedDistrict: district } = state.settings;
  return { region, town, district };
};
