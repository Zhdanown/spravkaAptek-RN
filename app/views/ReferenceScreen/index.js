import React from 'react';
import {View, Text, RefreshControl, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {referenceData} from '../../assets/data';
import {COLORS} from '../../config';

const ReferenceScreen = () => {
  const [data, setData] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const loadData = () => {
    setData([]);
    setIsRefreshing(true);

    setTimeout(() => {
      setData(referenceData);
      setIsRefreshing(false);
    }, 0);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item item={item} />}
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

function Item({item}) {
  const {name, group, subgroup, country} = item;

  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <Text>{name}</Text>
      <Text>
        Группа: <Text style={styles.highlighted}>{group}</Text>
      </Text>
      {subgroup && (
        <Text>
          Подгруппа: <Text style={styles.highlighted}>{subgroup}</Text>
        </Text>
      )}
      <Text>
        Страна: <Text style={styles.highlighted}>{country}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  highlighted: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
});

export default ReferenceScreen;
