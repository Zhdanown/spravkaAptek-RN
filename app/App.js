import 'react-native-gesture-handler';
import React from 'react';

import {Provider} from 'react-redux';
import store from "./modules/store";

import {View, Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import FilterScreen from './views/FilterScreen';
// import Scrollable from './views/ScrollableScreen';
import Pharmacy from './views/Pharmacy';
import SearchHeader from './views/HomeScreen/SearchHeader';
import BorderlessButton from './components/BorderlessButton';



const Stack = createStackNavigator();

function ClearFilterButton({clearFilters}) {
  return (
    <View style={{marginRight: 10}}>
      <BorderlessButton onPress={() => console.log('sdf')} text="Очистить" />

      {/* <Button
        onPress={clearFilters}
        title="Очистить"
        color="transparent"
        accessibilityLabel="Применить выбранные фильтры"
      /> */}
    </View>
  );
}

function App() {
  const clearFilters = () => {
    console.log('filters cleared');
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: props => <SearchHeader />,
            }}
          />
          <Stack.Screen
            name="Filter"
            component={FilterScreen}
            options={{
              title: 'Фильтры',
              headerRight: props => (
                <ClearFilterButton clearFilters={clearFilters} />
              ),
            }}
          />
          <Stack.Screen
            name="Pharmacy"
            component={Pharmacy}
            options={
              {
                // headerShown: false,
              }
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
