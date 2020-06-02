import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Post = ({route, navigation}) => {
  const {isModalVisible, setModalVisible} = useState(false);

  const {user, post} = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.user}
        onPress={() => console.log('open modal')}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  body: {
    textAlign: 'justify',
    lineHeight: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
