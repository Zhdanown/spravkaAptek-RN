import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { searchResults, multiSearch } from "../../modules/search"
import { COLORS } from '../../config';

import { useDispatch } from "react-redux";

export default function Dropdown({ options }) {
  
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
        borderColor: '#ccc',
        borderRadius: 8,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: .5,
        shadowRadius: 5,
      }}>
      {options.map(option => (
        <TouchableOpacity onPress={() => onSearchItemSelect(option)} key={option.id}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>

            {option.category === 'drugs' ? (
              <FA5Icon name='tablets' size={25} color={COLORS.PRIMARY} />
            ) : (
              <MCIcon name='store' size={25} color={COLORS.PRIMARY} />
            )}

            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: '600',
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
