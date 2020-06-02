import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

{
  /* Custom button with ripple effect for android */
}
const IconButton = ({children, onPress = () => {}, style }) => {
  
  const _icon = children ? children : <Icon name="home" size={30} />;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style}>{_icon}</View>
    </TouchableOpacity>
  );

  // if (Platform.OS === 'android')
  //   return (
  //     <TouchableNativeFeedback
  //       onPress={onPress}
  //       background={
  //         Platform.Version >= 21
  //           ? TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)', true)
  //           : TouchableNativeFeedback.SelectableBackgroundBorderless()
  //       }
  //       style={{borderRadius: 50}}>
  //       <View>
  //         {_icon}
  //       </View>
  //     </TouchableNativeFeedback>
  //   );
  // else
  //   return (
  //     <TouchableOpacity>
  //       <View>
  //         {_icon}
  //       </View>
  //     </TouchableOpacity>
  //   );
};

export default IconButton;

const styles = StyleSheet.create({});
