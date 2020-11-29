import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SettingsItem from './SettingsItem';
import HelperText from './HelperText';
import { loadTowns } from '../../modules/settings';

export default function SettingsTown(props) {
  const { region } = props;
  const { town, towns, setTown } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (region && !region.townsLoaded) {
      dispatch(loadTowns(region.id));
    }
  }, [region]);

  function filterTownsByRegion(region) {
    return region
      ? towns.filter(x => x.region === region.id || x.id === '')
      : towns;
  }

  return (
    <SettingsItem
      title="Населенный пункт"
      selectedValue={(town && town.name) || 'Не выбрано'}
      disabled={!region}
      onItemSelect={item => setTown(item)}
      options={filterTownsByRegion(region)}>
      {!region && <HelperText>Не выбран регион</HelperText>}
    </SettingsItem>
  );
}
