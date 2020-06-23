import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import Picker from '../../components/Picker';
import Slider from '@react-native-community/slider';

// function

const FilterScreen = () => {
  const [value, onChangeText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [range, setRange] = useState(9)  
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const scheduleOptions = [
    {label: 'Круглосуточная', value: 1},
    {label: 'C 8:00 до 20:00', value: 2},
  ];

  const districts = [
    {label: 'Не выбрано', value: 0},
    {label: 'Волокно', value: 1},
    {label: 'Железнодорожный', value: 2},
    {label: 'КЗТЗ', value: 3},
    {label: 'Северный', value: 4},
    {label: 'Северо-западный', value: 5},
    {label: 'Сеймский округ', value: 6},
    {label: 'СХА', value: 7},
    {label: 'Центральный округ', value: 8},
  ];

  const rangeOptions = [
    {label: 'Не выбрано', value: 0},
    {label: 'В радиусе 1км', value: 1},
    {label: 'В радиусе 2км', value: 2},
    {label: 'В радиусе 5км', value: 5},
    {label: 'В радиусе 10км', value: 10},
  ];

  const onScheduleChange = schedule => {
    console.log(schedule);
  };
  const onDistrictChange = district => {
    console.log(district);
  };
  const onRangeChange = range => {
    console.log(range);
  };

  const onSliderRangeChange = range => {
    value => console.log(range)
    setRange(range)

  }

  return (
      <View style={styles.container}>
        {/* Filter items */}
        <ScrollView style={styles.items}>
          {/* Boolean */}
          <View style={styles.item}>
            <Text style={styles.itemLabel}>Отображать закрытые последними</Text>
            <Switch
              trackColor={{false: '#aaa', true: '#fff'}}
              thumbColor={isEnabled ? 'steelblue' : '#ccc'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.itemLabel}>Режим работы</Text>
            <Picker options={scheduleOptions} onChange={onScheduleChange} />
          </View>

          <View style={styles.item}>
            <Text style={styles.itemLabel}>Район</Text>
            <Picker options={districts} onChange={onDistrictChange} />
          </View>

          <View style={styles.item}>
            <Text style={styles.itemLabel}>Расстояние</Text>
            <Picker options={rangeOptions} onChange={onRangeChange} />
          </View>
         

          <View style={styles.item}>
            <Text style={styles.itemLabel}>Расстояние</Text>
            <Text style={{ color: '#666'}}>
              {range == 30 ? 'Не важно' : range + 'км'}
              </Text>
            <Slider 
              value={range}
              onValueChange={onSliderRangeChange}
              // onSlidingComplete={onRangeSet}
              style={{width: 150, height: 40}}
              minimumValue={1}
              maximumValue={30}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="steelblue"
            />
          </View>
        </ScrollView>

        {/* "Apply filters" button */}
        <View style={{padding: 10, backgroundColor: 'none'}}>
          <Button
            // onPress={onPressLearnMore}
            title={"Применить" + ` (${2})`}
            color="steelblue"
            accessibilityLabel="Применить выбранные фильтры"
          />
        </View>
      </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    // marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#dedede',
    borderColor: '#dedede',
    borderBottomWidth: 1,

    // backgroundColor: '#fff',
  },
  itemLabel: {
    color: '#666',
  },
  itemValue: {
    color: 'steelblue'
  },
  
});
