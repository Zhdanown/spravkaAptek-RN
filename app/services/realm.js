

// import Realm from "realm"
// import RepositorySchema from  "../databases/allSchemas";

// export default function getRealm() {
//   try {
//     return Realm.open({
//       schema: [RepositorySchema],
//     })
//   } catch (error) {
//     console.error(error)
//     return error;
//   }
  
// }

// Realm.open({schema: [RepositorySchema]}).then(realm => {
//   realm.write(() => {
//     let all = realm.objects('Repository')
//     realm.delete(all)
//   })
// })