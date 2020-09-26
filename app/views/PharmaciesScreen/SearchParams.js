import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import BorderlessButton from '../../components/BorderlessButton';
import { COLORS } from '../../config';

export default function SearchParams() {
  const navigation = useNavigation();

  const region = useSelector(state => state.settings.selectedRegion);
  const town = useSelector(state => state.settings.selectedTown);

  return (
    <View style={{ margin: 8 }}>
      <View style={styles.justified}>
        <Text style={styles.label}>Параметры отбора</Text>
        <BorderlessButton
          title="Изменить"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <View>
        {region && <Text style={styles.selected}>{region.name}</Text>}
        {!!town.id  && <Text style={styles.selected}>{town.name}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  justified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.FADED,
  },
  selected: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
