import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
// import ItemCard from '../HomeScreen/ItemCard';

const data = [
  {
    id: '1',
    name:
      'Аспирин кардио, таб. п/об. р-р/кишечн. 300мг №20 (Bayer Pharma AG/Германия/Bayer Bitterfield/Германия)',
    quantity: 13,
    price: 76,
    pharmacy: {
      id: 1,
      name: "Аптека 'Таблеточка'",
      address: 'Курск, Центральный округ, ул. Садовая 10',
      isOpenNow: true,
    },
    distance: 3.4,
    date: '5 мин. назад',
  },
  {
    id: '2',
    name:
      'Аспирин кардио, таб. п/об. р-р/кишечн. 100мг №28 (Bayer Healthcare /Bayer Bitterfield Gmbh)',
    quantity: 4,
    price: 129.14,
    pharmacy: {
      id: 1,
      name: 'Аптека М+ ',
      address: 'Курск, СХА, Пр-т Победы 14',
      isOpenNow: false,
    },
    distance: 4.6,
    date: '2 д. назад',
  },
  {
    id: '3',
    name:
      'Аспирин кардио, таб. п/об. р-р/кишечн. 100мг №28 (Bayer Healthcare /Bayer Bitterfield Gmbh)',
    quantity: 13,
    price: 129.14,
    pharmacy: {
      id: 1,
      name: 'Аптека М- ',
      address: 'Курск, СХА, Пр-т Победы 14',
      isOpenNow: false,
    },
    distance: 4.6,
    date: '2 д. назад',
  },
  {
    id: '4',
    name:
      'Аспирин кардио, таб. п/об. р-р/кишечн. 100мг №28 (Bayer Healthcare /Bayer Bitterfield Gmbh)',
    quantity: 6,
    price: 129.14,
    pharmacy: {
      id: 1,
      name: 'Аптека М= ',
      address: 'Курск, СХА, Пр-т Победы 14',
      isOpenNow: false,
    },
    distance: 4.6,
    date: '2 д. назад',
  },
  {
    id: '14',
    name:
      'Аспирин кардио, таб. п/об. р-р/кишечн. 300мг №20 (Bayer Pharma AG/Германия/Bayer Bitterfield/Германия)',
    quantity: 13,
    price: 76,
    pharmacy: {
      id: 1,
      name: "Аптека 'Таблеточка'",
      address: 'Курск, Центральный округ, ул. Садовая 10',
      isOpenNow: true,
    },
    distance: 3.4,
    date: '5 мин. назад',
  },
];

const Scrollable = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={{height: 200, borderWidth: 2, borderColor: 'black'}}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Scrollable;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'coral',
    height: 50,
  },
});

// import React from 'react';
// import {View, Text, ScrollView, Image, Animated, StyleSheet} from 'react-native';
// // import {SearchBar} from 'react-native-elements';

// const HEADER_MAX_HEIGHT = 120;
// const HEADER_MIN_HEIGHT = 70;
// const PROFILE_IMAGE_MAX_HEIGHT = 80;
// const PROFILE_IMAGE_MIN_HEIGHT = 40;

// const Scrollable = () => {
//   const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

//   const headerHeight = scrollY.interpolate({
//     inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
//     extrapolate: 'clamp'
//   });
//   const profileImageHeight = scrollY.interpolate({
//     inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
//     extrapolate: 'clamp'
//   });
//   const profileImageMarginTop = scrollY.interpolate({
//     inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [
//       HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2),
//       HEADER_MAX_HEIGHT + 5
//     ],
//     extrapolate: 'clamp'
//   });
//   const headerZindex = scrollY.interpolate({
//     inputRange: [PROFILE_IMAGE_MIN_HEIGHT, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [0, 1],
//     extrapolate: 'clam'
//   });
//   const headerTitleBottom = scrollY.interpolate({
//     inputRange: [
//       0,
//       HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
//       HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
//       HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26
//     ],
//     outputRange: [-20, -20, -20, 0],
//     extrapolate: 'clam'
//   });

//   return (
//     <View style={{flex: 1}}>
//       <Animated.View
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           backgroundColor: 'lightskyblue',
//           height: headerHeight,
//           zIndex: headerZindex,
//           alignItems: 'center'
//         }}>
//         <Animated.View style={{position: 'absolute', bottom: headerTitleBottom}}>
//           <Text style={{fontSize: 14, fontWeight: 'bold'}}>Jane Doe</Text>
//         </Animated.View>
//       </Animated.View>
//       <ScrollView style={{flex: 1}}
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//         [{nativeEvent: {contentOffset: {y: scrollY}}}]
//       )}>
//         <Animated.View
//           style={{
//             height: profileImageHeight,
//             width: profileImageHeight,
//             borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
//             borderColor: 'white',
//             borderWidth: 3,
//             overflow: 'hidden',
//             marginTop: profileImageMarginTop,
//             marginLeft: 10,
//           }}>
//           <Image
//             source={require('../../assets/christopher-campbell.jpg')}
//             style={{
//               flex: 1,
//               width: null,
//               height: null,
//             }}
//           ></Image>
//         </Animated.View>
//         <View>
//           <Text style={{fontWeight: 'bold', fontSize: 26, paddingLeft: 10}}>
//             Jane Doe
//           </Text>
//         </View>
//         <View style={{height: 1000, backgroundColor:"transparent"}}>

//         </View>

//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

// export default Scrollable;
