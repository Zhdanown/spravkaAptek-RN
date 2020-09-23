import React from 'react';
import { connect } from 'react-redux';
import { setSearchPharm } from '../../modules/search';

import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { useWindowDimensions } from 'react-native';

import PharmContacts from './PharmContacts';
import PharmSchedule from './PharmSchedule';
import PharmLocation from './PharmLocation';
import PharmPhotos from './PharmPhotos';
import Map from '../../components/Map';
import CenteredButton from '../../components/CenteredButton';
import NoContentFiller from '../../components/NoContentFiller';

import { getRoute, calculateDistance } from '../../utils';
import ProductSection from './ProductSection';

function PharmacyScreen({ navigation, route, setSearchPharm, ...props }) {
  const { location, isTrackingLocation } = props;
  const { pharmacy, drug } = route.params;
  const { latitude, longitude } = pharmacy;
  const pharmCoordinates = { latitude: +latitude, longitude: +longitude };
  const [distance, setDistance] = React.useState(null);

  React.useEffect(() => {
    const newDistance = location
      ? calculateDistance(location, { latitude, longitude })
      : null;
    setDistance(newDistance);
  }, [location]);

  if (!pharmacy) return <NoContentFiller text="Аптека не найдена" />;

  const {
    name,
    address,
    isOpenNow,
    schedule: { name: schedule },
    contacts,
    pharmacy_photos,
  } = pharmacy;

  const windowHeight = useWindowDimensions().height;
  const mapHeight = windowHeight * 0.5;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Map */}
        <View style={{ height: mapHeight }}>
          <Map
            mapHeight={mapHeight}
            pharmCoordinates={pharmCoordinates}
            userLocation={location}
          />
        </View>

        <CenteredButton
          onPress={() => getRoute(latitude, longitude)}
          title="Проложить маршрут"
        />

        <View style={{ padding: 10 }}>

          {drug && <ProductSection product={drug}/>}

          <Text style={styles.pharmacyName}>{name}</Text>

          <CenteredButton
            onPress={() => setSearchPharm(pharmacy, navigation)}
            title="Искать в этой аптеке"
          />

          <PharmLocation
            address={address}
            location={location}
            distance={distance}
            isTrackingLocation={isTrackingLocation}
          />
          <PharmSchedule schedule={schedule} isOpenNow={isOpenNow} />
          <PharmContacts contacts={contacts} />
          <PharmPhotos pharmacyPhotos={pharmacy_photos} />
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    ...state.location,
  };
};

export default connect(
  mapStateToProps,
  { setSearchPharm },
)(PharmacyScreen);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  pharmacyName: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    margin: 15,
    textAlign: 'center',
  },
  justified: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
  },
});
