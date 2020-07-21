import React from 'react';
import {connect} from 'react-redux';
import {RefreshControl, FlatList, View, ActivityIndicator, Text} from 'react-native';
import ItemCard from './ItemCard';
import NoContentFiller from '../../components/NoContentFiller';
import {COLORS} from '../../config';
// actions
import {loadNextPage} from '../../modules/search';

function SearchScreen({
  navigation,
  items,
  isLoading,
  loadNextPage,
  isLoadingNextPage,
  count,
  value
}) {

  const renderHeader = () => { 
    if (!count) return null;

    return (
        <View style={{ paddingHorizontal: 10}}>
          <Text style={{color: '#666'}}>Найдено {count} результатов</Text>
        </View>
      );
    }

  const renderItem = ({item}) => {
    return (
      <ItemCard
        item={item}
        onOpen={() =>
          navigation.navigate('Pharmacy', {
            pharmacyId: item.price_list.pharmacy.id,
            title: item.name,
            pharmacy: item.price_list.pharmacy,
          })
        }
      />
    );
  };


  const renderSeparator = () => (
    <View
      style={{
        height: 2,
        backgroundColor: '#bbb',
        flex: 1,
        marginHorizontal: 10,
      }}
    />
  );

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
        ItemSeparatorComponent={renderSeparator}
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
  };
}

export default connect(
  mapStateToProps,
  {loadNextPage},
)(SearchScreen);
