import { useState, useCallback, useEffect } from 'react';
import {
  Button,
  Toast,
  ToastContainer,
  Card,
  Row,
  Col,
  Spinner
} from 'react-bootstrap';
import { formatNumberWithCommas, getTimeZone } from '../utilities';
import { WeatherIcon } from '../components/WeatherIcon';
import { useLocation } from 'react-router-dom';

export function Location() {
  const {
    state: { lon, lat }
  } = useLocation();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [loading, setLoading] = useState(null);

  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);

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
  } = selectedLocation || {};

  const { description } = weather?.[0] || {};

  const getCurrentWeatherData = useCallback(
    (latitude, longitude) => {
      const params = {
        lat: latitude,
        lon: longitude,
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
          setSelectedLocation(response);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setToastMessage('Something went wrong, please try again later');
          toggleToast();
        });
    },
    [toggleToast]
  );

  useEffect(() => {
    getCurrentWeatherData(lat, lon);
    return () => {};
  }, [getCurrentWeatherData, lon, lat]);

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
      ) : !selectedLocation || selectedLocation?.message ? (
        <section className="container d-flex align-items-center justify-content-center p-2 mt-4 bg-light rounded">
          <h6 className="text-muted pt-2">No Information Found</h6>
          <Button
            variant="outline-primary ms-2"
            size="sm"
            onClick={() => (window.location.href = '/')}
          >
            Go Back
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
