import React from 'react';
import {StyleSheet, RefreshControl, FlatList} from 'react-native';
import ItemCard from './ItemCard';
import SearchHeader from "./SearchHeader"
import data from '../../assets/data';

export default function HomeScreen({navigation}) {
  const [results, setResults] = React.useState([]);
  const [isRefreshing, setRefreshing] = React.useState(true);

  const loadResults = () => {
    setResults([]);
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      setResults(data);
    }, 3000);
  };

  React.useEffect(() => {
    loadResults();
  }, []);

  return (
    <>
    <SearchHeader />
    <FlatList
      data={results}
      renderItem={({item}) => (
        <ItemCard
          item={item}
          onOpen={() =>
            navigation.navigate('Pharmacy', {pharmacyId: item.pharmacy.id})
          }
        />
      )}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl
          colors={['steelblue']}
          refreshing={isRefreshing}
          onRefresh={loadResults}
        />
      }
    />
    </>

  );
}

const styles = StyleSheet.create({});
