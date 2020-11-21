import { store } from '../store';

export function isSettingsDiffer(region, town, order, range) {
  const {
    selectedRegion,
    selectedTown,
    selectedOrder,
    selectedRange,
  } = store.getState().settings;

  if (
    region !== selectedRegion ||
    town !== selectedTown ||
    order !== selectedOrder ||
    range !== selectedRange
  ) {
    return true;
  }
  return false;
}
