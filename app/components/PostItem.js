import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from "../config";

const PostItem = ({navigate, post, user}) => {
  return (
    <TouchableOpacity onPress={() => navigate('Post', {post, user})}>
      <View style={styles.item} >
        {user && <Text style={styles.user}>{user.username}</Text>}
        <Text style={styles.title}>{post.title}</Text>
        <Text>{post.body.slice(0, 100) + '...'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderTopColor: COLORS.PRIMARY,
    borderTopWidth: 3
  },
  user: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
