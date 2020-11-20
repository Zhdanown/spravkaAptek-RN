import { store } from '../store';

export function isSettingsDiffer(region, town, district, order, range) {
  const {
    selectedRegion,
    selectedTown,
    selectedDistrict,
    selectedOrder,
    selectedRange,
  } = store.getState().settings;

  if (
    (region && region.id) !== (selectedRegion && selectedRegion.id) ||
    town.id !== selectedTown.id ||
    district.id !== selectedDistrict.id ||
    order.id !== selectedOrder.id ||
    range !== selectedRange
  ) {
    return true;
  }
  return false;
}
