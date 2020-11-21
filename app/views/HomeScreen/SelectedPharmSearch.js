import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {RectButton} from 'react-native-gesture-handler';

import {COLORS} from '../../config';

export default function SelectedPharmSearch({pharm, clearPharm}) {
  return (
    <View style={styles.container}>
      <RectButton onPress={clearPharm}>
        <View accessible style={styles.selectedPharm}>
          <Text style={styles.pharmName}>{pharm.name}</Text>
          <Icon name="close" color="white" size={16} />
        </View>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedPharm: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pharmName: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  clearPharmBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
