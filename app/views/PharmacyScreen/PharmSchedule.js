import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PharmSchedule({schedule, isOpenNow}) {
	return (
		<View style={[styles.justified, styles.section]}>
			<View style={{ flexDirection: 'column' }}>
				{schedule
					.split(';')
					.map(x => x.trim())
					.map((scheduleItem, index) => (
						<View key={index} style={styles.textWithIcon}>
							<MCIcon name="clock-outline" size={15} />
							<Text style={{ marginLeft: 5 }}>{scheduleItem}</Text>
						</View>
					))}
			</View>

			<Text
				style={{
					fontWeight: '900',
					color: isOpenNow ? 'green' : 'firebrick',
				}}>
				{isOpenNow ? 'Открыто' : 'Закрыто'}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    shadowOpacity: .5,
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justified: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
  },
})