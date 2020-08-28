import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HistoryItem from "./HistoryItem";
import IconButton from "../../../components/IconButton";
import BorderlessButton from '../../../components/BorderlessButton';
import {searchResults} from "../../../modules/search"

export default function LastSearched() {
  // show last 5 search Results

  const dispatch = useDispatch();
  const searchHistory = useSelector(state => state.search.history);
  const navigation = useNavigation();


  return (
    <View style={{ margin: 10 }}>
      {/* <Text>Последние результаты</Text> */}
      {searchHistory.slice(0, 5).map(item => (
        <HistoryItem key={item.id} item={item} onPress={(value) => dispatch(searchResults(value))} deletable={false} />
      ))}
      {searchHistory.length > 5 && <Ellipsis />}

      <BorderlessButton onPress={() => navigation.navigate("SearchHistory")} title="История поиска" />
    </View>
  )
}

const Ellipsis = () => (
  <Text style={{ margin: 10, flex: 1, textAlign: 'center' }}>. . .</Text>
)