import {Linking, Alert} from 'react-native';

export const callNumber = phone => {
  const phoneNumber = `tel:${phone}`
  
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
