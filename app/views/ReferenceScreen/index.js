import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import GroupList from './GroupList';
import Group from './Group';
import Category from './Category';
import Product from './Product';
import ProductManual from './ProductManual';

const Stack = createStackNavigator();

const ReferenceScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupList"
        component={GroupList}
        options={{
          title: 'Группы препаратов',
        }}
      />
      <Stack.Screen
        name="Group"
        component={Group}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name="ProductManual"
        component={ProductManual}
        options={({route}) => ({title: route.params.title})}
      />
    </Stack.Navigator>
  );
};

export default ReferenceScreen;

//https://spravkaaptek.ru/api/drug-info/66933/ - карточка препарата
//const response = await Axios.get(API_URL + `drug-info/${productId}/`);
