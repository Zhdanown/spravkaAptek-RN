import React from 'react';
import {View, Text, Button, FlatList, Keyboard} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import api from '../../services/api';
// import getRealm from '../../services/realm';
import {repoActions, getRealmInstance} from '../../databases/allSchemas';
import Icon from 'react-native-vector-icons/AntDesign';

const RealmTest = () => {
  const [input, setInput] = React.useState('');
  const [error, setError] = React.useState(false);
  const [repos, setRepos] = React.useState([]);
  const [isSaving, setSaving] = React.useState(false);
  const [isRefreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    async function loadRepositories() {
      let repositories = await repoActions.getAllRepositories();
      console.log('repositories', repositories);
      setRepos(repositories);
    }

    loadRepositories();

    // listen for changes in realm
    getRealmInstance().addListener('change', () => {
      loadRepositories();
    });
  }, []);

  async function saveRepository(repository) {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };
    
    await repoActions.saveRepository(data);
    
    // try {
    //   realm.write(() => {
    //     realm.create('Repository', data, 'modified');
    //   });
    // } catch (e) { console.error(e) }

    return data;
  }

  async function handleAddRepository() {
    setSaving(true)
    Keyboard.dismiss();
    try {
      var response = await api.get(`/repos/${input}`);
    } catch (e) {
      console.error(e);
    }

    console.log(response);
    saveRepository(response.data);
    setInput('');
    setError(false);
    setSaving(false)

  }

  async function handleRefresh(repository) {
    // console.log(repository);
    // const response = await api.get(`/repos/${repository.fullName}`);
    // const data = await saveRepository(response.data);
    // setRepos(repos.map(repo => (repo.id === data.id ? data : repo)));
  }

  async function handleDelete(repository) {
    setSaving(true)
    await repoActions.deleteRepository(repository.id);
    setSaving(false)
   
  }

  return (
    <View style={{flex: 1, backgroundColor: 'slateblue', padding: 10}}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          error={error}
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1,
            backgroundColor: 'white',
            marginBottom: 10,
            borderRadius: 4,
          }}
        />
        <View style={{paddingHorizontal: 10}}>
          <Button title="Add" color="orange" onPress={handleAddRepository} />
        </View>
      </View>
      <FlatList
        data={repos}
        renderItem={({item}) => (
          <RepoItem
            repo={item}
            handleRefresh={() => handleRefresh(item)}
            handleDelete={() => handleDelete(item)}
            
          />
        )}
        keyExtractor={item => item.id.toString()}
        onRefresh={() => {} }
        // refreshing={isRefreshing}
        refreshing={isSaving}
      />
    </View>
  );
};

export default RealmTest;

function RepoItem({repo, handleRefresh, handleDelete}) {
  return (
    <View
      style={{
        // height: 150,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 10,
        opacity: 0.5,
        marginBottom: 10,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{repo.name}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="delete" size={18} />
        </TouchableOpacity>
      </View>
      <Text>{repo.description}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="star" size={12} />
        <Text style={{marginRight: 10}}>{repo.stars}</Text>
        <Icon name="fork" size={12} />
        <Text>{repo.forks}</Text>
      </View>
      <Button title="Refresh" onPress={handleRefresh} color="steelblue" />
    </View>
  );
}
