import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from './SearchScreen'
import FilterScreen from './FilterScreen';
import PharmacyScreen from "../PharmacyScreen";
import SearchHeader from './SearchHeader';

const Stack = createStackNavigator();



export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Поиск',
          header: props => <SearchHeader />,
        }}
      />
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        options={
          ({ route }) => ({ title: route.params.title })
        }
      />
    </Stack.Navigator>
  );
}

