import { getDistance } from "geolib";

export function calculateDistance(pointA, pointB) {
  const distance = getDistance(pointA, pointB)
  return distance;
}