import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconButton = ({
  children,
  onPress = () => {},
  disabled = false,
  style,
}) => {
  const _icon = children ? children : <Icon name="home" size={30} />;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={style}>{_icon}</View>
    </TouchableOpacity>
  );
};

export default IconButton;
