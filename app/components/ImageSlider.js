import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';

export default function ImageSlider() {
  const [images, setImages] = React.useState([
    'https://source.unsplash.com/320x480/?medicine',
    'https://source.unsplash.com/200x480/?medicine',
    'https://source.unsplash.com/320x480/?medicine',
    'https://source.unsplash.com/320x480/?medicine', // Network image
    // require('./assets/images/girl.jpg'),          // Local image
  ]);

  return <SliderBox images={images} dotColor="steelblue" imageLoadingColor="steelblue"/>;
}
