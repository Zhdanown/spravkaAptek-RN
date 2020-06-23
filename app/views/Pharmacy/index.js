import React from 'react';
import {View, Text, Button, ScrollView, StyleSheet, Animated} from 'react-native';
import {useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Map from '../../components/Map';
import ItemCard from '../HomeScreen/ItemCard';
import NoContentFiller from "../../components/NoContentFiller";
import {pharmacies} from '../../assets/data';
import ImageSlider from '../../components/ImageSlider';

export default function Pharmacy({route}) {
  const {pharmacyId} = route.params;
  const pharm = pharmacies.find(pharm => pharm.id === pharmacyId)

  if (!pharm) return <NoContentFiller text="Аптека не найдена" />
  const coordinates = [+pharm.latitude, +pharm.longitude];

  const windowHeight = useWindowDimensions().height;
  const MAX_MAP_HEIGHT = windowHeight * 0.6;
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
          <Map mapHeight={mapHeight} pharmCoordinates={coordinates}/>
        </Animated.View>

        <Animated.View
          style={{
            // top: infoContentTopOffset,
            padding: 10
          }}
        >
          {/* <Button title="toggle" onPress={toggleMapHeight}/> */}

          {/* Pharmacy Info */}
          <Text style={styles.pharmacyName}>{pharm.name}</Text>
          <Text style={styles.address}>{pharm.address}</Text>
          <Text style={styles.isPharmacyOpen}>{pharm.isOpenNow}</Text>
          <Text style={styles.phone}>
            <Icon name="phone" size={15} />
            {pharm.phone}
            </Text>
          <Text style={styles.schedule}>
            <Icon name="clock-outline" size={15} />
            {pharm.schedule}
          </Text>

          
          {/* Pharmacy Images */}
          <ImageSlider />


        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
  },
  itemName: {},
  pharmacyName: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: 'steelblue',
  },
  pharmacyAddress: {
    color: '#666',
  },
  isPharmacyOpen: {},
  itemPrice: {},
  itemQuantity: {},
  itemDistance: {
    color: '#666',
  },
  highlighted: {
    color: 'steelblue',
    fontWeight: 'bold',
  },
  phone: {},
  schedule: {}
});