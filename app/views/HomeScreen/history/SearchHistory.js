import React from 'react';
import { View, Text, SectionList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import HistoryItem from './HistoryItem';
import NoContentFiller from '../../../components/NoContentFiller';
import CenteredButton from '../../../components/CenteredButton';
import { dateToString } from '../../../utils';
import {
  searchResults,
  removeHistoryItem,
  clearSearchHistory,
} from '../../../modules/search';
import { COLORS } from '../../../config';

export default function SearchHistory() {
  const dispatch = useDispatch();
  const searchHistory = useSelector(state => state.search.history);

  // const getTitle = dateString => new Date(dateString).toISOString().split('T')[0];
  const getTitle = date => dateToString(date, 'ww - dd mmmm yyyy');

  const data = searchHistory.reduce((days, item) => {
    let foundDay = days.find(day => day.title === getTitle(item.date));
    if (foundDay) {
      foundDay.data.push(item);
    } else {
      let day = {
        title: getTitle(item.date),
        data: [{ ...item }],
      };
      days.push(day);
    }

    return days;
  }, []);

  console.log(searchHistory);

  const days = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  return (
    // TODO SectionList
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
            onPress={() => dispatch(searchResults(value))}
            onDelete={item => dispatch(removeHistoryItem(item))}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontSize: 24,
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
