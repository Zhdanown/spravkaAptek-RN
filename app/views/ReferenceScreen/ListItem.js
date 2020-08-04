import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../../config';

export default function ListItem({item, onOpen, renderTitle}) {
  const {drug_photos} = item;
  console.log(drug_photos);

  const renderThumbnail = () => {
    if (!drug_photos) return null;
    else {
      const imageUrl = drug_photos.length ? { uri: drug_photos[0].img} : require('../../assets/no-photo-available.png');
      return (
        <Image
          style={{
            width: 70,
            height: 35,
            marginRight: 10,
            // resizeMode: 'contain',
          }}
          source={imageUrl}
          // defaultSource={require('../../assets/no-photo-available.png')}
          resizeMode="cover"
        />
      );
    }
  };

  return (
    <TouchableOpacity onPress={onOpen}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}>
        {renderThumbnail()}
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: 'bold',
            paddingVertical: 15,
            color: COLORS.PRIMARY,
          }}>
          {renderTitle ? renderTitle() : item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
