import { Linking, Alert } from 'react-native';

export const getRoute = coordinates => {
  if (!coordinates) Alert.alert('Неверные координаты');
  const { latitude, longitude } = coordinates;
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${latitude},${longitude}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Ошибка','Не удалось открыть ссылку');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.log(err));
};
