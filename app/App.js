import 'react-native-gesture-handler';
import React from 'react';

import {Provider} from 'react-redux';
import store from './modules/store';

import {View, Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './views/HomeScreen';
import PharmaciesScreen from './views/PharmaciesScreen';
import ReferenceScreen from "./views/ReferenceScreen";
// import Scrollable from './views/ScrollableScreen';
// import Pharmacy from './views/Pharmacy';
import SearchHeader from './views/HomeScreen/SearchHeader';
import BorderlessButton from './components/BorderlessButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from './config';

const Tab = createBottomTabNavigator();

function ClearFilterButton({clearFilters}) {
  return (
    <View style={{marginRight: 10}}>
      <BorderlessButton onPress={() => console.log('sdf')} title="Очистить" />

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
                iconName = 'magnify';
              } else if (route.name === 'Filter') {
                iconName = 'filter';
              } else if (route.name === 'Pharmacies') {
                iconName = 'store';
              } else if ("Reference") {
                iconName = 'book-open'
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: COLORS.PRIMARY,
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Поиск',
              // header: props => <SearchHeader />,
            }}
          />
          <Tab.Screen
            name="Pharmacies"
            component={PharmaciesScreen}
            options={{
              title: 'Аптеки',
              headerRight: props => (
                <ClearFilterButton clearFilters={clearFilters} />
                ),
              }}
          />
          <Tab.Screen
            name="Reference"
            component={ReferenceScreen}
            options={{
              title: 'Справочник',
              // headerRight: props => (
              //   <ClearFilterButton clearFilters={clearFilters} />
              // ),
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
