import 'react-native-gesture-handler';
import React from 'react';

import {Provider} from 'react-redux';
import store from './modules/store';

import {View, Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './views/HomeScreen';
import FilterScreen from './views/FilterScreen';
// import Scrollable from './views/ScrollableScreen';
import Pharmacy from './views/Pharmacy';
import SearchHeader from './views/HomeScreen/SearchHeader';
import BorderlessButton from './components/BorderlessButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR_THEME} from './config';

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home-outline' : 'home';
              } else if (route.name === 'Filter') {
                iconName = focused ? 'filter-outline' : 'filter';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: COLOR_THEME.PRIMARY,
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: props => <SearchHeader />,
            }}
          />
          <Tab.Screen
            name="Filter"
            component={FilterScreen}
            options={{
              title: 'Фильтры',
              headerRight: props => (
                <ClearFilterButton clearFilters={clearFilters} />
              ),
            }}
          />
          {/* <Tab.Screen
            name="Pharmacy"
            component={Pharmacy}
            options={
              {
                // headerShown: false,
              }
            }
          /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
