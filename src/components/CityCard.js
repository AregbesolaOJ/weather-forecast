import { useState } from 'react';
import {
  Alert,
  Accordion,
  Button,
  Card,
  Row,
  Col,
  Spinner
} from 'react-bootstrap';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useWeatherData } from '../hooks/useWeatherData';
import {
  dateFormater,
  formatNumberWithCommas,
  getTemperature,
  getTimeZone,
  sortWeatherByDates
} from '../utilities';
import { WeatherInfo } from './WeatherInfo';

export function CityCard({ id, name, price, location }) {
  const [activeKey, setActiveKey] = useState(null);
  const [loading] = useState(null);
  const [error] = useState(null);

  //   const { loading, data, error } = useWeatherData(location);
  const [data, setData] = useLocalStorage(location, {});

  const { city, list } = data || {};

  const myList = sortWeatherByDates(list);
  const today = Object.keys(myList)[0];
  const { [today]: todaysPayload, ...remainingDays } = myList;
  console.log(location, {
    data,
    myList,
    todaysPayload,
    remainingDays
  });

  //   feels_like: 292.16
  // grnd_level: 1016
  // humidity: 51
  // pressure: 1020
  // sea_level: 1020
  // temp: 292.81
  // temp_kf: 2.43
  // temp_max: 292.81
  // temp_min: 290.38
  const {
    main = {},
    weather = [],
    wind = {},
    visibility
  } = todaysPayload?.[0] || {};

  const toggleAccordion = () =>
    setActiveKey((key) => (key === '0' ? null : '0'));

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : data === null || data.message || error ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Alert variant="info">{`${location} ${
              data?.message || error || ''
            } ...`}</Alert>
          </div>
        ) : (
          <>
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
              <span className="fs-2">
                {city ? `${city.name}, ${city.country}` : location}
              </span>
              <Spinner color="blue" size="sm" animation="grow" />
            </Card.Title>
            <Card.Subtitle className="mb-3">
              <Row className="g-3" sm={2}>
                <Col>
                  <span className="paragraph">Population: </span>
                  <span className="paragraph text-muted">
                    {formatNumberWithCommas(city?.population || 0)}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph">Longitude: </span>
                  <span className="paragraph text-muted">
                    {city?.coord?.lon || 0}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph">Latitude: </span>
                  <span className="paragraph text-muted">
                    {city?.coord?.lat || 0}
                  </span>
                </Col>
                {/* <Col>
                  <span className="paragraph">Sunrise: </span>
                  <span className="paragraph text-muted">
                    {dateFormater(city?.sunrise, 'clock')}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph">Sunset: </span>
                  <span className="paragraph text-muted">
                    {dateFormater(city?.sunset, 'clock')}
                  </span>
                </Col> */}
                <Col>
                  <span className="paragraph">Time Zone: </span>
                  <span className="paragraph text-muted">
                    {getTimeZone(city?.timezone || 0)}
                  </span>
                </Col>
              </Row>
            </Card.Subtitle>
            <div className="mt-auto">
              <h6 className="">Today's Weather</h6>
              <Row className="g-3" sm={4}>
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
                {/* <Col>
                  <span className="paragraph-sm">Temperature: </span>
                  <span className="paragraph-sm text-muted">
                    {main?.temp || 0}
                  </span>
                </Col> */}
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
                    {getTemperature(main?.temp_max || 75)}
                  </span>
                </Col>
                <Col>
                  <span className="paragraph-sm">Lowest Temperature: </span>
                  <span className="paragraph-sm text-muted">
                    {getTemperature(main?.temp_min || 75)}
                  </span>
                </Col>
              </Row>
            </div>
            {Object.keys(remainingDays)?.length > 0 ? (
              <Accordion className="mt-4">
                {Object.keys(remainingDays).map((day) => (
                  <Accordion.Item eventKey={day}>
                    <Accordion.Header>
                      {dateFormater(day, 'month')}
                    </Accordion.Header>
                    <Accordion.Body>
                      <WeatherInfo daysPayload={remainingDays[day]} />
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : null}
          </>
        )}
      </Card.Body>
    </Card>
  );
}
