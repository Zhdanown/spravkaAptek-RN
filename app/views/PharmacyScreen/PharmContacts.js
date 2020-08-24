import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {callNumber, sendEmail} from '../../utils';

import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../../config";


export default function PharmContacts({contacts}) {
    return (
        <View style={styles.section}>
        {contacts.map(x => {
          // if not an email then it's a phone
          const isEmail = x.connection_channel.name === 'Email';

          return (
            <TouchableOpacity
              key={x.id}
              onPress={() =>
                isEmail ? sendEmail(x.info) : callNumber(x.info)
              }>
              <View style={[styles.textWithIcon]}>
                <MCIcon
                  name={isEmail ? 'email' : 'phone'}
                  size={15}
                  color={COLORS.PRIMARY}
                />
                <Text style={[styles.highlighted, {marginLeft: 5}]}>
                  {x.info}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
      highlighted: {
        color: COLORS.PRIMARY,
        fontWeight: 'bold',
      },
})