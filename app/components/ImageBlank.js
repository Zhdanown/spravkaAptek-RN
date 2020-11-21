import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function ImageBlank() {
  return (
    <View style={styles.imageBlankContainer}>
      <Image
        style={styles.imageBlankPlaceholder}
        source={require('../assets/no-photo-available.png')}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
