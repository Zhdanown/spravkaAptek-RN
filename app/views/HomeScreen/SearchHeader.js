import React from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Dropdown from './Dropdown';
import SelectedPharmSearch from './SelectedPharmSearch';
import IconButton from '../../components/IconButton';
import { COLORS } from '../../config';
import * as actions from '../../modules/search';

const SearchHeader = props => {
  const { selectedPharm, clearSearchPharm } = props;
  const { searchedValue, searchResults } = props;
  const { loadSuggestions, suggestions, isLoadingSuggestions } = props;

  const navigation = useNavigation();

  const [inputValue, setInputValue] = React.useState('');
  const [searchbarHasFocus, toggleSearchbarFocus] = React.useState(false);

  // search submitted value
  const onInputSubmit = () => {
    searchResults(inputValue);
    hideDropdown();
  };

  // fill search input with selected value
  React.useEffect(() => {
    setInputValue(searchedValue);
  }, [searchedValue]);

  // update input value when typing
  const onInputValueChange = value => {
    setInputValue(value);
    loadSuggestions(value);
  };

  // update dropdown list when input is getting focus
  const onInputFocus = () => {
    toggleSearchbarFocus(true);
    if (inputValue && inputValue.length > 2) loadSuggestions(inputValue);
    // TODO add prop 'visible' to dropdown instead of clearing values
  };

  const onInputBlur = () => {
    toggleSearchbarFocus(false);
    hideDropdown();
  };

  const hideDropdown = () => {
    loadSuggestions('');
  };

  function FilterButton() {
    return (
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}>
        <IconButton onPress={() => navigation.navigate('Settings')}>
          <Icon name="filter-variant" size={30} color={COLORS.PRIMARY} />
        </IconButton>
      </View>
    );
  }

  return (
    <View
      style={{
        position: 'absolute',
        left: 8,
        right: 8,
        top: 8,
        borderColor: COLORS.PRIMARY,
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 8,
        }}>
        <SearchBar
          value={inputValue}
          onSubmitEditing={onInputSubmit}
          onChangeText={onInputValueChange}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          placeholder="мин. 3 символа"
          platform="default"
          lightTheme={true}
          showLoading={isLoadingSuggestions}
          containerStyle={{
            flex: 1,
            borderRadius: 8,
            padding: 0,
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

      {/* show selected pharm only when input in focus */}
      {selectedPharm && searchbarHasFocus && (
        <SelectedPharmSearch
          pharm={selectedPharm}
          clearPharm={clearSearchPharm}
        />
      )}

      <Dropdown options={suggestions} />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    ...state.search,
    searchedValue: state.search.value,
  };
}

export default connect(
  mapStateToProps,
  { ...actions },
)(SearchHeader);
