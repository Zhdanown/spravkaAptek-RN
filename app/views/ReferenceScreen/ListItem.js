import React from 'react';
import { Image } from 'react-native';
import ListItem from '../../components/ListItem';

export default function ListItemWithThumbnail({ item, onOpen, renderTitle }) {
  const { drug_photos } = item;

  const renderThumbnail = () => {
    if (!drug_photos) return null;
    else {
      const imageUrl = drug_photos.length
        ? { uri: drug_photos[0].img }
        : require('../../assets/no-photo-available.png');
      return (
        <Image
          style={{
            width: 70,
            height: 35,
            marginRight: 10,
          }}
          source={imageUrl}
          // defaultSource={require('../../assets/no-photo-available.png')}
          resizeMode="cover"
        />
      );
    }
  };

  return (
    <ListItem
      item={item}
      onOpen={onOpen}
      renderTitle={renderTitle}
      renderThumbnail={renderThumbnail}
    />
  );
}
