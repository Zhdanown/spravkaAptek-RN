import Realm from "realm";

// Schema
class RepositorySchema {
  static schema = {
    name: "Repository",
    primaryKey: "id",
    properties: {
      id: {type: 'int', indexed: true},
      name: 'string',
      fullName: 'string',
      description: 'string',
      stars: 'int',
      forks: 'int'
    }
  }
}

// Realm instance
let realmInstance = new Realm({
  schema: [RepositorySchema],
});

export const getRealmInstance = () => realmInstance;


const createdRepoActions = realm => {
  return {

    /** return all repositories */
    getAllRepositories: () => {
      let repos = realm.objects("Repository").sorted('stars', true);
      return repos;
    },

    /** save repository 
     * @param repoToSave
    */
    saveRepository: repoToSave => {
      return new Promise((resolve, reject) => {
        try {
          realm.write(() => {
            let savedRepo = realm.create('Repository', repoToSave, 'modified');
            resolve(savedRepo)
          });
        } catch (e) {
          reject(e)
        }
      })
    },
    
    /** delete repository
     * @param repoId
     */
    deleteRepository: repoId => {
      return new Promise ((resolve, reject) => {
        try {
          realm.write(() => {
            let repoToDelete = realm.objectForPrimaryKey("Repository", repoId)
            realm.delete(repoToDelete);
            resolve();
          })
        } catch(e) {
          reject(e)
        }
      })
    }
  }
}

export const repoActions = createdRepoActions(realmInstance)

// // exported methods
// let repoService = {
//   getAllRepositories: () => {

//     return repoRealm.objects("Repository").sorted('stars', true);
//   },
//   saveRepository: repoToSave => {
//     repoRealm.write(() => {
//       repoRealm.create('Repository', repoToSave, 'modified');
//     });
//   },
// }

// export default repoService;


// getRealm() {
//   try {
//     return Realm.open({
//       schema: [RepositorySchema],
//     })
//   } catch (error) {
//     console.error(error)
//     return error;
//   }
  
// }

// import Realm from 'realm';

// class Todo extends Realm.Object {}
// Todo.schema = {
//     name: 'Todo',
//     properties: {
//         done: {type: 'bool', default: false},
//         text: 'string',
//     },
// };

// export default new Realm({schema: [Todo]});

// import Realm from 'realm';
// // import data from '../assets/data';
// const TODOLIST_SCHEMA = 'TodoList';
// const TODO_SCHEMA = 'Todo';

// // defining models
// export const TodoSchema = {
//   name: TODO_SCHEMA,
//   primaryKey: 'id',
//   properties: {
//     id: 'int', // PK
//     name: {type: 'string', indexed: true},
//     done: {type: 'bool', default: false},
//   },
// };

// export const TodoListSchema = {
//   name: TODOLIST_SCHEMA,
//   primaryKey: 'id',
//   properties: {
//     id: 'int', // PK
//     name: 'string',
//     creationDate: 'date',
//     todos: {type: 'list', objectType: TODO_SCHEMA},
//   },
// };

// const databaseOptions = {
//   path: 'todoListApp.realm',
//   schema: [TodoListSchema, TodoSchema],
//   schemaVersion: 0, //optional
// };
// // todolist functions
// export const insertNewTodoList = newTodoList =>

//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           console.log(newTodoList)
//           realm.create(TODOLIST_SCHEMA, newTodoList);
//           resolve(newTodoList);
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const updateTodoList = todoList =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           let updatingTodoList = realm.objectForPrimaryKey(
//             TODOLIST_SCHEMA,
//             todoList.id,
//           );
//           updatingTodoList.name - todoList.name;
//           resolve(updatingTodoList);
//         });
//       })
//       .catch(error => reject.error);
//   });

// export const deleteTodoList = todoListId =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           let deletingTodoList = realm.objectForPrimaryKey(
//             TODOLIST_SCHEMA,
//             todoListId,
//           );
//           realm.delete(deletingTodoList);
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const deleteAllTodoLists = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           let allTodoLists = realm.objects(TODOLIST_SCHEMA);
//           realm.delete(allTodoLists);
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const queryAllTodoLists = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         let allTodoLists = realm.objects(TODOLIST_SCHEMA);
//         resolve(allTodoLists);
//       })
//       .catch(error => reject(error));
//   });

// export default new Realm(databaseOptions);

// // insertNewTodoList({
// //   id: 7, // PK
// //   name: 'High Priority',
// //   creationDate: new Date(),
// //   todos: [
// //     {
// //       id: 102, // PK
// //       name: 'learn realm 2',
// //     },
// //     {
// //       id: 103, // PK
// //       name: 'move on',
// //     },
// //     {
// //       id: 104, // PK
// //       name: 'die',
// //     },
// //     {
// //       id: 105, // PK
// //       name: 'repeat',
// //     }
// //   ]
// // })

// // let todos = queryAllTodoLists()
// // console.log(' todos',todos)
