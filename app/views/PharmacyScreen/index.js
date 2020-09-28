import React from 'react';
import { connect } from 'react-redux';
import { setSearchPharm } from '../../modules/search';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
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
import api from '../../services/api';

function PharmacyScreen({ navigation, route, setSearchPharm, ...props }) {
  const { location: userLocation, isTrackingLocation } = props;
  const { pharmId, drug } = route.params;
  const [pharmacy, setPharmacy] = React.useState(null);
  const [isLoading, setLoader] = React.useState(false);
  const [distance, setDistance] = React.useState(null);

  React.useEffect(() => {
    if (!pharmacy) fetchPharmInfo(pharmId);
  }, []);

  React.useEffect(() => {
    if (!pharmacy) return;
    const newDistance = userLocation
      ? calculateDistance(userLocation, getPharmCoordinates())
      : null;
    setDistance(newDistance);
  }, [userLocation, pharmacy]);

  const fetchPharmInfo = async pharmId => {
    try {
      setLoader(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await api.get(`/simple-pharmacy/${pharmId}/`);
      setPharmacy(response.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.error(err);
    }
  };

  function getPharmCoordinates() {
    return pharmacy
      ? { latitude: +pharmacy.latitude, longitude: +pharmacy.longitude }
      : null;
  }

  const windowHeight = useWindowDimensions().height;
  const mapHeight = windowHeight * 0.33;

  if (isLoading) return <NoContentFiller text={'Загрузка...'} />;
  if (!pharmacy) return <NoContentFiller text="Аптека не найдена" />;

  const { name, address, is_work_now: isOpenNow } = pharmacy;
  const { schedule, contacts, pharmacy_photos } = pharmacy;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: mapHeight }}>
          <Map
            mapHeight={mapHeight}
            pharmCoordinates={getPharmCoordinates()}
            userLocation={userLocation}
          />
        </View>

        <CenteredButton
          onPress={() => getRoute(...getPharmCoordinates())}
          title="Проложить маршрут"
        />

        <View style={{ padding: 10 }}>
          {drug && <ProductSection product={drug} />}

          <Text style={styles.pharmacyName}>{name}</Text>

          <CenteredButton
            onPress={() => setSearchPharm(pharmacy, navigation)}
            title="Искать в этой аптеке"
          />

          <PharmLocation
            address={address}
            userLocation={userLocation}
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
