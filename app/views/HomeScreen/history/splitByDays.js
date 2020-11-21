import { dateToString } from '../../../utils';

const getTitle = date => dateToString(date, 'ww - dd mmmm yyyy');

export default function splitByDays(data) {
  return data.reduce((days, item) => {
    let foundDay = days.find(day => day.title === getTitle(item.date));
    if (foundDay) {
      foundDay.data.push(item);
    } else {
      let day = {
        title: getTitle(item.date),
        data: [{ ...item }],
      };
      days.push(day);
    }
    return days;
  }, []);
}

