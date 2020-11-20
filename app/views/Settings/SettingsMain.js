import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import SettingsItem from './SettingsItem';
import SettingsRegion from './SettingsRegion';
import SettingsTown from './SettingsTown';
import SettingsDistrict from './SettingsDistrict';
import SettingsRange from './SettingsRange';
import CenteredButton from '../../components/CenteredButton';
import showAlertOnExit from './showAlertOnExit';
import { COLORS } from '../../config';
import * as actions from '../../modules/settings';

const SearchSettingsScreen = props => {
  const { navigation } = props;

  const [region, setRegion] = useState(props.selectedRegion);
  const [town, setTown] = useState(props.selectedTown);
  const [district, setDistrict] = useState(props.selectedDistrict);
  const [order, setOrder] = useState(props.selectedOrder);
  const [range, setRange] = useState(props.selectedRange);

  const defaultTown = () => props.towns.find(x => !x.id);
  const defaultDistrict = () => props.districts.find(x => !x.id);
  const defaultOrder = () => props.orderOptions[0];

  useEffect(() => {
    const unsubscribe = showAlertOnExit(
      navigation,
      region,
      town,
      district,
      order,
      range,
    );
    return unsubscribe;
  });

  const restoreDefaults = () => {
    setTown(defaultTown());
    setDistrict(defaultDistrict());
    setOrder(defaultOrder());
    setRange(0);

    props.applySettings({
      selectedTown: town,
      selectedDistrict: district,
      selectedOrder: order,
      selectedRange: range,
    });
  };

  const applySettings = () => {
    props.applySettings({
      selectedRegion: region,
      selectedTown: town,
      selectedDistrict: district,
      selectedOrder: order,
      selectedRange: range,
    });
    navigation.popToTop();
  };

  const onRegionChange = newRegion => {
    setRegion(newRegion);
    if (newRegion.id !== town.region) {
      setTown(defaultTown());
    }
    if (district.id && newRegion.id !== district.town.region) {
      setDistrict(defaultDistrict());
    }
  };

  const onTownChange = newTown => {
    setTown(newTown);
    if (district.id && newTown.id !== district.town.id) {
      setDistrict(defaultDistrict());
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SettingsRegion
          region={region}
          regions={props.regions}
          setRegion={onRegionChange}
          loading={props.regionsPending}
        />

        <SettingsTown
          region={region}
          town={town}
          towns={props.towns}
          setTown={onTownChange}
        />

        <SettingsDistrict
          town={town}
          district={district}
          districts={props.districts}
          setDistrict={setDistrict}
        />

        <SettingsItem
          title="Сортировка"
          selectedValue={order && order.name}
          onItemSelect={item => setOrder(item)}
          options={props.orderOptions}
        />

        <SettingsRange range={range} setRange={setRange} />

        <View style={{ margin: 10 }}>
          <Button
            title="Применить"
            buttonStyle={{
              borderRadius: 8,
              backgroundColor: COLORS.PRIMARY,
            }}
            onPress={applySettings}
            accessibilityLabel="Применить выбранные фильтры"
          />
        </View>

        <CenteredButton
          onPress={() => restoreDefaults()}
          title="Восстановить по умолчанию"
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    ...state.settings,
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
});
