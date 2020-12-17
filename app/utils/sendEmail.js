import {Linking, Alert} from 'react-native';

export const sendEmail = email => {
  
  const emailAddress = `mailto:${email}`
  
  Linking.canOpenURL(emailAddress)
    .then(supported => {
      if (!supported) {
        Alert.alert('Ошибка','Не удалось открыть ссылку');
      } else {
        return Linking.openURL(emailAddress);
      }
    })
    .catch(err => console.log(err));
};