import {Linking, Alert} from 'react-native';

export const getRoute = (lat, lng) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${lat},${lng}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });

  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('maps is not available');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.log(err));
};
