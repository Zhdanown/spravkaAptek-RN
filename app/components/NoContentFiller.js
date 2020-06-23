import React from "react";
import { View, Text } from "react-native";

function NoContentFiller({text}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'gray'}}>{text}</Text>
    </View>
  );
}
export default NoContentFiller;