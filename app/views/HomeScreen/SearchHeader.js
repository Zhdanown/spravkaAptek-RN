import React from 'react';
import {connect} from 'react-redux';
import {
  clearSearchPharm,
  searchResults,
  multiSearch,
} from '../../modules/search';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import IconButton from '../../components/IconButton';
import SelectedPharmSearch from './SelectedPharmSearch';
import {COLORS} from '../../config';

const SearchHeader = ({
  selectedPharm,
  clearSearchPharm,
  multiSearch,
  searchedValue,
  searchResults
}) => {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = React.useState('');
  
  // search submitted value
  const onInputSubmit = () => {
    searchResults(inputValue);
    hideDropdown();
  }
  
  // fill search input with selected value
  React.useEffect(() => {
    setInputValue(searchedValue);
  }, [searchedValue])

  // update input value when typing
  const onInputValueChange = value => {
    setInputValue(value);
    multiSearch(value)
  }
  
  // update dropdown list when input is getting focus
  const onInputFocus = () => {
    if (inputValue && inputValue.length > 2) multiSearch(inputValue)
    // TODO add prop 'visible' to dropdown instead of clearing values
  }

  const hideDropdown = () => {
    multiSearch('')
  }

  function FilterButton() {
    return (
      <View
        style={{
          paddingVertical: 18,
          paddingHorizontal: 16,
        }}>
        <IconButton onPress={() => navigation.navigate('Filter')}>
          <Icon name="filter-variant" size={30} color="white" />
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
      <View style={{flexDirection: 'row'}}>
        <SearchBar
          value={inputValue}
          onSubmitEditing={onInputSubmit}
          onChangeText={onInputValueChange}
          onBlur={hideDropdown}
          onFocus={onInputFocus}
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
            borderRadius: 8,
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
    searchedValue: state.search.value
  };
}

export default connect(
  mapStateToProps,
  {clearSearchPharm, searchResults, multiSearch},
)(SearchHeader);
