import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from '../../components/Card';
import PharmContent from '../PharmaciesScreen/PharmContent';
import { formatDate, calculateDistance } from '../../utils';

class ItemCard extends React.PureComponent {
  render() {
    const { distance, location, isTrackingLocation } = this.props;
    const { pharmacy } = this.props.item.price_list;
    const { short_address: address, is_work_now: isOpenNow } = pharmacy;

    const pharmProps = {
      distance,
      pharmacy,
      address,
      isOpenNow,
      location,
      isTrackingLocation,
    };

    return (
      <Card onPress={this.props.onOpen}>
        <ItemContent
          {...this.props.item}
          render={() => <PharmContent {...pharmProps} />}
        />
      </Card>
    );
  }
}

export default withDistance(ItemCard);

function withDistance(Component) {
  return props => {
    const {
      price_list: {
        pharmacy: { latitude, longitude },
      },
    } = props.item;
    const { location } = props;
    const distance = location
      ? calculateDistance(location, { latitude, longitude })
      : null;
    return <Component {...props} distance={distance} />;
  };
}

function ItemContent(props) {
  const { name, add_date, country, quantity, price } = props;
  const added = formatDate(add_date);

  return (
    <>
      <Text style={styles.itemName}>{name + ` (${country})`}</Text>
      {props.render()}
      <Text style={styles.addDate}>{added}</Text>
      <View style={[styles.justified, styles.quantityPrice]}>
        <Text style={[styles.itemQuantity, styles.bold]}>
          В наличии: <Text style={styles.bold}>{quantity.toFixed(2)}</Text>
        </Text>
        <Text style={[styles.itemPrice, styles.bold]}>
          по <Text style={styles.bold}>{price} &#8381;</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  quantityPrice: {
    marginTop: 10,
  },
  itemQuantity: {
    marginRight: 10,
  },
  addDate: {
    color: '#999',
  },
  bold: {
    fontWeight: 'bold',
  },
});
