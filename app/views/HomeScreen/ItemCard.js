import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ItemCard = ({item, onOpen}) => {
  return (
    <TouchableOpacity onPress={onOpen}>
      <View style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.pharmacyName}>{item.pharmacy.name}</Text>
          <Text
            style={
              (styles.isPharmacyOpen,
              {color: item.pharmacy.isOpenNow ? 'green' : 'firebrick'})
            }>
            {item.pharmacy.isOpenNow ? 'Открыто' : 'Закрыто'}
          </Text>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>

        <View
          style={{flexDirection: 'row', marginVertical: 10, flexWrap: 'wrap'}}>
          {/* price, quantity, status */}
          <View style={{padding: 0}}>
            <Text style={styles.itemQuantity}>
              В наличии: <Text style={styles.highlighted}>{item.quantity}</Text>
            </Text>
            <Text style={styles.itemPrice}>
              по <Text style={styles.highlighted}>{item.price} &#8381;</Text>
            </Text>

            <Text>{item.date}</Text>
          </View>
          {/* address and distance */}
          <View style={{flex: 1, paddingLeft: 15}}>
            <Text style={styles.pharmacyAddress}>{item.pharmacy.address}</Text>
            <Text style={styles.itemDistance}>
              <Icon name="map-marker-outline" size={15} />
              {item.distance}км
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: 'steelblue'
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
});
