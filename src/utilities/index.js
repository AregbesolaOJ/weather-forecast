import timeZones from '../data/timezones.json';

export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getTemperature(temp_in_fahrenheit) {
  const celsius = (5 / 9) * (temp_in_fahrenheit - 32);
  return `${celsius.toFixed(2)} C`;
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

export const sampleWeatherData = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1656763200,
      main: {
        temp: 300.18,
        feels_like: 302.86,
        temp_min: 300.18,
        temp_max: 300.18,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 79,
        temp_kf: 0
      },
      weather: [
        { id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }
      ],
      clouds: { all: 100 },
      wind: { speed: 3.13, deg: 241, gust: 4.38 },
      visibility: 7142,
      pop: 0.71,
      rain: { '3h': 3.33 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-02 12:00:00'
    },
    {
      dt: 1656774000,
      main: {
        temp: 300.32,
        feels_like: 302.97,
        temp_min: 300.32,
        temp_max: 300.59,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1013,
        humidity: 77,
        temp_kf: -0.27
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 92 },
      wind: { speed: 3.87, deg: 234, gust: 5.42 },
      visibility: 10000,
      pop: 0.79,
      rain: { '3h': 1.92 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-02 15:00:00'
    },
    {
      dt: 1656784800,
      main: {
        temp: 298.66,
        feels_like: 299.36,
        temp_min: 297.9,
        temp_max: 298.66,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1013,
        humidity: 80,
        temp_kf: 0.76
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 89 },
      wind: { speed: 3, deg: 233, gust: 7.2 },
      visibility: 10000,
      pop: 0.63,
      rain: { '3h': 0.17 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-02 18:00:00'
    },
    {
      dt: 1656795600,
      main: {
        temp: 297.18,
        feels_like: 297.83,
        temp_min: 297.18,
        temp_max: 297.18,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 1016,
        humidity: 84,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }
      ],
      clouds: { all: 100 },
      wind: { speed: 1.9, deg: 241, gust: 4.42 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2022-07-02 21:00:00'
    },
    {
      dt: 1656806400,
      main: {
        temp: 296.75,
        feels_like: 297.41,
        temp_min: 296.75,
        temp_max: 296.75,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 86,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }
      ],
      clouds: { all: 99 },
      wind: { speed: 1.47, deg: 257, gust: 2.71 },
      visibility: 10000,
      pop: 0.09,
      sys: { pod: 'n' },
      dt_txt: '2022-07-03 00:00:00'
    },
    {
      dt: 1656817200,
      main: {
        temp: 296.35,
        feels_like: 296.97,
        temp_min: 296.35,
        temp_max: 296.35,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 86,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }
      ],
      clouds: { all: 95 },
      wind: { speed: 1.81, deg: 257, gust: 3.71 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2022-07-03 03:00:00'
    },
    {
      dt: 1656828000,
      main: {
        temp: 296.81,
        feels_like: 297.45,
        temp_min: 296.81,
        temp_max: 296.81,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 85,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }
      ],
      clouds: { all: 97 },
      wind: { speed: 1.78, deg: 269, gust: 4.37 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2022-07-03 06:00:00'
    },
    {
      dt: 1656838800,
      main: {
        temp: 299.38,
        feels_like: 299.38,
        temp_min: 299.38,
        temp_max: 299.38,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 1017,
        humidity: 75,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }
      ],
      clouds: { all: 100 },
      wind: { speed: 2.38, deg: 265, gust: 3.85 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2022-07-03 09:00:00'
    },
    {
      dt: 1656849600,
      main: {
        temp: 302.57,
        feels_like: 304.91,
        temp_min: 302.57,
        temp_max: 302.57,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 60,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }
      ],
      clouds: { all: 90 },
      wind: { speed: 3.86, deg: 250, gust: 4.61 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2022-07-03 12:00:00'
    },
    {
      dt: 1656860400,
      main: {
        temp: 301.14,
        feels_like: 303.29,
        temp_min: 301.14,
        temp_max: 301.14,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 66,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }
      ],
      clouds: { all: 60 },
      wind: { speed: 4.07, deg: 232, gust: 5.76 },
      visibility: 10000,
      pop: 0.16,
      sys: { pod: 'd' },
      dt_txt: '2022-07-03 15:00:00'
    },
    {
      dt: 1656871200,
      main: {
        temp: 298.34,
        feels_like: 298.95,
        temp_min: 298.34,
        temp_max: 298.34,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 78,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }
      ],
      clouds: { all: 71 },
      wind: { speed: 3.78, deg: 229, gust: 8.51 },
      visibility: 10000,
      pop: 0.17,
      sys: { pod: 'd' },
      dt_txt: '2022-07-03 18:00:00'
    },
    {
      dt: 1656882000,
      main: {
        temp: 297.61,
        feels_like: 298.23,
        temp_min: 297.61,
        temp_max: 297.61,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 81,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }
      ],
      clouds: { all: 66 },
      wind: { speed: 3.15, deg: 238, gust: 7.71 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2022-07-03 21:00:00'
    },
    {
      dt: 1656892800,
      main: {
        temp: 297.16,
        feels_like: 297.84,
        temp_min: 297.16,
        temp_max: 297.16,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 85,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }
      ],
      clouds: { all: 76 },
      wind: { speed: 2.55, deg: 251, gust: 5.51 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2022-07-04 00:00:00'
    },
    {
      dt: 1656903600,
      main: {
        temp: 296.94,
        feels_like: 297.65,
        temp_min: 296.94,
        temp_max: 296.94,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 87,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }
      ],
      clouds: { all: 97 },
      wind: { speed: 2.67, deg: 261, gust: 6.82 },
      visibility: 10000,
      pop: 0.09,
      sys: { pod: 'n' },
      dt_txt: '2022-07-04 03:00:00'
    },
    {
      dt: 1656914400,
      main: {
        temp: 296.67,
        feels_like: 297.43,
        temp_min: 296.67,
        temp_max: 296.67,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 90,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 98 },
      wind: { speed: 1.99, deg: 272, gust: 5.64 },
      visibility: 10000,
      pop: 0.32,
      rain: { '3h': 0.13 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-04 06:00:00'
    },
    {
      dt: 1656925200,
      main: {
        temp: 300.54,
        feels_like: 302.99,
        temp_min: 300.54,
        temp_max: 300.54,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 1016,
        humidity: 73,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 60 },
      wind: { speed: 3.34, deg: 253, gust: 4.91 },
      visibility: 10000,
      pop: 0.73,
      rain: { '3h': 0.79 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-04 09:00:00'
    },
    {
      dt: 1656936000,
      main: {
        temp: 302.27,
        feels_like: 305.05,
        temp_min: 302.27,
        temp_max: 302.27,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 64,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 64 },
      wind: { speed: 3.79, deg: 236, gust: 4.72 },
      visibility: 10000,
      pop: 0.85,
      rain: { '3h': 1.65 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-04 12:00:00'
    },
    {
      dt: 1656946800,
      main: {
        temp: 300.76,
        feels_like: 303.31,
        temp_min: 300.76,
        temp_max: 300.76,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 1012,
        humidity: 72,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 100 },
      wind: { speed: 3.99, deg: 230, gust: 5.77 },
      visibility: 10000,
      pop: 0.92,
      rain: { '3h': 1.33 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-04 15:00:00'
    },
    {
      dt: 1656957600,
      main: {
        temp: 297.97,
        feels_like: 298.73,
        temp_min: 297.97,
        temp_max: 297.97,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 85,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 80 },
      wind: { speed: 3.49, deg: 223, gust: 8.08 },
      visibility: 10000,
      pop: 0.92,
      rain: { '3h': 0.73 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-04 18:00:00'
    },
    {
      dt: 1656968400,
      main: {
        temp: 297.59,
        feels_like: 298.36,
        temp_min: 297.59,
        temp_max: 297.59,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 87,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }
      ],
      clouds: { all: 87 },
      wind: { speed: 3.34, deg: 215, gust: 8.03 },
      visibility: 10000,
      pop: 0.27,
      sys: { pod: 'n' },
      dt_txt: '2022-07-04 21:00:00'
    },
    {
      dt: 1656979200,
      main: {
        temp: 297.76,
        feels_like: 298.5,
        temp_min: 297.76,
        temp_max: 297.76,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 85,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
      ],
      clouds: { all: 93 },
      wind: { speed: 3.45, deg: 208, gust: 7.68 },
      visibility: 10000,
      pop: 0.64,
      rain: { '3h': 0.5 },
      sys: { pod: 'n' },
      dt_txt: '2022-07-05 00:00:00'
    },
    {
      dt: 1656990000,
      main: {
        temp: 296.62,
        feels_like: 297.42,
        temp_min: 296.62,
        temp_max: 296.62,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 92,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
      ],
      clouds: { all: 100 },
      wind: { speed: 2.48, deg: 216, gust: 6.33 },
      visibility: 6866,
      pop: 0.95,
      rain: { '3h': 2.52 },
      sys: { pod: 'n' },
      dt_txt: '2022-07-05 03:00:00'
    },
    {
      dt: 1657000800,
      main: {
        temp: 296.29,
        feels_like: 297.14,
        temp_min: 296.29,
        temp_max: 296.29,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 95,
        temp_kf: 0
      },
      weather: [
        { id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }
      ],
      clouds: { all: 100 },
      wind: { speed: 1.62, deg: 232, gust: 4.61 },
      visibility: 8375,
      pop: 1,
      rain: { '3h': 3.12 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-05 06:00:00'
    },
    {
      dt: 1657011600,
      main: {
        temp: 299.33,
        feels_like: 299.33,
        temp_min: 299.33,
        temp_max: 299.33,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 1016,
        humidity: 82,
        temp_kf: 0
      },
      weather: [
        { id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }
      ],
      clouds: { all: 100 },
      wind: { speed: 2.11, deg: 244, gust: 3.77 },
      visibility: 10000,
      pop: 1,
      rain: { '3h': 3.08 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-05 09:00:00'
    },
    {
      dt: 1657022400,
      main: {
        temp: 300.85,
        feels_like: 303.61,
        temp_min: 300.85,
        temp_max: 300.85,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 73,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 98 },
      wind: { speed: 2.88, deg: 229, gust: 3.87 },
      visibility: 10000,
      pop: 1,
      rain: { '3h': 1.69 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-05 12:00:00'
    },
    {
      dt: 1657033200,
      main: {
        temp: 300.43,
        feels_like: 302.88,
        temp_min: 300.43,
        temp_max: 300.43,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 74,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 91 },
      wind: { speed: 3.15, deg: 224, gust: 4.81 },
      visibility: 10000,
      pop: 1,
      rain: { '3h': 1.06 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-05 15:00:00'
    },
    {
      dt: 1657044000,
      main: {
        temp: 297.76,
        feels_like: 298.52,
        temp_min: 297.76,
        temp_max: 297.76,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 86,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 96 },
      wind: { speed: 2.09, deg: 224, gust: 5.31 },
      visibility: 10000,
      pop: 0.84,
      rain: { '3h': 0.31 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-05 18:00:00'
    },
    {
      dt: 1657054800,
      main: {
        temp: 297.33,
        feels_like: 298.13,
        temp_min: 297.33,
        temp_max: 297.33,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }
      ],
      clouds: { all: 100 },
      wind: { speed: 1.36, deg: 227, gust: 2.7 },
      visibility: 10000,
      pop: 0.19,
      sys: { pod: 'n' },
      dt_txt: '2022-07-05 21:00:00'
    },
    {
      dt: 1657065600,
      main: {
        temp: 296.63,
        feels_like: 297.44,
        temp_min: 296.63,
        temp_max: 296.63,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 92,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }
      ],
      clouds: { all: 90 },
      wind: { speed: 1.14, deg: 251, gust: 1.19 },
      visibility: 10000,
      pop: 0.37,
      sys: { pod: 'n' },
      dt_txt: '2022-07-06 00:00:00'
    },
    {
      dt: 1657076400,
      main: {
        temp: 296.26,
        feels_like: 297.05,
        temp_min: 296.26,
        temp_max: 296.26,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 93,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
      ],
      clouds: { all: 59 },
      wind: { speed: 1.32, deg: 248, gust: 1.81 },
      visibility: 10000,
      pop: 0.53,
      rain: { '3h': 0.33 },
      sys: { pod: 'n' },
      dt_txt: '2022-07-06 03:00:00'
    },
    {
      dt: 1657087200,
      main: {
        temp: 296.38,
        feels_like: 297.19,
        temp_min: 296.38,
        temp_max: 296.38,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 93,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 78 },
      wind: { speed: 0.98, deg: 293, gust: 1.01 },
      visibility: 10000,
      pop: 0.53,
      rain: { '3h': 0.25 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-06 06:00:00'
    },
    {
      dt: 1657098000,
      main: {
        temp: 299.88,
        feels_like: 302.22,
        temp_min: 299.88,
        temp_max: 299.88,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 1017,
        humidity: 79,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 98 },
      wind: { speed: 1.68, deg: 226, gust: 2.5 },
      visibility: 10000,
      pop: 0.65,
      rain: { '3h': 1.77 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-06 09:00:00'
    },
    {
      dt: 1657108800,
      main: {
        temp: 301.48,
        feels_like: 304.77,
        temp_min: 301.48,
        temp_max: 301.48,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 72,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 96 },
      wind: { speed: 3.2, deg: 216, gust: 3.89 },
      visibility: 10000,
      pop: 0.99,
      rain: { '3h': 2.6 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-06 12:00:00'
    },
    {
      dt: 1657119600,
      main: {
        temp: 300.86,
        feels_like: 303.75,
        temp_min: 300.86,
        temp_max: 300.86,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 74,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 82 },
      wind: { speed: 3.32, deg: 222, gust: 4.4 },
      visibility: 10000,
      pop: 0.55,
      rain: { '3h': 1.27 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-06 15:00:00'
    },
    {
      dt: 1657130400,
      main: {
        temp: 298.1,
        feels_like: 298.92,
        temp_min: 298.1,
        temp_max: 298.1,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 87,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }
      ],
      clouds: { all: 91 },
      wind: { speed: 2.61, deg: 227, gust: 6.2 },
      visibility: 10000,
      pop: 0.55,
      sys: { pod: 'd' },
      dt_txt: '2022-07-06 18:00:00'
    },
    {
      dt: 1657141200,
      main: {
        temp: 297.52,
        feels_like: 298.36,
        temp_min: 297.52,
        temp_max: 297.52,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 90,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
      ],
      clouds: { all: 100 },
      wind: { speed: 2.18, deg: 216, gust: 6.01 },
      visibility: 10000,
      pop: 0.28,
      rain: { '3h': 0.13 },
      sys: { pod: 'n' },
      dt_txt: '2022-07-06 21:00:00'
    },
    {
      dt: 1657152000,
      main: {
        temp: 296.85,
        feels_like: 297.7,
        temp_min: 296.85,
        temp_max: 296.85,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1015,
        humidity: 93,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
      ],
      clouds: { all: 81 },
      wind: { speed: 1.73, deg: 222, gust: 4.03 },
      visibility: 10000,
      pop: 0.28,
      rain: { '3h': 0.23 },
      sys: { pod: 'n' },
      dt_txt: '2022-07-07 00:00:00'
    },
    {
      dt: 1657162800,
      main: {
        temp: 296.57,
        feels_like: 297.42,
        temp_min: 296.57,
        temp_max: 296.57,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1014,
        humidity: 94,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
      ],
      clouds: { all: 94 },
      wind: { speed: 1.75, deg: 261, gust: 3.81 },
      visibility: 10000,
      pop: 0.4,
      rain: { '3h': 0.25 },
      sys: { pod: 'n' },
      dt_txt: '2022-07-07 03:00:00'
    },
    {
      dt: 1657173600,
      main: {
        temp: 296.7,
        feels_like: 297.57,
        temp_min: 296.7,
        temp_max: 296.7,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 1016,
        humidity: 94,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 93 },
      wind: { speed: 1.57, deg: 267, gust: 3.8 },
      visibility: 10000,
      pop: 0.24,
      rain: { '3h': 0.27 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-07 06:00:00'
    },
    {
      dt: 1657184400,
      main: {
        temp: 299.83,
        feels_like: 302.2,
        temp_min: 299.83,
        temp_max: 299.83,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 1017,
        humidity: 80,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ],
      clouds: { all: 87 },
      wind: { speed: 2.72, deg: 245, gust: 4.03 },
      visibility: 10000,
      pop: 0.69,
      rain: { '3h': 1.88 },
      sys: { pod: 'd' },
      dt_txt: '2022-07-07 09:00:00'
    }
  ],
  city: {
    id: 2332453,
    name: 'Lagos',
    coord: { lat: 6.5833, lon: 3.75 },
    country: 'NG',
    population: 10601345,
    timezone: 3600,
    sunrise: 1656740038,
    sunset: 1656785025
  }
};
