import React from 'react';
import { RefreshControl } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

import ListItem from './ListItem';
import NoContentFiller from '../../components/NoContentFiller';
import { COLORS } from '../../config';
import { loadAllCategories } from '../../modules/reference';

const GroupList = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.reference.categories);
  const isLoading = useSelector(state => state.reference.isLoadingCategories);
  const error = useSelector(state => state.reference.categoriesError);

  React.useEffect(() => {
    dispatch(loadAllCategories());
  }, []);

  const renderEmpty = () =>
    error && <NoContentFiller text="Не удалость загрузить данные :(" />;

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onOpen={() =>
            navigation.navigate('Group', {
              title: item.name,
              group: item,
            })
          }
        />
      )}
      refreshControl={
        <RefreshControl
          colors={[COLORS.PRIMARY]}
          refreshing={isLoading}
          onRefresh={() => dispatch(loadAllCategories())}
        />
      }
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

export default GroupList;
