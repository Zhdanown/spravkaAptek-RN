import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';

import BorderlessButton from '../../../components/BorderlessButton';
import { COLORS } from '../../../config';
import * as actions from '../../../modules/settings';

const rangeValues = [0, 1, 2, 3, 5, 8, 13, 21, 33, 54];

const SearchSettingsScreen = props => {
  const { navigation } = props;
  const { loadRegions, loadTowns } = props;
  const { location, isTrackingLocation } = props;

  const [region, setRegion] = useState(props.selectedRegion);
  const [town, setTown] = useState(props.selectedTown);
  const [order, setOrder] = useState(props.selectedOrder);
  const [range, setRange] = useState(rangeValues.indexOf(props.distance));
  const [hasUnsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    // check for unsaved changes
    if (
      region !== props.selectedRegion ||
      town !== props.selectedTown ||
      order !== props.selectedOrder ||
      range !== rangeValues.indexOf(props.distance)
    ) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [
    region,
    town,
    order,
    range,
    props.selectedRegion,
    props.selectedTown,
    props.selectedOrder,
    props.distanceÎ,
  ]);

  useEffect(() => {
    // load regions if there's none
    if (!props.regions.length) loadRegions();
  }, [props.regions]);

  useEffect(() => {
    // load region's towns when region changes and towns hasn't been loaded yet
    if (region && !region.townsLoaded) loadTowns(region.id);
  }, [region]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (e.data.action.type === 'POP_TO_TOP' || !hasUnsavedChanges) return;

        e.preventDefault();

        Alert.alert(
          'Несохранённые изменения',
          'Несохранённые изменения будут потеряны. Закрыть окно настроек?',
          [
            { text: 'Отмена', style: 'cancel', onPress: () => {} },
            {
              text: 'Закрыть',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [hasUnsavedChanges],
  );

  const restoreDefaults = () => {
    setTown(props.towns[0]); // set 1st as default ('not selected')
    setOrder(props.orderOptions[0]); // set 1st as default ('newest first')
    setRange(0);

    props.applySettings({
      selectedTown: town,
      selectedOrder: order,
      distance: range,
    });
  };

  const applySettings = () => {
    props.applySettings({
      selectedRegion: region,
      selectedTown: town,
      selectedOrder: order,
      distance: rangeValues[range],
    });
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      {/* Filter items */}
      <ScrollView style={styles.items}>
        {/* "Apply filters" button */}
        <View
          style={{
            margin: 10,
            backgroundColor: COLORS.PRIMARY,
            borderColor: COLORS.PRIMARY,
            borderWidth: 1,
            borderRadius: 8,
          }}>
          <Button
            title="Применить"
            color={'white'}
            onPress={applySettings}
            accessibilityLabel="Применить выбранные фильтры"
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SettingsOptionList', {
              title: 'Регион',
              options: props.regions,
              onItemSelect: item => setRegion(item),
            })
          }>
          <View style={[styles.card, styles.oneLine]}>
            <Text style={styles.itemLabel}>Регион</Text>
            <Text style={styles.itemValue} numberOfLines={1}>
              {(region && region.name) || 'Не выбрано'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!region}
          onPress={() =>
            navigation.navigate('SettingsOptionList', {
              title: 'Населённый пункт',
              options: props.towns.filter(
                x => x.region === region.id || x.id === '',
              ),
              onItemSelect: item => setTown(item),
            })
          }>
          <View
            style={[
              styles.card,
              styles.oneLine,
              { opacity: region ? 1 : 0.5 },
            ]}>
            <Text style={styles.itemLabel}>Населённый пункт</Text>
            <Text style={styles.itemValue} numberOfLines={1}>
              {(town && town.name) || 'Не выбрано'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SettingsOptionList', {
              title: 'Сортировка',
              options: props.orderOptions,
              onItemSelect: item => setOrder(item),
            })
          }>
          <View style={[styles.card, styles.oneLine]}>
            <Text style={styles.itemLabel}>Сортировка</Text>
            <Text style={styles.itemValue} numberOfLines={1}>
              {order && order.name}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={[styles.oneLine, { marginBottom: 15 }]}>
            <Text style={styles.itemLabel}>Радиус поиска</Text>
            <Text style={styles.itemLabel}>
              {location
                ? (range && rangeValues[range] + 'км') || 'Не важно'
                : 'Не доступно'}
            </Text>
          </View>

          {location ? (
            <Slider
              value={range}
              onValueChange={setRange}
              minimumValue={0}
              maximumValue={rangeValues.length - 1}
              step={1}
              minimumTrackTintColor="#ddd"
              maximumTrackTintColor={COLORS.FADED}
              thumbTintColor={COLORS.PRIMARY}
            />
          ) : (
            <Text style={{ textAlign: 'center', color: COLORS.FADED }}>
              <Icon name="location-off" size={15} />
              {isTrackingLocation
                ? 'Определяем местоположение'
                : 'Местоположение не определено'}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <BorderlessButton
            onPress={() => restoreDefaults()}
            title="Восстановить по умолчанию"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    ...state.settings,
    ...state.location,
  };
};

export default connect(
  mapStateToProps,
  { ...actions },
)(SearchSettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  items: {
    flex: 1,
  },
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
  item: {
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
