export const pharmacies = [
  {
    id: 1,
    name: "Аптека 'Таблеточка'",
    address: 'Курск, Центральный округ, ул. Садовая 10',
    isOpenNow: true,
    latitude: 51.749103,
    longitude: 36.226869,
    phone: 89655467856,
    schedule: "пн-вс, с 7:30 до 19:00",
    photos: []
  },
  {
    id: 2,
    name: "Аптека M+",
    address: 'Курск, СХА, Пр-т Победы 14',
    isOpenNow: true,
    latitude: "51.67207600",
    longitude: "36.14014000",
    phone: 89655467856,
    schedule: "пн-вс, с 7:30 до 19:00",
    photos: []
  },
  {
    id: 3,
    name: 'Аптека М- ',
    address: 'Курск, СХА, Пр-т Победы 14',
    isOpenNow: true,
    // latitude: 51.749103,
    // longitude: 36.226869,
    latitude: null,
    longitude: null,
    phone: 89655467856,
    schedule: "пн-вс, с 7:30 до 19:00",
    photos: []
  }
]

export default [
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
  {
    id: '12',
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
    id: '13',
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
]