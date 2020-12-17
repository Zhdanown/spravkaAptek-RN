import React from 'react';

import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './SearchScreen';
import PharmacyScreen from '../PharmacyScreen';
import SearchHistory from './history/SearchHistory';
import { getLocation } from '../../modules/location';
import SettingsMain from '../Settings/SettingsMain';
import SettingsItemOptions from '../Settings/SettingsItemOptions';
import { Alert } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen(props) {
  React.useEffect(() => {
    props.getLocation();
  }, []);

  React.useEffect(() => {
    if (props.locationError) {
      Alert.alert(
        "Внимание",
        'Не удалось определить местоположение. Некоторые функции будут недоступны',
      );
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
        name="Settings"
        component={SettingsMain}
        options={{ title: "Настройки" }}
      />
      <Stack.Screen
        name="SettingsItemOptions"
        component={SettingsItemOptions}
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
