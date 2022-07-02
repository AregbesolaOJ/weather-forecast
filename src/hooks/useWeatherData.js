import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

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
    fetch(
      `https://${process.env.REACT_APP_API_HOST}/forecast?q=${location}&lang="en"&units="metric"&mode="json"`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
        }
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setLocationWeatherMeta(response);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
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
    if (!data) {
      setData(locationWeatherMeta || null);
    }
    return () => {};
  }, [data, locationWeatherMeta]);

  return { loading, error, data };
}
