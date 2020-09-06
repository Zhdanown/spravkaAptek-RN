import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../config';

export default function ListItem({
  item,
  onOpen,
  renderTitle,
  renderThumbnail,
  textAlign = 'left',
}) {
  return (
    <TouchableOpacity onPress={onOpen}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}>
        {renderThumbnail && renderThumbnail()}
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: 'bold',
            paddingVertical: 15,
            color: COLORS.PRIMARY,
            textAlign: textAlign,
          }}>
          {renderTitle ? renderTitle() : item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
