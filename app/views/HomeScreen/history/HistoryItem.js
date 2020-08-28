import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import IconButton from "../../../components/IconButton";
import { COLORS } from '../../../config';
import { dateToString } from "../../../utils";

export default function HistoryItem({ item, onPress, onDelete, deletable }) {

  const date = dateToString(item.date)

  return (
    <View style={{
      marginVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <TouchableOpacity onPress={() => onPress(item.value)} style={{ flex: 1 }}>

        <View style={{
          flex: 1,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 8,
        }}>
          <Text style={{
            color: COLORS.PRIMARY,
            fontSize: 16,
          }}>{item.value} ({item.count})</Text>
          <Text style={{ color: COLORS.FADED, marginTop: 5 }}>{date}</Text>
        </View>
      </TouchableOpacity>

      {deletable && (
        <IconButton onPress={() => onDelete(item)} style={{ padding: 10, marginLeft: 10 }}>
          <Icon name="delete-outline" size={30} color="firebrick" />
        </IconButton>

      )}
    </View>
  );

}

HistoryItem.defaultProps = {
  deletable: true,
}

