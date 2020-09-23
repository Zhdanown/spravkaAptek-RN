import React, {useEffect} from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { FlatList } from 'react-native';

import { connect } from 'react-redux';

import CenteredButton from '../../components/CenteredButton';
import NoContentFiller from '../../components/NoContentFiller';
import { COLORS } from '../../config';
import * as actions from '../../modules/pharmacies';
import PharmacyCard from './PharmacyCard';
import convertToPharmacy from "./convertToPharmacy"

const PharmaciesScreen = props => {
  const { navigation } = props;
  const { loadPharmacies } = props;
  const { pharmacies, loading, count } = props;
  const { location } = props;

  useEffect(() => {
    loadPharmacies();

    const unsubscribe = navigation.addListener('beforeRemove', e => {
      console.log(e.data)
      e.preventDefault();
      
    });
    return unsubscribe

  }, [])

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
                pharmacy: convertToPharmacy(item),
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl colors={COLORS.PRIMARY} refreshing={loading} />
        }
        initialNumToRender={10}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={loading && <NoContentFiller text={'Загрузка...'} />
      }
      />

    </View>
  );
};

const mapStateToProps = state => {
  return { ...state.pharmacies, ...state.location };
};
export default connect(
  mapStateToProps,
  { ...actions },
)(PharmaciesScreen);
