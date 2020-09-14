import React from 'react';

import { useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SettingsItem from './SettingsItem';
import HelperText from './HelperText';
import { COLORS } from '../../../config';

const rangeValues = [0, 1, 2, 3, 5, 8, 13, 21, 33, 54];

export default function SettingsRange(props) {
  const { range, setRange } = props;

  const location = useSelector(state => state.location.location);
  const isLocating = useSelector(state => state.location.isTrackingLocation);

  const onRangeChange = value => {
    setRange(rangeValues[value]);
  };

  return (
    <SettingsItem
      title="Радиус поиска"
      selectedValue={location ? range + 'км' || 'Не важно' : 'Не доступно'}>
      {location ? (
        <Slider
          style={{ marginTop: 10 }}
          value={rangeValues.indexOf(range)}
          onValueChange={onRangeChange}
          minimumValue={0}
          maximumValue={rangeValues.length - 1}
          step={1}
          minimumTrackTintColor="#ddd"
          maximumTrackTintColor={COLORS.FADED}
          thumbTintColor={COLORS.PRIMARY}
        />
      ) : (
        <HelperText>
          <Icon name="location-off" size={15} />
          {isLocating
            ? 'Определяем местоположение'
            : 'Местоположение не определено'}
        </HelperText>
      )}
    </SettingsItem>
  );
}
