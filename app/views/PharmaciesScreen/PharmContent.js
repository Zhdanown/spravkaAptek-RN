import React from "react";
import {View, Text, StyleSheet} from "react-native";

import MIcon from 'react-native-vector-icons/MaterialIcons';

import { COLORS } from '../../config';

export default function PharmContent(props) {
  const { pharmacy, address, isOpenNow } = props;

  const renderLocation = () => {
    const { distance, location, isTrackingLocation } = props;
    const iconName = () => {
      if (location) return 'location-on';
      else if (isTrackingLocation) return 'loop';
      else return 'location-off';
    };
    const text = location ? `${distance} км` : !isTrackingLocation && 'н/д';
    return (
      <Text style={{ color: COLORS.FADED }}>
        {<MIcon name={iconName()} size={15} />}
        {text}
      </Text>
    );
  };

  return (
    <>
      <View style={[styles.justified, { marginBottom: 5 }]}>
        <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
        <Text
          style={
            (styles.isPharmacyOpen,
            { color: isOpenNow ? 'green' : 'firebrick' })
          }>
          {isOpenNow ? 'Открыто' : 'Закрыто'}
        </Text>
      </View>
      <View style={styles.addressDistance}>
        <Text style={styles.itemDistance}>{renderLocation()}</Text>
        <Text style={styles.pharmacyAddress}>{address}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  justified: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  pharmacyName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.FADED,
  },
  pharmacyAddress: {
    color: COLORS.FADED,
    flex: 1,
  },
  addressDistance: {
    flexDirection: 'row',
  },
  itemDistance: {
    color: COLORS.FADED,
    marginRight: 10,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
