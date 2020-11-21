import { getDistance } from "geolib";

export function calculateDistance(pointA, pointB) {
  const distance = getDistance(pointA, pointB) / 1000;

  return distance.toFixed(1);
}