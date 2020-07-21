import React from "react";
import { View, Text } from "react-native";

function NoContentFiller({text, children}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'gray', textAlign: 'center'}}>{text}</Text>
    </View>
  );
}
export default NoContentFiller;