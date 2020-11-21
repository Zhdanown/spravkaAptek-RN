import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

export default function ProductManual({route}) {
  const {manual} = route.params;
  return (
    <WebView
      originWhitelist={['*']}
      source={{html: manual}}
      scalesPageToFit={false}
    />
  );
}
