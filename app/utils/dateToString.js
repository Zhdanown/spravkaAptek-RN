const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']
const weekDaysLong = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const weekDaysShort = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];

export function dateToString (date, format = 'www - dd mmmm yyyy hh:mm') {
  if (!(date instanceof Date)) {
    throw new Error(date, ' is not an instance of Date')
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let weekday = date.getDay();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = `0${month}`.substr(-2);
  day = `0${day}`.substr(-2);
  hour = `0${hour}`.substr(-2);
  minute = `0${minute}`.substr(-2);
  second = `0${second}`.substr(-2);

  let weekDayName = weekDaysLong[weekday];

  switch (format) {
    case 'www - dd mmmm yyyy hh:mm':
      return `${weekDayName} - ${day} ${months[month - 1]} ${year}, ${hour}:${minute}`;

    case 'ww - dd mmmm yyyy':
      return `${weekDayName} - ${day} ${months[month - 1]} ${year}`;
     
    case 'dd.mmm.yyyy hh:mm':
      return `${day} ${months[month - 1]} ${year}, ${hour}:${minute}`;

    case 'hh:mm':
      return `${hour}:${minute}`;
      
    default: // dd.mm.yy hh:mm'
      year = `${year}`.substr(-2);
      return `${day}.${month}.${year} ${hour}:${minute}`;

  }
  

}