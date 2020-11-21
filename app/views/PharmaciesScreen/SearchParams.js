import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import CenteredButton from '../../components/CenteredButton';
import { getWordEnding } from '../../utils/getWordEnding';
import { COLORS } from '../../config';

export default function SearchParams() {
  const navigation = useNavigation();

  const region = useSelector(state => state.settings.selectedRegion);
  const town = useSelector(state => state.settings.selectedTown);
  const count = useSelector(state => state.pharmacies.count);
  const loading = useSelector(state => state.pharmacies.loading);

  const countOfFound = `${getWordEnding(count, [
    'Найден',
    'Найдено',
    'Найдено',
  ])} ${count} ${getWordEnding(count, [
    'результат',
    'результата',
    'результатов',
  ])}`;

  return (
    <View style={{ margin: 8 }}>
      <View>
        {region && <Text style={styles.selected}>{region.name}</Text>}
        {!!town.id && <Text style={styles.selected}>{town.name}</Text>}
        {!(region || !!town.id) && (
          <Text style={[styles.label, { textAlign: 'center' }]}>
            Параметры отбора не заданы
          </Text>
        )}
      </View>
      <CenteredButton
        style={{ marginVertical: 10 }}
        title="Изменить"
        onPress={() => navigation.navigate('Settings')}
      />
      {!loading && !!count && <Text style={styles.label}>{countOfFound}</Text>}
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
    fontSize: 18,
    paddingVertical: 5,
    textAlign: 'center',
  },
});
