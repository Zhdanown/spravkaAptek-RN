import { Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

const GET_LOCATION = 'location/GET_LOCATION';
const SET_LOCATION = 'location/SET_LOCATION';
const SET_LOCATION_ERROR = 'location/SET_ERROR';

const initialState = {
  location: null,
  locationError: null,
  isTrackingLocation: false,
};

// Reducer
export default function reducer(state = initialState, action) {
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

async function getPermission() {

  let requestableFeature =
    Platform.OS === 'android' && PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION ||
    Platform.OS === 'ios' && PERMISSIONS.IOS.LOCATION_WHEN_IN_USE ||
    null;
  if (!requestableFeature) return { message: 'Недоступно на этом устройстве' };

  const result = await request(requestableFeature);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      throw new Error('Недоступно на этом устройстве');

    case RESULTS.DENIED:
      throw new Error('Отказано в доступе');

    case RESULTS.GRANTED:
      return true;

    case RESULTS.BLOCKED:
      throw new Error ('Отказано в доступе. Необходимо изменить настройки доступа' );
  }
}

// Action creators
export const getLocation = () => async (dispatch, getState) => {

  try {
    var granted = await getPermission();
  } catch (error) {
    // permission not granted
    console.log(error)
    dispatch({ type: SET_LOCATION_ERROR, error});
  }
  
  if (granted) {
    dispatch({ type: GET_LOCATION })

    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos)
        const { latitude, longitude } = pos.coords;
        setTimeout(() => {
          dispatch({ type: SET_LOCATION, payload: { latitude: +latitude, longitude: +longitude } });
        }, 10000)

      },
      locationError => {
        dispatch({ type: SET_LOCATION_ERROR, error: locationError });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
}

export const getLocationPermission = () => async (dispatch, getState) => {

}