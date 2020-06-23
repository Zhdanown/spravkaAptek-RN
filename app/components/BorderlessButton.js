import React from 'react'
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {COLORTHEME} from '../config'

export default function BorderlessButton({text = "text", onPress = () => {} }) {
  return (
    <RectButton onPress={onPress}>
      <View accessible style={{padding: 10}}>
        <Text style={{color: COLORTHEME.PRIMARY, fontSize: 16}}>{text}</Text>
      </View>
    </RectButton>
  )
}
