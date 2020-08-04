import React from 'react';
import {RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ListItem from './ListItem';
import {COLORS} from '../../config';
import Axios from 'axios';

const GroupList = ({navigation}) => {
  const [groups, setGroups] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const loadData = async () => {
    setGroups([]);
    setIsRefreshing(true);

    const response = await Axios.get(
      'https://spravkaaptek.ru/api/drug-categories/',
    );
    setGroups(response.data);
    setIsRefreshing(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <FlatList
      data={groups}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ListItem
          item={item}
          onOpen={() =>
            navigation.navigate('Group', {
              title: item.name,
              group: item,
            })
          }
        />
      )}
      refreshControl={
        <RefreshControl
          colors={[COLORS.PRIMARY]}
          refreshing={isRefreshing}
          onRefresh={loadData}
        />
      }
    />
  );
};

export default GroupList;
