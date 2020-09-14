import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import SettingsItem from './SettingsItem';
import { loadRegions, loadTowns } from '../../../modules/settings';

export default function SettingsRegion(props) {
  const { region, regions, setRegion } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!regions.length) dispatch(loadRegions());
  }, [regions]);

  useEffect(() => {
    if (region && !region.townsLoaded) dispatch(loadTowns(region.id));
  }, [region]);

  return (
    <SettingsItem
      title="Регион"
      selectedValue={(region && region.name) || 'Не выбрано'}
      onItemSelect={item => setRegion(item)}
      options={regions}
    />
  );
}
