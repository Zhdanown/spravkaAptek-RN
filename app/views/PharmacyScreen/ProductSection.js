import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../../config';

export default function ProductSection({ product }) {
  const { drugName, country, price, quantity } = product;

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
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlighted: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
});
