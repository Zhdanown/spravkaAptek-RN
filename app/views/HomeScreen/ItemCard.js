import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../config';
import { formatDate, calculateDistance } from "../../utils";

const withLocation = Component => {
  return props => {
    const {price_list: {pharmacy: {latitude, longitude}}} = props.item;
    const {location} = props;
    const distance = location ? calculateDistance(location, {latitude, longitude}) : null
    return <Component {...props} distance={distance}/>
  }
}
class ItemCard extends React.PureComponent {
  renderLocation() {
    const { distance, location, isTrackingLocation } = this.props;
    const iconName = location ? (distance && "location-on") : (isTrackingLocation ? "loop" : "location-off");
    const text = location ? (distance && `${distance} м`) : (!isTrackingLocation && 'н/д' );
    return (
      <Text style={{color: COLORS.FADED}}>
        {<MIcon name={iconName} size={15}/>}
        {text}
      </Text>
    )
  }

  render() {
    const {
      name,
      country,
      price,
      quantity,
      add_date,
      price_list: {
        pharmacy,
        pharmacy: {
          short_address: address, 
          is_work_now: isOpenNow,
        },
      },
    } = this.props.item;
    const added = formatDate(add_date);

    return (
      <TouchableOpacity onPress={this.props.onOpen}>
        <View style={styles.item}>
          <Text style={styles.itemName}>{name + ` (${country})`}</Text>
          <View style={styles.justified}>
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            <Text
              style={
                (styles.isPharmacyOpen,
                {color: isOpenNow ? 'green' : 'firebrick'})
              }>
              {isOpenNow ? 'Открыто' : 'Закрыто'}
            </Text>
          </View>

          {/* address and distance */}
          <View style={styles.addressDistance}>
            <Text style={styles.itemDistance}>
              {this.renderLocation()}
            </Text>
            <Text style={styles.pharmacyAddress}>{address}</Text>
          </View>

            <Text style={styles.addDate}>{added}</Text>

          {/* price, quantity, status */}
          <View style={[styles.justified, styles.quantityPrice]}>
            <Text style={[styles.itemQuantity, styles.bold]}>
              В наличии: <Text style={styles.bold}>{quantity}</Text>
            </Text>
            <Text style={[styles.itemPrice, styles.bold]}>
              по <Text style={styles.bold}>{price} &#8381;</Text>
            </Text>

          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withLocation(ItemCard);

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingVertical: 15,
    margin: 8,
    borderRadius: 8,
    backgroundColor: 'white', 
    // elevation: 1
  },
  justified: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  pharmacyName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.FADED,
  },
  pharmacyAddress: {
    color: COLORS.FADED,
    flex: 1,
  },
  isPharmacyOpen: {},
  quantityPrice: {
    marginTop: 10,
  },
  itemQuantity: {
    marginRight: 10,
  },
  addDate: {
    color: '#999'
  },
  addressDistance: {
    flexDirection: 'row',
  },
  itemDistance: {
    color: COLORS.FADED,
    marginRight: 10,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
