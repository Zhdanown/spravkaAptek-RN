import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import IconButton from '../../../components/IconButton';
import { COLORS } from '../../../config';
import { dateToString } from '../../../utils';

export default function HistoryItem({ item, onPress, onDelete }) {
  const date = dateToString(item.date, 'dd.mmm.yyyy hh:mm');

  return (
    <TouchableOpacity onPress={() => onPress(item.value)} style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          marginVertical: 5,
          padding: 10,
          borderRadius: 8,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              color: COLORS.PRIMARY,
              fontSize: 16,
            }}>
            {item.value} ({item.count})
          </Text>
          <Text style={{ color: COLORS.FADED, marginTop: 5 }}>{date}</Text>
        </View>

        <IconButton
          onPress={() => onDelete(item)}
          style={{ padding: 5, marginLeft: 10 }}>
          <Icon name="close" size={30} color={COLORS.DANGER} />
        </IconButton>
      </View>
    </TouchableOpacity>
  );
}
