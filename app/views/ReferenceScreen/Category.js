import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import ListItem from './ListItem';
import NoContentFiller from '../../components/NoContentFiller';
import { COLORS } from '../../config';
import { loadProducts } from '../../modules/reference';

export default function Category({ navigation, route }) {
  const { category } = route.params;

  const dispatch = useDispatch();
  const products = useSelector(state => state.reference.products);
  const isLoading = useSelector(state => state.reference.isLoadingProducts);
  const error = useSelector(state => state.reference.productsError);

  const renderEmpty = () =>
    error && <NoContentFiller text="Не удалость загрузить данные :(" />;

  React.useEffect(() => {
    dispatch(loadProducts(category.id));
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          renderTitle={() => item.full_name}
          onOpen={() =>
            navigation.navigate('Product', {
              title: item.full_name,
              product: item,
            })
          }
        />
      )}
      refreshControl={
        <RefreshControl
          colors={[COLORS.PRIMARY]}
          refreshing={isLoading}
          onRefresh={() => dispatch(loadProducts(category.id))}
        />
      }
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
}
