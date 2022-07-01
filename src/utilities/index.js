import timeZones from '../data/timezones.json';

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency'
});

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}

export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getTemperature(temp_in_fahrenheit) {
  const celsius = (5 / 9) * (temp_in_fahrenheit - 32);
  const celsius2 = (5 / 9) * (celsius - 32);
  return celsius2.toFixed(2);
}

export function getTimeZone(seconds) {
  const current = timeZones.find((zone) => zone.seconds === seconds);
  return current?.info || timeZones[0];
}

export function sortWeatherByDates(list = []) {
  const listObj = {};
  const sortedList = list.sort((a, b) => b.dt_txt - a.dt_txt);

  sortedList.forEach((item) => {
    const key = new Date(item.dt_txt).toDateString();
    if (!listObj[key]) {
      listObj[key] = [item];
    } else {
      listObj[key] = [...listObj[key], item];
    }
  });

  return listObj;
}

export const capitalizeFirstLetter = (string) => {
    if (string) {
      return string.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    }
  };

export function dateFormater(date, format) {
  if (date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const formattedDate = new Date(date);

    const year = formattedDate.getFullYear();
    const month = months[formattedDate.getMonth()];
    const digimonth = (formattedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    let hours = formattedDate.getHours();
    let minutes = formattedDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const time = `${hours}:${minutes}${ampm}`;

    switch (format) {
      case 'time':
        return `${day}-${month}-${year} ${time}`;
      case 'simple':
        return `${year}-${digimonth}-${day}`;
      case 'reverse':
        return `${year}-${digimonth}-${day}`;
      case 'date':
        return `${day}/${digimonth}/${year}`;
      case 'month':
        return `${month} ${day}, ${year}`;
      case 'string':
        return `${day}-${month}-${year}`;
      case 'clock':
        return `${time}`;
      default:
        return `${day}/${digimonth}/${year} - ${time}`;
    }
  }
}
