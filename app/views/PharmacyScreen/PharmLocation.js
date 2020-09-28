import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import MIcon from "react-native-vector-icons/MaterialIcons";
import {COLORS} from "../../config";

export default function PharmLocation({address, userLocation, distance, isTrackingLocation}) {
  const iconName = userLocation
    ? distance && 'location-on'
    : isTrackingLocation
      ? 'loop'
      : 'location-off';
  const text = userLocation
    ? distance && `${distance} км`
    : !isTrackingLocation && 'местоположение не определено';

  return (
    <View style={styles.section}>
      <Text style={styles.address}>{address}</Text>
      <View
        style={[
          styles.textWithIcon,
          { marginTop: 10, justifyContent: 'flex-end' },
        ]}>
        <Text style={{ color: COLORS.FADED, fontWeight: 'bold' }}>
          {<MIcon name={iconName} size={15} />}
          {text}
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    shadowOpacity: .5,
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
