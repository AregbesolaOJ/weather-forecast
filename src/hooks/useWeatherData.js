import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const API_Key = 'e33e922f84msh2c5450e84e2b393p1d5f26jsn03c4b9d84e85';
const API_Host = 'community-open-weather-map.p.rapidapi.com';

export function useWeatherData(location) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [locationWeatherMeta, setLocationWeatherMeta] = useLocalStorage(
    location,
    null
  );

  const getFiveDaysWeatherData = useCallback(() => {
    setLoading(true);
    fetch(`https://${API_Host}/forecast?q=${location}&mode="json"`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_Key,
        'X-RapidAPI-Host': API_Host
      }
    })
      // fetch(`https://jsonplaceholder.typicode.com/comments?postId=${location}`, {
      //   method: 'GET'
      // })
      .then((response) => response.json())
      .then((response) => {
        console.log({ response });
        setData(response);
        setLocationWeatherMeta(response);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setError('Something went wrong, please try again later');
        setLoading(false);
        setData(null);
      });
  }, [location, setLocationWeatherMeta]);

  useEffect(() => {
    getFiveDaysWeatherData();
    return () => {};
  }, [getFiveDaysWeatherData]);

  useEffect(() => {
    console.log(location, { locationWeatherMeta });

    if (!data) {
      setData(locationWeatherMeta || null);
    }
    return () => {};
  }, [data, locationWeatherMeta, location]);

  return { loading, error, data };
}
