import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {COLORS} from "../config"

export default function ImageSlider({imageURLs}) {
  const [images, setImages] = React.useState(imageURLs);

  return <SliderBox images={images} dotColor={COLORS.PRIMARY} imageLoadingColor={COLORS.PRIMARY}/>;
}
