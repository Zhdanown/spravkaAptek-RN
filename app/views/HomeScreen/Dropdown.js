import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {searchResults, multiSearch} from "../../modules/search"
import {COLORS} from '../../config';

import {useDispatch} from "react-redux";

export default function Dropdown({options}) {

  const dispatch = useDispatch();
  
  const onSearchItemSelect = (item) => {
    dispatch(searchResults(item.name));
    dispatch(multiSearch(""))
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
      }}>
      {options.map(option => (
        <TouchableOpacity onPress={() => onSearchItemSelect(option)} key={option.id}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              padding: 10,
              color: COLORS.PRIMARY,
            }}>
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
