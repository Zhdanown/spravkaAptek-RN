import React from 'react';

import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './SearchScreen';
import SettingsScreen from './Settings';
import PharmacyScreen from '../PharmacyScreen';
import SearchHistory from './history/SearchHistory';
import { getLocation } from '../../modules/location';
import OptionListView from './Settings/OptionListView';

const Stack = createStackNavigator();

function HomeScreen(props) {
  React.useEffect(() => {
    props.getLocation();
  }, []);

  React.useEffect(() => {
    if (props.locationError) {
      alert(
        'Не удалось определить местоположение. Некоторые функции будут недоступны',
      );
      console.log(props.locationError);
    }
  }, [props.locationError]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Поиск',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="SearchHistory"
        component={SearchHistory}
        options={{ title: 'История поиска' }}
      />

      <Stack.Screen
        name="SearchSettings"
        component={SettingsScreen}
        options={{
          title: 'Настройки поиска',
        }}
      />
      <Stack.Screen
        name="SettingsOptionList"
        component={OptionListView}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    locationError: state.location.locationError,
  };
};

export default connect(
  mapStateToProps,
  { getLocation },
)(HomeScreen);
