import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import NoContentFiller from './NoContentFiller';
import IconButton from './IconButton';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../config';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ({mapHeight, pharmCoordinates, userLocation}) => {
  const DEFAULT_ZOOM = 14
  const _map = React.useRef();
  // const currentZoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);

  const [region, setRegion] = React.useState({
    ...pharmCoordinates,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const changeRegion = newRegion => {
    setRegion(newRegion);
  };

  const fitWithUserLocation = () => {
    if (_map.current) {
      _map.current.fitToCoordinates([pharmCoordinates, userLocation], {
        // animated: false,
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      });
    }
  };

  const fitToPharm = () => {
    _map.current.animateCamera(
      {
        center: pharmCoordinates,
        zoom: DEFAULT_ZOOM,
      },
      {duration: 400},
    );
  };

  const renderMapControls = () => (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        right: 0,
        left: 0,
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <ButtonGroup>
        <MapButton iconName="my-location" onPress={fitWithUserLocation} />
        <MapButton iconName="add-location" onPress={fitToPharm} />
      </ButtonGroup>
    </View>
  );

  if (pharmCoordinates)
    return (
      <>
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styles.map, {flex: 1}]}
          region={region}
          minZoomLevel={2}
          maxZoomLevel={18}
          onRegionChangeComplete={changeRegion}>
          <Marker coordinate={pharmCoordinates} />
          {userLocation && <Marker coordinate={userLocation} />}
        </MapView>
        {renderMapControls()}
      </>
    );
  else return <NoContentFiller text="Координаты аптеки не доступны" />;
};

function ButtonGroup(props) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.PRIMARY,
        flexDirection: 'row',
        width: props.children.length * 50,
        marginHorizontal: 5,
      }}>
      {props.children}
    </View>
  );
}

function MapButton({onPress, iconName}) {
  return (
    <IconButton
      style={{
        alignItems: 'center',
        height: 50,
        width: 50,
        justifyContent: 'center',
      }}
      onPress={onPress}>
      <MIcon name={iconName} size={36} color={COLORS.PRIMARY} />
    </IconButton>
  );
}
