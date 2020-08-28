import React from 'react'
import { View, Text, FlatList } from 'react-native';

import { useSelector, useDispatch } from "react-redux";

import HistoryItem from "./HistoryItem";
import NoContentFiller from "../../../components/NoContentFiller";
import BorderlessButton from "../../../components/BorderlessButton";
import { searchResults, removeHistoryItem, clearSearchHistory } from "../../../modules/search";

export default function SearchHistory() {
  const dispatch = useDispatch();
  const searchHistory = useSelector(state => state.search.history);

  return (
    // TODO SectionList
    <View style={{ margin: 10, flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        {/* <Text style={{ fontSize: 20 }}>История поиска</Text> */}
        {searchHistory.length ? (
          <BorderlessButton
            onPress={() => dispatch(clearSearchHistory())}
            title="Очистить историю"
          />
        ) : null}
      </View>
      <FlatList
        data={searchHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <HistoryItem item={item} onPress={() => dispatch(searchResults(value))} onDelete={item => dispatch(removeHistoryItem(item))} />
        )}
        ListEmptyComponent={<NoContentFiller text={'История поиска пуста...'} />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  )
}
