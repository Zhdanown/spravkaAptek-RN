import {Linking, Alert } from 'react-native';

export const callNumber = phone => {
  console.log(phone)
  const phoneNumber = `tel:${phone}`
  console.log(phoneNumber)
  
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};
