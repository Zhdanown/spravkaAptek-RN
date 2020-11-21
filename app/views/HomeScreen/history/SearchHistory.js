import React from 'react';
import { View, Text, SectionList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import splitByDays from './splitByDays';
import HistoryItem from './HistoryItem';
import NoContentFiller from '../../../components/NoContentFiller';
import CenteredButton from '../../../components/CenteredButton';
import {
  searchResults,
  removeHistoryItem,
  clearSearchHistory,
} from '../../../modules/search';
import { COLORS } from '../../../config';

export default function SearchHistory() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchHistory = useSelector(state => state.search.history);

  const data = splitByDays(searchHistory);

  const onItemSelect = value => {
    dispatch(searchResults(value));
    navigation.goBack();
  }

  return (
    <View style={{ margin: 10, flex: 1 }}>
      {searchHistory.length ? (
        <CenteredButton
          onPress={() => dispatch(clearSearchHistory())}
          title="Очистить историю"
        />
      ) : null}

      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <HistoryItem
            item={item}
            onPress={onItemSelect}
            onDelete={item => dispatch(removeHistoryItem(item))}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontSize: 22,
              paddingTop: 10,
              color: COLORS.FADED,
            }}>
            {title}
          </Text>
        )}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={<NoContentFiller text={'История поиска пуста'} />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}
