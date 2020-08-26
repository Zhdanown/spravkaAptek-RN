import React from 'react';
import {
  RefreshControl,
  FlatList,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

import { connect } from 'react-redux';

import SearchHeader from './SearchHeader';
import ItemCard from './ItemCard';
import NoContentFiller from '../../components/NoContentFiller';
import { COLORS } from '../../config';
import { getWordEnding } from '../../utils';
import { loadNextPage } from '../../modules/search';

function SearchScreen(props) {

  const { navigation } = props;
  const { items, isLoading, count, value } = props;
  const { loadNextPage, isLoadingNextPage } = props;
  const { location, locationError, isTrackingLocation } = props;

  const renderHeader = () => {
    if (!count) return null;
    const text = `Найдено ${count} ${getWordEnding(count, [
      'результат',
      'результата',
      'результатов',
    ])}`;

    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: '#666' }}>{text}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ItemCard
        item={item}
        location={location}
        isTrackingLocation={isTrackingLocation}
        onOpen={() =>
          navigation.navigate('Pharmacy', {
            title: item.name,
            pharmacy: item.price_list.pharmacy,
            drug: {
              price: item.price,
              quantity: item.quantity,
              drugName: item.name,
              country: item.country,
            },
          })
        }
      />
    );
  };

  const renderFooter = () => {
    if (!isLoadingNextPage) return null;
    return (
      <ActivityIndicator
        color={COLORS.PRIMARY}
        style={{ marginBottom: 10 }}
        animating
        size="large"
      />
    );
  };

  return (
    <>
      <FlatList
        style={{ transform: [{ translateY: 75 }] }}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            colors={[COLORS.PRIMARY]}
            refreshing={isLoading}
          // onRefresh={loadResults}
          />
        }
        ListHeaderComponent={renderHeader}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListEmptyComponent={
          value && !isLoading && (
            <NoContentFiller
              text={`По запросу '${value}'\nничего не найдено :(`}
            />
          )
        }
        contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponent={renderFooter()}
      />

      <SearchHeader />

    </>
  );
}

function mapStateToProps(state) {
  return {
    ...state.search,
    items: state.search.fetchedItems,
    ...state.location,
  };
}

export default connect(mapStateToProps, { loadNextPage })(SearchScreen);
