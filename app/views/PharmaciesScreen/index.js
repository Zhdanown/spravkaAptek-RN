import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Pharmacies from './Pharmacies';
import PharmacyScreen from '../PharmacyScreen';
import SettingsMain from '../Settings/SettingsMain';
import SettingsItemOptions from '../Settings/SettingsItemOptions';

const Stack = createStackNavigator();

export default function() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pharmacies"
        component={Pharmacies}
        options={{
          headerShown: false,
          title: "Аптеки"
        }}
      />
      <Stack.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsMain}
        options={{ title: 'Настройки' }}
      />
      <Stack.Screen
        name="SettingsItemOptions"
        component={SettingsItemOptions}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}
