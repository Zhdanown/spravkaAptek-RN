import { Alert } from 'react-native';

import { isSettingsDiffer } from '../../modules/settings/isSettingsDiffer';

export default (navigation, region, town, order, range) =>
  navigation.addListener('beforeRemove', e => {
    const settingsHasChanged = isSettingsDiffer(region, town, order, range);
    if (e.data.action.type === 'POP_TO_TOP' || !settingsHasChanged) return;

    e.preventDefault();

    Alert.alert(
      'Несохранённые изменения',
      'Несохранённые изменения будут потеряны. Закрыть окно настроек?',
      [
        { text: 'Отмена', style: 'cancel', onPress: () => {} },
        {
          text: 'Закрыть',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ],
    );
  });
