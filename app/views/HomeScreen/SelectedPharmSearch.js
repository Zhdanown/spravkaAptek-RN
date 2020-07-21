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

      {/*           
          <Text style={styles.selectedPharmName} numberOfLines={1} >Социалочка asldfjlsdkjf</Text>

          <IconButton
            onPress={() => {}}
            >
            <Icon name="close" size={20} />
          </IconButton> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  selectedPharm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    // borderColor: COLORS.PRIMARY,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
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
