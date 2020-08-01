import {PermissionsAndroid} from "react-native";
import Geolocation from 'react-native-geolocation-service';

const GET_LOCATION = 'location/GET_LOCATION';
const SET_LOCATION = 'location/SET_LOCATION';
const SET_LOCATION_ERROR = 'location/SET_ERROR';

const initialState = {
  location: null,
  locationError: null,
  isTrackingLocation: false,
};

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION: 
      return {
        ...state,
        isTrackingLocation: true
      }

    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
        isTrackingLocation: false,
      }

    case SET_LOCATION_ERROR: 
      return {
        ...state,
        locationError: action.error,
        isTrackingLocation: false,
      }
  
    default:
      return state;
  }
}

// Action creators
export const getLocation = () => async (dispatch, getState) => {

  // get user permission
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Разрешить использование данных о местоположении?",
      message:
        "Эти данные нужны нам для рассчёта расстояния до аптек",
      buttonPositive: "OK",
      buttonNegative: "Нет",
      buttonNeutral: 'Понятно'
    }
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    dispatch({type: GET_LOCATION})

    Geolocation.getCurrentPosition(
      pos => {
        const {latitude, longitude} = pos.coords;
        setTimeout(() => {
          dispatch({type: SET_LOCATION, payload: {latitude: +latitude, longitude: +longitude}});
        }, 10000)

      },
      locationError => {
        dispatch({type: SET_LOCATION_ERROR, error: locationError});
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  } else {
    // permission not granted
    dispatch({type: SET_LOCATION_ERROR, error: {code: 1, message: "Location permission not granted"}});
  }
  
}

export const getLocationPermission = () => async (dispatch, getState) => {

}