export default {
  0: state => {
    return {
      ...state,
      settings: {
        ...state.settings,
        districts: [{ id: '', name: 'Не выбрано' }],
        selectedDistrict: { id: '', name: 'Не выбрано' },
      },
    };
  },
};
