import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../../../config';

export default function(props) {
  if (props.onPress) return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <SettingsItem {...props} />
    </TouchableOpacity>
  );

  return <SettingsItem {...props} />;
}

function SettingsItem(props) {
  const { selectedValue, title, children, disabled = false } = props;
  const navigation = useNavigation();

  return (
    <View style={[styles.card, { opacity: disabled ? 0.5 : 1 }]}>
      <View style={styles.oneLine}>
        <Text style={styles.itemLabel}>{title}</Text>
        <Text style={styles.itemValue} numberOfLines={1}>
          {selectedValue}
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    paddingVertical: 20,
    borderRadius: 8,
  },
  oneLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLabel: {
    color: COLORS.FADED,
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    flex: 1,
    textAlign: 'right',
    marginLeft: 5,
  },
});
