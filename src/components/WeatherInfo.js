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
  getTimeZone
} from '../utilities';
import clearSky from '../assets/svgs/clearSky.svg';
import { ReactSVG } from 'react-svg';

const ClearSky = () => (
  <svg
    data-v-b8dd9ac6=""
    width="50px"
    height="50px"
    viewBox="0 0 148 148"
    class="owm-weather-icon"
  >
    <path
      d="M110.117 74c0 19.947-16.17 36.117-36.117 36.117-19.947 0-36.117-16.17-36.117-36.117 0-19.947 16.17-36.117 36.117-36.117 19.947 0 36.117 16.17 36.117 36.117"
      fill="#f15d46"
    ></path>
  </svg>
);
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
      <div className="d-flex justify-content-spce-between">
        <h5 className="text-capitalize">{description} </h5>
        <ClearSky />
      </div>
      <Row className="g-3" sm={4}>
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
    </>
  );
}
