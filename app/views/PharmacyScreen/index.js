import React from 'react';
import { connect } from 'react-redux';
import { setSearchPharm } from '../../modules/search';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { useWindowDimensions } from 'react-native';

import Map from '../../components/Map';
import NoContentFiller from '../../components/NoContentFiller';
import BorderlessButton from '../../components/BorderlessButton';
import PharmContacts from "./PharmContacts";
import PharmSchedule from './PharmSchedule';
import PharmLocation from "./PharmLocation";
import PharmPhotos from './PharmPhotos';

import { COLORS } from '../../config';

import { getRoute, calculateDistance } from '../../utils';

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
    short_address: address,
    is_work_now: isOpenNow,
    schedule: { name: schedule },
    contacts,
    pharmacy_photos
  } = pharmacy;

  const { drugName, country, price, quantity } = drug;
  const windowHeight = useWindowDimensions().height;
  const mapHeight = windowHeight * 0.5;

  const renderDrugInfo = () => {
    return (
      <View
        style={[styles.section, { borderColor: COLORS.PRIMARY, borderWidth: 1 }]}>
        <Text style={{ fontSize: 16 }}>
          {drugName} ({country})
        </Text>
        <View style={[styles.justified, { marginTop: 5 }]}>
          <Text style={styles.bold}>В наличии: {quantity}</Text>
          <Text style={styles.bold}>по {price} &#8381;</Text>
        </View>
      </View>
    );
  };

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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <BorderlessButton
            onPress={() => getRoute(latitude, longitude)}
            title="Проложить маршрут"
          />
        </View>

        <View style={{ padding: 10 }}>

          {renderDrugInfo()}

          {/* Pharmacy Info */}
          <Text style={styles.pharmacyName}>{name}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <BorderlessButton
              onPress={() => setSearchPharm(pharmacy, navigation)}
              title="Искать в этой аптеке"
            />
          </View>

          <PharmLocation address={address} location={location} distance={distance} isTrackingLocation={isTrackingLocation} />
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
    shadowOpacity: .5,
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
