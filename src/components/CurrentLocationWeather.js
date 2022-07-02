import { useState, useCallback, useEffect } from 'react';
import {
  Toast,
  ToastContainer,
  Card,
  Row,
  Col,
  Spinner
} from 'react-bootstrap';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatNumberWithCommas, getTimeZone } from '../utilities';
import { WeatherIcon } from './WeatherIcon';
import { Button } from './Button';

export function CurrentLocationWeather() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const {
    main = {},
    weather = [],
    wind = {},
    visibility,
    timezone,
    sys,
    coord,
    population,
    name
  } = currentLocationWeather || {};

  const { description } = weather?.[0] || {};
  const [storedCurrentPosition, storeCurrentPosition] = useLocalStorage(
    'storedCurrentPosition',
    null
  );

  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const getCurrentWeatherData = useCallback(
    (position) => {
      const params = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        // lat: '3.9470',
        // lon: '7.3775',
        lang: 'en',
        units: 'metric'
      };
      const { lon, lat, lang, units } = params;
      setLoading(true);
      fetch(
        `https://${process.env.REACT_APP_API_HOST}/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&mode="json"`,
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
          setCurrentLocationWeather(response);
          storeCurrentPosition(response);
          setLoading(false);
          setError(null);
        })
        .catch(() => {
          setLoading(false);
          setToastMessage('Something went wrong, please try again later');
          toggleToast();
          setError('ERR:');
        });
    },
    [toggleToast, storeCurrentPosition]
  );

  function showPosition(position) {
    getCurrentWeatherData(position);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setToastMessage('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setToastMessage('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setToastMessage('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        setToastMessage('An unknown error occurred.');
        break;
      default:
        setToastMessage('Something went wrong');
    }
    toggleToast();
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success function
        showPosition,
        // Error function
        showError,
        options
      );
    } else {
      setToastMessage('Geolocation is not supported by this browser.');
      toggleToast();
    }
  }

  useEffect(() => {
    if (!currentLocationWeather) {
      setCurrentLocationWeather(storedCurrentPosition || null);
    }
    return () => {};
  }, [currentLocationWeather, storedCurrentPosition]);

  return (
    <>
      <ToastContainer className="mt-3 pt-5" position="top-end">
        <Toast show={showToast} autohide onClose={toggleToast}>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Oops!</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100 mt-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : !currentLocationWeather || currentLocationWeather?.message ? (
        <section className="container d-flex align-items-center justify-content-center p-2 mt-4 bg-light rounded">
          <h6 className="text-muted pt-2">
            See the weather forecast for your current location?
          </h6>
          <Button
            variant="outline-primary ms-2"
            size="sm"
            onClick={getLocation}
          >
            {error ? 'Retry' : 'Proceed'}
          </Button>
        </section>
      ) : (
        <Card className="h-100 mt-4">
          <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-center mb-4">
              <span className="fs-2">
                {`${name || '-'}, ${sys?.country || '-'}`}
              </span>
              {description ? <WeatherIcon description={description} /> : null}
            </Card.Title>
            <Card.Subtitle className="mb-3">
              <Row className="g-3" sm={2} xs={1}>
                <Col>
                  <span className="paragraph">Population: </span>
                  <span className="paragraph text-muted">
                    {population
                      ? formatNumberWithCommas(population || 0)
                      : 'Not Provided'}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph">Longitude: </span>
                  <span className="paragraph text-muted">
                    {coord?.lon || 0}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph">Latitude: </span>
                  <span className="paragraph text-muted">
                    {coord?.lat || 0}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph">Time Zone: </span>
                  <span className="paragraph text-muted">
                    {getTimeZone(timezone || 0)}
                  </span>
                </Col>
              </Row>
            </Card.Subtitle>
            <div className="mt-2">
              <span className="h6">Today's Weather</span>
              {description ? (
                <span className="text-capitalize paragraph text-muted">
                  {' '}
                  - {description}
                </span>
              ) : null}
              <Row className="g-3 pt-2" sm={3} xs={2}>
                <Col>
                  <span className="paragraph-sm">Humidity: </span>
                  <span className="paragraph-sm text-muted">
                    {formatNumberWithCommas(main?.humidity || 0)}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph-sm">Wind Speed: </span>
                  <span className="paragraph-sm text-muted">
                    {wind?.speed || 0}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph-sm">Feels Like: </span>
                  <span className="paragraph-sm text-muted">
                    {main?.feels_like || 0}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph-sm">Visibility: </span>
                  <span className="paragraph-sm text-muted">
                    {visibility ? `${Math.round(visibility / 1000)}k` : 0}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph-sm">Highest Temperature: </span>
                  <span className="paragraph-sm text-muted">
                    {`${main?.temp_max || 0} C`}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph-sm">Lowest Temperature: </span>
                  <span className="paragraph-sm text-muted">
                    {`${main?.temp_min || 0} C`}
                  </span>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
