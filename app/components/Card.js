import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Card({ children, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
});
