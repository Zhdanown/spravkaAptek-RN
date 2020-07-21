import React from 'react';
import { View, Text } from 'react-native';
import {pharmacies} from "../../assets/data";


const PharmaciesScreen = () => {
  console.log(pharmacies)
  return (
    <View>
      <Text>Аптеки</Text>
    </View>
  )
}

export default PharmaciesScreen;
