import { getWordEnding } from "./getWordEnding";

export function getRelativeDateFormat (num, dateTimeType) {
  const absNum = Math.abs(num);
  let cases = null;

  switch (dateTimeType) {
    case 'second':
      cases = ['секунду', 'ceкунды', 'секунд'];
      break;

    case 'minute':
      cases = ['минуту', 'минуты', 'минут'];
      break;

    case 'hour':
      cases = ['час', 'часа', 'часов'];
      break;

    case 'day':
      cases = ['день', 'дня', 'дней'];
      break;

    case 'week':
      cases = ['неделю', 'недели', 'недель'];
      break;

    case 'month':
      cases = ['месяц', 'месяца', 'месецев'];
      break;

    case 'year':
      cases = ['год', 'года', 'лет'];
      break;

    default:
      throw new Error ('Неизвестный тип даты')
  }

  return num > 0 ? 
    `через ${absNum} ${getWordEnding(absNum, cases)}` :
    `${absNum} ${getWordEnding(absNum, cases)} назад`;

}