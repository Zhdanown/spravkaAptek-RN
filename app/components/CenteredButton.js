import React from 'react';
import { View } from 'react-native';

import BorderlessButton from './BorderlessButton';

export default function CenteredButton({ onPress, title, style }) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
        },
        style,
      ]}>
      <BorderlessButton onPress={onPress} title={title} />
    </View>
  );
}
