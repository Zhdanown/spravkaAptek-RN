import 'react-native-gesture-handler';
import React from 'react';

import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { store, persistor } from './modules/store';
import HomeScreen from './views/HomeScreen';
import PharmaciesScreen from './views/PharmaciesScreen';
import ReferenceScreen from "./views/ReferenceScreen";
import { COLORS } from './config';


const Tab = createBottomTabNavigator();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
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
              }}
            />
            <Tab.Screen
              name="Pharmacies"
              component={PharmaciesScreen}
              options={{
                title: 'Аптеки',
              }}
            />
            <Tab.Screen
              name="Reference"
              component={ReferenceScreen}
              options={{
                title: 'Справочник',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        
      </PersistGate>
    </Provider>
  );
}

function withSafeAreaView(Component) {
  return function (props) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Component {...props} />
      </SafeAreaView>
    )
  };
}

export default withSafeAreaView(App);
