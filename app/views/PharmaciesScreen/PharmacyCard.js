import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../config';
import { calculateDistance } from '../../utils';

class PharmacyCard extends React.PureComponent {
  renderLocation() {
    const { distance, location, isTrackingLocation } = this.props;
    const iconName = () => {
      if (location) return 'location-on';
      else if (isTrackingLocation) return 'loop';
      else return 'location-off';
    };
    const text = location ? `${distance} км` : !isTrackingLocation && 'н/д';
    return (
      <Text style={{ color: COLORS.FADED }}>
        {<MIcon name={iconName()} size={15} />}
        {text}
      </Text>
    );
  }

  render() {
    // console.log('     ')
    // for (var key in this.props.item) {
    //   console.log(key, this.props.item[key])
    // }
    const pharmacy = this.props.item;
    const { address, is_work_now: isOpenNow } = this.props.item;

    return (
      <TouchableOpacity onPress={this.props.onOpen}>
        <View style={styles.item}>
          <View style={styles.justified}>
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            <Text
              style={
                (styles.isPharmacyOpen,
                { color: isOpenNow ? 'green' : 'firebrick' })
              }>
              {isOpenNow ? 'Открыто' : 'Закрыто'}
            </Text>
          </View>
          {/* address and distance */}
          <View style={styles.addressDistance}>
            <Text style={styles.itemDistance}>{this.renderLocation()}</Text>
            <Text style={styles.pharmacyAddress}>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withDistance(PharmacyCard);

function withDistance(Component) {
  return props => {
    const { latitude, longitude } = props.item;
    const { location } = props;
    const distance = location
      ? calculateDistance(location, { latitude, longitude })
      : null;
    return <Component {...props} distance={distance} />;
  };
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingVertical: 15,
    margin: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#ccc',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  justified: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
