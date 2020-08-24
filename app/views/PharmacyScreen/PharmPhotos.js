import React from 'react'
import ImageSlider from '../../components/ImageSlider';
import ImageBlank from "../../components/ImageBlank";

export default function PharmPhotos({pharmacyPhotos}) {
  if (pharmacyPhotos.length) return (
    <ImageSlider imageURLs={pharmacyPhotos.map(photo => photo.img)}/>
  ) 
  return <ImageBlank/>
}
