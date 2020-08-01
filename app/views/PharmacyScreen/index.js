import React from 'react';
import {connect} from 'react-redux';
import {setSearchPharm} from '../../modules/search';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {Image} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Map from '../../components/Map';
import NoContentFiller from '../../components/NoContentFiller';
import ImageSlider from '../../components/ImageSlider';

import {COLORS} from '../../config';
import BorderlessButton from '../../components/BorderlessButton';

import {callNumber, sendEmail, calculateDistance} from '../../utils';

function PharmacyScreen({navigation, route, setSearchPharm, ...props}) {
  const {location, isTrackingLocation} = props;
  const {pharmacy, drug} = route.params;
  const {latitude, longitude} = pharmacy;
  const pharmCoordinates = {latitude: +latitude, longitude: +longitude};

  const [distance, setDistance] = React.useState(null);

  React.useEffect(() => {
    const newDistance = location
      ? calculateDistance(location, {latitude, longitude})
      : null;
    setDistance(newDistance);
  }, [location]);

  if (!pharmacy) return <NoContentFiller text="Аптека не найдена" />;


  const {
    name,
    short_address: address,
    is_work_now: isOpenNow,
    schedule: {name: schedule},
    contacts,
  } = pharmacy;

  const {drugName, country, price, quantity} = drug;
  const windowHeight = useWindowDimensions().height;
  const mapHeight = windowHeight * 0.5;

  const renderDrugInfo = () => {
    return (
      <View
        style={[styles.section, {borderColor: COLORS.PRIMARY, borderWidth: 1}]}>
        <Text style={{fontSize: 16}}>
          {drugName} ({country})
        </Text>

        <View style={[styles.justified, {marginTop: 5}]}>
          <Text style={styles.bold}>В наличии: {quantity}</Text>
          <Text style={styles.bold}>по {price} &#8381;</Text>
        </View>
      </View>
    );
  };

  const renderLocation = () => {
    const iconName = location
      ? distance && 'location-on'
      : isTrackingLocation
      ? 'loop'
      : 'location-off';
    const text = location
      ? distance && `${distance} м`
      : !isTrackingLocation && 'местоположение не определено';

    return (
      <View style={styles.section}>
        <Text style={styles.address}>{address}</Text>
        <View
          style={[
            styles.textWithIcon,
            {marginTop: 10, justifyContent: 'flex-end'},
          ]}>
          <Text style={{color: COLORS.FADED}}>
            {<MIcon name={iconName} size={15} />}
            {text}
          </Text>
        </View>
      </View>
    );
  };

  const renderSchedule = () => {
    return (
      <View style={[styles.justified, styles.section]}>
        <View style={{flexDirection: 'column'}}>
          {schedule
            .split(';')
            .map(x => x.trim())
            .map((scheduleItem, index) => (
              <View key={index} style={styles.textWithIcon}>
                <MCIcon name="clock-outline" size={15} />
                <Text style={{marginLeft: 5}}>{scheduleItem}</Text>
              </View>
            ))}
        </View>

        <Text
          style={{
            fontWeight: '900',
            color: isOpenNow ? 'green' : 'firebrick',
          }}>
          {isOpenNow ? 'Открыто' : 'Закрыто'}
        </Text>
      </View>
    );
  };

  const renderContacts = () => {
    return (
      <View style={styles.section}>
        {contacts.map(x => {
          // if not an email then it's a phone
          const isEmail = x.connection_channel.name === 'Email';

          return (
            <TouchableOpacity
              key={x.id}
              onPress={() =>
                isEmail ? sendEmail(x.info) : callNumber(x.info)
              }>
              <View style={[styles.textWithIcon]}>
                <MCIcon
                  name={isEmail ? 'email' : 'phone'}
                  size={15}
                  color={COLORS.PRIMARY}
                />
                <Text style={[styles.highlighted, {marginLeft: 5}]}>
                  {x.info}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderImageBlank = () => {
    return (
      <View style={styles.imageBlankContainer}>
        <Image
          style={styles.imageBlankPlaceholder}
          source={require('../../assets/no-photo-available.png')}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {/* Map */}
        <View style={{height: mapHeight}}>
          <Map
            mapHeight={mapHeight}
            pharmCoordinates={pharmCoordinates}
            userLocation={location}
          />
        </View>

        <View style={{padding: 10}}>
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
              text="Искать в этой аптеке"
            />
          </View>

          {renderLocation()}

          {renderSchedule()}

          {renderContacts()}

          {/* Pharmacy Images */}
          {/* <ImageSlider /> */}
          {renderImageBlank()}
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
  {setSearchPharm},
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
  },
  pharmacyName: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    margin: 15,
    textAlign: 'center',
  },
  pharmacyAddress: {
    color: COLORS.FADED,
  },
  isPharmacyOpen: {},
  itemPrice: {},
  itemQuantity: {},
  itemDistance: {
    color: COLORS.FADED,
  },

  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justified: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  highlighted: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  label: {
    marginTop: 15,
    textAlign: 'center',
    color: '#666',
  },
  imageBlankContainer: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  imageBlankPlaceholder: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});
