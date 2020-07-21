import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../config';

class ItemCard extends React.PureComponent {

  render() {
    const {
      name,
      price,
      quantity,
      distance,
      price_list: {
        pharmacy,
        pharmacy: {short_address: address, is_work_now: isOpenNow},
      },
    } = this.props.item;

    return (
      <TouchableOpacity onPress={this.props.onOpen}>
        <View style={styles.item}>
          <Text style={styles.itemName}>{name}</Text>
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
              <Icon name="map-marker-outline" size={15} />
              {}
              {distance ? distance + 'км' : 'н/д'}
            </Text>
            <Text style={styles.pharmacyAddress}>{address}</Text>
          </View>

          {/* price, quantity, status */}
          <View style={[styles.justified, styles.quantityPrice]}>
            <Text style={[styles.itemQuantity, styles.highlighted]}>
              В наличии <Text style={styles.highlighted}>{quantity}</Text> шт
            </Text>
            <Text style={[styles.itemPrice, styles.highlighted]}>
              по <Text style={styles.highlighted}>{price} &#8381;</Text>
            </Text>

          </View>
        </View>
        {/* </View> */}
      </TouchableOpacity>
    );
  }
}

export default ItemCard;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingVertical: 15,
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
  },
  isPharmacyOpen: {},
  quantityPrice: {
    marginTop: 10,
  },
  itemQuantity: {
    marginRight: 10,
  },
  itemPrice: {},
  addressDistance: {
    flexDirection: 'row',
  },
  itemDistance: {
    color: COLORS.FADED,
    marginRight: 10,
    fontWeight: 'bold',
  },
  highlighted: {
    fontWeight: 'bold',
  },
});
