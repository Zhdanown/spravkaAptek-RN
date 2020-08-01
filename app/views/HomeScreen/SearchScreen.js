import React from 'react';
import {connect} from 'react-redux';
import {RefreshControl, FlatList, View, ActivityIndicator, Text} from 'react-native';
import ItemCard from './ItemCard';
import NoContentFiller from '../../components/NoContentFiller';
import {COLORS} from '../../config';
import { getWordEnding } from "../../utils";
// actions
import {loadNextPage} from '../../modules/search';

function SearchScreen({
  navigation,
  items,
  isLoading,
  loadNextPage,
  isLoadingNextPage,
  count,
  value,
  location,
  locationError,
  isTrackingLocation,
}) {

  const renderHeader = () => { 
    if (!count) return null;
    const text = `Найдено ${count} ${getWordEnding(count, ['результат', 'результата', 'результатов'])}`;

    return (
        <View style={{ paddingHorizontal: 10}}>
          <Text style={{color: '#666'}}>{text}</Text>
        </View>
      );
    }

  const renderItem = ({item}) => {
    return (
      <ItemCard
        item={item}
        location={location}
        isTrackingLocation={isTrackingLocation}
        onOpen={() =>
          navigation.navigate('Pharmacy', {
            title: item.name,
            pharmacy: item.price_list.pharmacy,
            drug: { price: item.price, quantity: item.quantity, drugName: item.name, country: item.country }
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
        style={{marginBottom: 10}}
        animating
        size="large"
      />
    );
  };

  return (
    <>
      {/* <SearchHeader /> */}
      <FlatList
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
          value && <NoContentFiller text={`По запросу '${value}'\nничего не найдено :(` } />
        }
        contentContainerStyle={{ flexGrow: 1, }}
        ListFooterComponent={renderFooter()}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    items: state.search.fetchedItems,
    isLoading: state.search.isLoading,
    isLoadingNextPage: state.search.isLoadingNextPage,
    value: state.search.value,
    count: state.search.count,
    ...state.location
  };
}

export default connect(
  mapStateToProps,
  {loadNextPage},
)(SearchScreen);
