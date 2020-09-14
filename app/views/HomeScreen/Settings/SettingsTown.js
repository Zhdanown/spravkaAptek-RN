import React from 'react';

import SettingsItem from './SettingsItem';
import HelperText from './HelperText';

export default function SettingsTown(props) {
  const { region } = props;
  const { town, towns, setTown } = props;

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
      options={filterTownsByRegion(region)}
      >
      {!region && <HelperText>Не выбран регион</HelperText>}
    </SettingsItem>
  );
}
