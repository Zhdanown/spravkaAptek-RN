import React from 'react';
import { FlatList } from 'react-native';

import ListItem from '../../../components/ListItem';
import NoContentFiller from '../../../components/NoContentFiller';

export default function OptionListView({ navigation, route }) {
  const { options, onItemSelect } = route.params;

  if (!options) return <NoContentFiller text="Нет доступных вариантов" />;
  return (
    <FlatList
      data={options}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onOpen={() => {
            onItemSelect(item);
            navigation.goBack();
          }}
          textAlign="center"
        />
      )}
    />
  );
}
