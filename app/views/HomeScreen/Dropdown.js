import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useDispatch } from "react-redux";
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../config';
import { searchResults, loadSuggestions } from "../../modules/search"


export default function Dropdown({ options }) {
  
  const dispatch = useDispatch();

  const onSearchItemSelect = (item) => {
    dispatch(searchResults(item.name));
    dispatch(loadSuggestions(""))
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
      }}>
      {options.map(option => (
        <TouchableOpacity onPress={() => onSearchItemSelect(option)} key={option.id}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>

            {option.category === 'drugs' ? (
              <FA5Icon name='tablets' size={16} color={COLORS.PRIMARY} />
            ) : (
              <MCIcon name='store' size={16} color={COLORS.PRIMARY} />
            )}

            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                fontSize: 20,
                marginLeft: 10,
                color: COLORS.PRIMARY,
              }}>
              {option.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
