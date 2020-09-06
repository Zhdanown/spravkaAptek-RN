import React from 'react';
import {Picker as _Picker, PickerIOS,} from '@react-native-community/picker';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from "../config";

const Picker = ({options = [], onChange = () => {}}) => {
  const [value, setValue] = React.useState('java');

  React.useEffect(() => {
    onChange(value);
  }, [value])

  return (
    
    // PickerIOS for iOS
    <_Picker
      selectedValue={value}
      // style={{height: 30, width: 200, color: COLORS.PRIMARY}}
      onValueChange={(itemValue, itemIndex) => setValue(itemValue)}>
      {options.map(option => (
        <_Picker.Item key={option.id} label={option.label} value={option.value} />
      ))}
    </_Picker>
  );
};

export default Picker;

const styles = StyleSheet.create({});
