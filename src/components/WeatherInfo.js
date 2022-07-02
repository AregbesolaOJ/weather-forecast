import { Row, Col } from 'react-bootstrap';
import { formatNumberWithCommas, getTemperature } from '../utilities';
import { WeatherIcon } from './WeatherIcon';

export function WeatherInfo({ daysPayload }) {
  const {
    main = {},
    weather = [],
    wind = {},
    visibility
  } = daysPayload?.[0] || {};

  const { description } = weather?.[0] || {};
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <p className="text-capitalize paragraph">{description} </p>
        <div className="mb-3">
          <WeatherIcon description={description} />
        </div>
      </div>
      <Row className="g-3" sm={3} xs={2}>
        <Col>
          <span className="paragraph-sm">Humidity: </span>
          <span className="paragraph-sm text-muted">
            {formatNumberWithCommas(main?.humidity || 0)}
          </span>
        </Col>
        <Col>
          <span className="paragraph-sm">Wind Speed: </span>
          <span className="paragraph-sm text-muted">{wind?.speed || 0}</span>
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
    </>
  );
}
