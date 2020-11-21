import React from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';

export default function Group({ navigation, route }) {
  const { group } = route.params;
  const categories = group.drug_categories;

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onOpen={() =>
            navigation.navigate('Category', {
              title: item.name,
              category: item,
            })
          }
        />
      )}
    />
  );
}
