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

import {callNumber} from '../../utils';

function PharmacyScreen({navigation, route, setSearchPharm}) {
  const {pharmacy} = route.params;

  if (!pharmacy) return <NoContentFiller text="Аптека не найдена" />;
  
  const coordinates = [+pharmacy.latitude, +pharmacy.longitude];
  const {
    name,
    short_address: address,
    is_work_now: isOpenNow,
    schedule: {name: schedule},
    contacts,
  } = pharmacy;
  
  const windowHeight = useWindowDimensions().height;
  const MAX_MAP_HEIGHT = windowHeight * 0.5;
  const MIN_MAP_HEIGHT = windowHeight * 0.3 || 200;

  const mapHeight = MAX_MAP_HEIGHT;

  // const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

  // const mapHeight = scrollY.interpolate({
  //   inputRange: [0, MAX_MAP_HEIGHT - MIN_MAP_HEIGHT, MAX_MAP_HEIGHT - MIN_MAP_HEIGHT],
  //   outputRange: [MAX_MAP_HEIGHT, MIN_MAP_HEIGHT, MIN_MAP_HEIGHT],
  //   extrapolate: 'clamp',
  // });

  // const infoContentTopOffset = scrollY.interpolate({
  //   inputRange: [0, MAX_MAP_HEIGHT - MIN_MAP_HEIGHT, MAX_MAP_HEIGHT - MIN_MAP_HEIGHT],
  //   outputRange: [MAX_MAP_HEIGHT+50, MIN_MAP_HEIGHT * 2, MIN_MAP_HEIGHT * 2],
  //   extrapolate: 'extend',
  // });

  const renderContacts = () => {
    return contacts.map(x => {
      // if not an email then it's a phone
      const isEmail = x.connection_channel.name === "Email";

      return (
        <TouchableOpacity key={x.id} onPress={() => callNumber(x.info)}>
          <View style={[styles.textWithIcon]}>
            <Icon name={isEmail ? 'email' : 'phone'} size={15} color={COLORS.PRIMARY} />
            <Text style={[styles.highlighted, {marginLeft: 5}]}>{x.info}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        // scrollEventThrottle={16}
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {y: scrollY}}}]
        // )}
      >
        {/* Map */}
        <Animated.View
          style={{
            // position: 'absolute',
            // top: 0,
            // left: 0,
            // right: 0,
            // opacity: .3,
            height: mapHeight,
            // zIndex: 2,
          }}>
          <Map mapHeight={mapHeight} pharmCoordinates={coordinates} />
        </Animated.View>

        <Animated.View
          style={{
            // top: infoContentTopOffset,
            padding: 10,
          }}>
          {/* <Button title="toggle" onPress={toggleMapHeight}/> */}

          {/* Pharmacy Info */}
          <Text style={styles.pharmacyName}>{name}</Text>

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

          {/* <Text style={styles.label}>Режим работы</Text> */}

          
          <View style={[styles.justified, styles.section]}>
            <View style={{flexDirection: 'column'}}>
              {schedule.split(';').map(x => x.trim()).map((scheduleItem, index) => (
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

          {/* <Text style={styles.label}>Контакты</Text> */}
          <View style={styles.section}>{renderContacts()}</View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              margin: 20,
            }}>
            <BorderlessButton
              onPress={() => setSearchPharm(pharmacy, navigation)}
              text="Искать в этой аптеке"
            />
          </View>

          {/* Pharmacy Images */}
          {/* <ImageSlider /> */}
          <View
            style={{
              width: '100%',
              // padding: 20,
              height: 200,
            }}>
            <Image
              source={require('../../assets/no-photo-available.png')}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
                resizeMode: 'contain',
              }}
              resizeMode="contain"
            />
          </View>
        </Animated.View>
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
  itemName: {},
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
  phone: {},
  // schedule: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
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
  label: {
    marginTop: 15,
    textAlign: 'center',
    color: '#666',
  },
});
