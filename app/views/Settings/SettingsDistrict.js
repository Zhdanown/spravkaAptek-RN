import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SettingsItem from './SettingsItem';
import HelperText from './HelperText';
import { loadDistricts } from '../../modules/settings';

export default function Settingsdistrict(props) {
  const { town } = props;
  const { district, districts, setDistrict } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (town.id && !town.districtsLoaded) {
      dispatch(loadDistricts(town.id));
    }
  }, [town]);

  function filterTownsByRegion(town) {
    return town.id
      ? districts.filter(x => x.id === '' || x.town.id === town.id)
      : districts;
  }

  return (
    <SettingsItem
      title="Район"
      selectedValue={(district && district.name) || 'Не выбрано'}
      disabled={!town.id}
      onItemSelect={item => setDistrict(item)}
      options={filterTownsByRegion(town)}>
      {!town.id && <HelperText>Не выбран населённый пункт</HelperText>}
    </SettingsItem>
  );
}
