import React from 'react';
import {View, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import IconButton from '../../components/IconButton';

const INPUT_OFFSET = 50;
const FILTER_OFFSET = 50;
const SPEED = 400;

const SearchHeader = () => {
  const navigation = useNavigation();

  const [loaded, setLoaded] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  

  const updateSearchResults = value => {
    setSearchValue(value);
    console.log(value)
  };

  const [inputOffset] = React.useState(new Animated.Value(0));
  const [filterOffset] = React.useState(new Animated.Value(-FILTER_OFFSET));

  React.useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 3000)
   
  }, []);


  React.useEffect(() => {
    if (loaded) inputMargin('collapse');
    else inputMargin('expand');
  }, [loaded]);

  const inputMargin = (type) => {
    // TODO must depend on results count
    if (type == 'collapse') {

      Animated.timing(inputOffset, {
        toValue: INPUT_OFFSET,
        duration: SPEED,
      }).start();
      Animated.timing(filterOffset, {
        toValue: 0,
        duration: SPEED,
      }).start();

    } else {
      Animated.timing(inputOffset, {
        toValue: 0,
        duration: SPEED,
      }).start();
      Animated.timing(filterOffset, {
        toValue: -FILTER_OFFSET,
        duration: SPEED,
      }).start();
    }
  };

  function FilterButton() {
    Animated.createAnimatedComponent(

    )
    return (
        <Animated.View style={{
          position: 'absolute',
          right: filterOffset,
          top: 0,
          padding: 16,
          // padding: 12, 
          // backgroundColor: 'white', 
          // paddingVertical: 17
        }}>

          <IconButton
            onPress={() => navigation.navigate('Filter')}
            >
            <Icon name="filter" size={30} />
          </IconButton>
        </Animated.View>

    );
  }

  return (
    <View style={{marginBottom: 10, flexDirection: 'row', backgroundColor: 'white', marginTop: -0}}>
      <Animated.View style={{flex: 1, marginRight: inputOffset}}>
        <SearchBar
          value={searchValue}
          onChangeText={updateSearchResults}
          platform="default"
          lightTheme={true}
          // showLoading={true}
          // inputStyle={{backgroundColor: 'red'}}
          containerStyle={{
            // padding: 9,
            backgroundColor: 'white',
            borderBottomWidth: 0,
            borderTopWidth: 0,
          }}
          inputContainerStyle={{
            // height: 40,
            // paddingTop: 3,
            backgroundColor: 'rgba(32,100,220,.2)',
          }}
        />
      </Animated.View>

      <FilterButton navigation={navigation} />
    </View>
  );
};

export default SearchHeader;
