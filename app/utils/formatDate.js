import { getRelativeDateFormat } from "./getRelativeDateFormat"

export function formatDate(dateString) {

  const now = new Date();
  const suppliedDate = new Date(dateString);

  // get diff
  const secs = (+now - +suppliedDate) / 1000;
  const mins = secs / 60;
  const hrs = mins / 60;
  const days = hrs / 24;
  const weeks = days / 7;

  if (mins < 1) return getRelativeDateFormat(-Math.floor(secs), 'second');
  else if (hrs < 1) return getRelativeDateFormat(-Math.floor(mins), 'minute');
  else if (days < 1) return getRelativeDateFormat(-Math.floor(hrs), 'hour');
  else if (weeks < 1) return getRelativeDateFormat(-Math.floor(days), 'day');
  else return getRelativeDateFormat(-Math.floor(weeks), 'week');
}