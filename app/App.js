import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import FilterScreen from './views/FilterScreen';
import Scrollable from './views/ScrollableScreen';
import SearchHeader from './views/HomeScreen/SearchHeader';

const Stack = createStackNavigator();

function ClearFilterButton({clearFilters}) {
  return (
    <View style={{marginRight: 10}}>
      <Button
        onPress={clearFilters}
        title="Очистить"
        color="steelblue"
        accessibilityLabel="Применить выбранные фильтры"
      />
    </View>
  );
}

function App() {
  const clearFilters = () => {
    console.log('filters cleared');
  };

  return (
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
          name="Scrollable"
          component={Scrollable}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
