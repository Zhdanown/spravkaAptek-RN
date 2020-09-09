import React from "react";
import { Text } from "react-native";

import {COLORS } from "../../../config";

export default HelperText = ({ children }) => (
  <Text
    style={{
      textAlign: 'center',
      marginTop: 15,
      color: COLORS.DANGER,
    }}>
    {children}
  </Text>
);