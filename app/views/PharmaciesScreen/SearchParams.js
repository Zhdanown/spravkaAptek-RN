import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import BorderlessButton from '../../components/BorderlessButton';
import { getWordEnding } from '../../utils/getWordEnding';
import { COLORS } from '../../config';

function SearchParams(props) {
  const navigation = useNavigation();

  const { region, town, district } = props;
  const { count, loading } = props;

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
      <View style={{ marginBottom: 20 }}>
        <View style={styles.oneLine}>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Параметры поиска</Text>
          <BorderlessButton
            title="Изменить"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        <Text style={{ color: COLORS.FADED }} numberOfLines={1}>
          {region && <Text>{region.name}</Text>}
          {!!town.id && <Text>{' > ' + town.name}</Text>}
          {!!district.id && <Text>{' > ' + district.name}</Text>}
        </Text>
      </View>

      {!loading && !!count && <Text style={styles.label}>{countOfFound}</Text>}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    region: state.settings.selectedRegion,
    town: state.settings.selectedTown,
    district: state.settings.selectedDistrict,
    count: state.pharmacies.count,
    loading: state.pharmacies.loading,
  };
};

export default connect(mapStateToProps)(SearchParams);

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
  oneLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
