import React from 'react'
import { FlatList, RefreshControl, View } from 'react-native';
import ListItem from "./ListItem";
import {COLORS} from "../../config";
import Axios from "axios";
import {API_URL} from "../../config";

export default function Category({navigation, route}) {
  const {category} = route.params;
  const [products, setProducts] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const loadData = async () => {
    setIsRefreshing(true)
    const response = await Axios.get(
      `${API_URL}drug-list/?category=${category.id}`,
    );
    setProducts(response.data.results);
    setIsRefreshing(false);
  }

  React.useEffect(() => {
    loadData();
  }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ListItem
          item={item}
          renderTitle={() => item.full_name}
          onOpen={() =>
            navigation.navigate('Product', {
              title: item.full_name,
              product: item,
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
  )
}
