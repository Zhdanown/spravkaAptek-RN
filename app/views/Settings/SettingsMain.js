import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import SettingsItem from './SettingsItem';
import SettingsRegion from './SettingsRegion';
import SettingsTown from './SettingsTown';
import SettingsRange from './SettingsRange';
import CenteredButton from '../../components/CenteredButton';
import showAlertOnExit from './showAlertOnExit';
import { COLORS } from '../../config';
import * as actions from '../../modules/settings';

const SearchSettingsScreen = props => {
  const { navigation } = props;

  const [region, setRegion] = useState(props.selectedRegion);
  const [town, setTown] = useState(props.selectedTown);
  const [order, setOrder] = useState(props.selectedOrder);
  const [range, setRange] = useState(props.selectedRange);

  useEffect(() => {
    const unsubscribe = showAlertOnExit(navigation, region, town, order, range);
    return unsubscribe;
  });

  const restoreDefaults = () => {
    setTown(props.towns[0]); // set 1st as default ('not selected')
    setOrder(props.orderOptions[0]); // set 1st as default ('newest first')
    setRange(0);

    props.applySettings({
      selectedTown: town,
      selectedOrder: order,
      selectedRange: range,
    });
  };

  const applySettings = () => {
    props.applySettings({
      selectedRegion: region,
      selectedTown: town,
      selectedOrder: order,
      selectedRange: range,
    });
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SettingsRegion
          region={region}
          regions={props.regions}
          setRegion={setRegion}
        />

        <SettingsTown
          region={region}
          town={town}
          towns={props.towns}
          setTown={setTown}
        />

        <SettingsItem
          title="Сортировка"
          selectedValue={order && order.name}
          onItemSelect={item => setOrder(item)}
          options={props.orderOptions}
        />

        <SettingsRange
          range={range}
          setRange={setRange}
        />

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
