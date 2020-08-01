import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import NoContentFiller from './NoContentFiller';
import IconButton from './IconButton';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ({mapHeight, pharmCoordinates, userLocation}) => {
  console.log('userLocation', userLocation);
  console.log('pharmCoordinates', pharmCoordinates);
  const [zoom, setZoom] = React.useState(15);
  const _map = React.useRef();

  React.useEffect(() => {
    if (_map.current) {
      _map.current.animateCamera(
        {
          zoom,
        },
        {duration: 400},
      );
    }
  }, [zoom]);


  const [region, setRegion] = React.useState({
    ...pharmCoordinates,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const changeRegion = newRegion => {
    setRegion(newRegion);
  };

  if (pharmCoordinates)
    return (
      <>
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styles.map, {flex: 1}]}
          region={region}
          // initialRegion={region}
          onRegionChangeComplete={changeRegion}>
          <Marker coordinate={pharmCoordinates} />
          {userLocation && <Marker coordinate={userLocation} />}
        </MapView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 100,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'steelblue',
            width: 50,
          }}>
          <IconButton
            style={{alignItems: 'center', height: 50, justifyContent: 'center'}}
            onPress={() => setZoom(zoom + 1)}>
            <MIcon name="add" size={36} color="steelblue" />
          </IconButton>
          <IconButton
            style={{alignItems: 'center', height: 50, justifyContent: 'center'}}
            onPress={() => setZoom(zoom - 1)}>
            <MIcon name="remove" size={36} color="steelblue" />
          </IconButton>
        </View>
      </>
    );
  else return <NoContentFiller text="Координаты аптеки не доступны" />;
};
