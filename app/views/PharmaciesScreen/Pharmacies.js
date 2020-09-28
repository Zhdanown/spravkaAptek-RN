import React, { useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';

import { connect } from 'react-redux';

import PharmacyCard from './PharmacyCard';
import SearchParams from './SearchParams';
import NoContentFiller from '../../components/NoContentFiller';
import * as actions from '../../modules/pharmacies';
import { COLORS } from '../../config';

const PharmaciesScreen = props => {
  const { navigation } = props;
  const { loadPharmacies } = props;
  const { pharmacies, loading } = props;
  const { location } = props;

  useEffect(() => {
    loadPharmacies();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={pharmacies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PharmacyCard
            item={item}
            location={location}
            onOpen={() =>
              navigation.navigate('Pharmacy', {
                title: item.name,
                pharmId: item.id,
              })
            }
          />
        )}
        ListHeaderComponent={<SearchParams />}
        refreshControl={
          <RefreshControl
            colors={COLORS.PRIMARY}
            refreshing={loading}
            onRefresh={loadPharmacies}
          />
        }
        initialNumToRender={10}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={loading && <NoContentFiller text={'Загрузка...'} />}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    ...state.pharmacies,
    ...state.location,
  };
};
export default connect(
  mapStateToProps,
  { ...actions },
)(PharmaciesScreen);
