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
import LastSearched from './history/LastSearched';
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
    const countOfFound = `${getWordEnding(count, [
      'Найден',
      'Найдено',
      'Найдено',
    ])} ${count} ${getWordEnding(count, [
      'результат',
      'результата',
      'результатов',
    ])}`;

    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: '#666' }}>{countOfFound}</Text>
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
            pharmId: item.price_list.pharmacy.id,
            drug: {
              price: item.price,
              quantity: item.quantity,
              drugName: item.name,
              country: item.country,
              producer: item.producer
            },
          })
        }
      />
    );
  };

  const renderEmpty = () => {
    return (
      <View style={{ flex: 1 }}>
        {!!value && !isLoading && (
          <View style={{ flexGrow: 0 }}>
            <NoContentFiller
              text={`По запросу '${value}'\nничего не найдено :(`}
            />
          </View>
        )}
        {!isLoading && (
          <View style={{ flex: 1 }}>
            <LastSearched />
          </View>
        )}
      </View>
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
      <View style={{ paddingTop: 75, flex: 1 }}>
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl colors={[COLORS.PRIMARY]} refreshing={isLoading} />
          }
          ListHeaderComponent={renderHeader}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ flexGrow: 1 }}
          ListFooterComponent={renderFooter()}
        />
      </View>

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

export default connect(
  mapStateToProps,
  { loadNextPage },
)(SearchScreen);
