import React from 'react';
import {connect} from 'react-redux';
import {clearSearchPharm, searchResults} from '../../modules/search';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import IconButton from '../../components/IconButton';
import SelectedPharmSearch from './SelectedPharmSearch';
import { COLORS } from '../../config';

const SearchHeader = ({selectedPharm, clearSearchPharm, searchResults}) => {
  const navigation = useNavigation();

  const [searchValue, setSearchValue] = React.useState('');

  const updateSearchResults = () => {
    if (searchValue.length > 2) {
      searchResults(searchValue)
    }
  };

  function FilterButton() {
    return (
      <View
        style={{
          paddingVertical: 18,
          paddingHorizontal: 16
        }}>
        <IconButton onPress={() => navigation.navigate('Filter')}>
          <Icon name="filter-variant" size={30} color='white' />
        </IconButton>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.PRIMARY,
        marginTop: -0,
      }}>
      <View style={{ flexDirection: 'row' }}>
      
        <SearchBar
          value={searchValue}
          onSubmitEditing={updateSearchResults}
          onChangeText={setSearchValue}
          placeholder="мин. 3 символа"
          platform="default"
          lightTheme={true}
          containerStyle={{
            flex: 1,
            padding: 10,
            paddingRight: 0,
            backgroundColor: COLORS.PRIMARY,
            borderBottomWidth: 0,
            borderTopWidth: 0,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderRadius: 8
          }}
        />
        <FilterButton navigation={navigation} />
      </View>

      {selectedPharm && (
        <SelectedPharmSearch
          pharm={selectedPharm}
          clearPharm={clearSearchPharm}
        />
      )}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    selectedPharm: state.search.selectedPharm,
    fetchedItems: state.search.fetchedItems,
  };
}

export default connect(
  mapStateToProps,
  {clearSearchPharm, searchResults},
)(SearchHeader);
