import { useState } from 'react';
import { Alert, Accordion, Card, Row, Col, Spinner } from 'react-bootstrap';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useWeatherData } from '../hooks/useWeatherData';
import {
  dateFormater,
  formatNumberWithCommas,
  getTemperature,
  getTimeZone,
  sortWeatherByDates
} from '../utilities';
import { WeatherIcon } from './WeatherIcon';
import { WeatherInfo } from './WeatherInfo';

export function CityCard({ id, name, price, location }) {
  const [loading] = useState(null);
  const [error] = useState(null);

  //   const { loading, data, error } = useWeatherData(location);
  const [data] = useLocalStorage(location, {});

  const { city, list } = data || {};

  const myList = sortWeatherByDates(list);
  const datesArray = Object.keys(myList);
  const today = datesArray[0];
  const last = datesArray[datesArray.length - 1];
  const { [today]: todaysPayload, [last]: sixthDay, ...remainingDays } = myList;

  const {
    main = {},
    weather = [],
    wind = {},
    visibility
  } = todaysPayload?.[0] || {};

  const { description } = weather?.[0] || {};
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
            <Card.Title className="d-flex justify-content-between align-items-center mb-4">
              <span className="fs-2">
                {city ? `${city.name}, ${city.country}` : location}
              </span>
              {/* <Spinner color="blue" size="sm" animation="grow" /> */}
              {description ? <WeatherIcon description={description} /> : null}
            </Card.Title>
            <Card.Subtitle className="mb-3">
              <Row className="g-3" sm={2} xs={1}>
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
              <span className="h6">Today's Weather</span>
              {description ? (
                <span className="text-capitalize paragraph-sm text-muted">
                  {' '}
                  - {description}
                </span>
              ) : null}
              <Row className="g-3 mt-3" sm={3} xs={2}>
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
