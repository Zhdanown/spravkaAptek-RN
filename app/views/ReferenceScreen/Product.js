import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import Axios from 'axios';
import { connect } from 'react-redux';

import CenteredButton from '../../components/CenteredButton';
import ImageSlider from '../../components/ImageSlider';
import ImageBlank from '../../components/ImageBlank';
import { COLORS, API_URL } from '../../config';
import { searchResults } from '../../modules/search';

function Row({ label, value }) {
  return (
    <View style={[styles.row, styles.section]}>
      <Text style={styles.text}>{label}:</Text>
      <Text style={styles.bold}>{value}</Text>
    </View>
  );
}

function Product({ navigation, route, searchResults }) {
  const { product } = route.params;
  const {
    id: productId,
    country,
    drug_photos,
    name,
    full_name,
    producer,
    group,
    sub_group,
    first_package,
    dosage,
    count_in_package,
    barcode,
  } = product;

  const [manual, setManual] = React.useState(null);

  React.useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async () => {
    const response = await Axios.get(API_URL + `drug-info/${productId}/`);
    setManual(response.data.description);
  };

  const search = () => {
    navigation.navigate('Search');
    searchResults(name);
  };

  const openManual = () => {
    navigation.navigate('ProductManual', { title: full_name, manual });
  };

  return (
    <ScrollView>
      {drug_photos.length ? (
        <ImageSlider imageURLs={drug_photos.map(x => x.img)} />
      ) : (
        <ImageBlank />
      )}

      <Text
        style={{
          fontSize: 20,
          fontWeight: '900',
          margin: 10,
          textAlign: 'center',
        }}>
        {full_name}
      </Text>

      <CenteredButton
        onPress={search}
        title="Искать в аптеках"
        style={{ marginVertical: 10 }}
      />

      <View style={styles.container}>
        <Row label="Группа" value={group} />
        <Row label="Подгруппа" value={sub_group} />
        <Row label="Производитель" value={producer} />
        <Row label="Страна" value={country} />
        <Row label="Дозировка" value={dosage} />
        <Row label="Первичная упаковка" value={first_package} />
        <Row label="Количество в упаковке" value={count_in_package} />
        {barcode && <Row label="Штрих-код" value={barcode} />}
      </View>

      {manual && (
        <CenteredButton
          onPress={openManual}
          title="Инструкция"
          style={{ marginVertical: 10 }}
        />
      )}
    </ScrollView>
  );
}

export default connect(
  null,
  { searchResults },
)(Product);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  row: {
    padding: 5,
  },
  text: {
    color: COLORS.FADED,
  },
  bold: {
    color: 'black',
    fontWeight: 'bold',
  },
});
