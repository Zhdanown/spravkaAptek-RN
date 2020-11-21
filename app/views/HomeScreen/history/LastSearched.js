import React from 'react';
import { View, Text } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import HistoryItem from './HistoryItem';
import CenteredButton from '../../../components/CenteredButton';
import NoContentFiller from '../../../components/NoContentFiller';
import { COLORS } from '../../../config';
import { searchResults, removeHistoryItem } from '../../../modules/search';

export default function LastSearched() {
  // show last 7 search Results

  const dispatch = useDispatch();
  const searchHistory = useSelector(state => state.search.history);
  const navigation = useNavigation();

  return (
    <View
      style={[
        { margin: 10 },
        !searchHistory.length && { flex: 1, justifyContent: 'center' },
      ]}>
      {!searchHistory.length && (
        <View>
          <NoContentFiller text="История поиска пуста" />
        </View>
      )}

      <CenteredButton
        onPress={() => navigation.navigate('SearchHistory')}
        title="История поиска"
      />

      {searchHistory.slice(0, 7).map(item => (
        <HistoryItem
          key={item.id}
          item={item}
          onPress={value => dispatch(searchResults(value))}
          onDelete={item => dispatch(removeHistoryItem(item))}
        />
      ))}
      {searchHistory.length > 7 && <Ellipsis />}
    </View>
  );
}

const Ellipsis = () => (
  <Text
    style={{
      margin: 10,
      flex: 1,
      textAlign: 'center',
      fontSize: 25,
      color: COLORS.FADED,
    }}>
    . . .
  </Text>
);
