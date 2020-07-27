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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Map from '../../components/Map';
import NoContentFiller from '../../components/NoContentFiller';
import ImageSlider from '../../components/ImageSlider';

import {COLORS} from '../../config';
import BorderlessButton from '../../components/BorderlessButton';

import {callNumber, sendEmail} from '../../utils';

function PharmacyScreen({navigation, route, setSearchPharm}) {
  const {pharmacy, drug} = route.params;

  if (!pharmacy) return <NoContentFiller text="Аптека не найдена" />;

  const coordinates = [+pharmacy.latitude, +pharmacy.longitude];
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
          <Text style={styles.bold}>В наличии {quantity} ед</Text>
          <Text style={styles.bold}>по {price} &#8381;</Text>
        </View>
      </View>
    );
  };

  const renderLocation = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.address}>{address}</Text>
        <View
          style={[
            styles.textWithIcon,
            {marginTop: 10, justifyContent: 'flex-end'},
          ]}>
          <Icon name="clock-outline" size={15} color="#666" />
          <Text style={{marginLeft: 5, color: '#666'}}>
            Местоположение не определено
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
                <Icon name="clock-outline" size={15} />
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
                <Icon
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
      <View
        style={styles.imageBlankContainer}>
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
          <Map mapHeight={mapHeight} pharmCoordinates={coordinates} />
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

export default connect(
  null,
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
