import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import NoContentFiller from './NoContentFiller';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

// latitude: 51.749103
// longitude: 36.226869

export default ({mapHeight, pharmCoordinates}) => {
  const [latitude, longitude] = pharmCoordinates;

  const [region, setRegion] = React.useState({
    latitude,
    longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const changeRegion = newRegion => {
    console.log(newRegion);
    setRegion(newRegion);
  };

  if (latitude || longitude)
    return (
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        // initialRegion={region}
        onRegionChangeComplete={changeRegion}>
        <Marker coordinate={{latitude, longitude}} />
      </MapView>
    );
  else return <NoContentFiller text="Координаты аптеки не доступны" />;
};
