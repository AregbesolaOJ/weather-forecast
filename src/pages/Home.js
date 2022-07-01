import { Col, Row } from 'react-bootstrap';
import { CityCard } from '../components/CityCard';
import storeItems from '../data/items.json';

export function Home() {
  return (
    <section className="py-3">
      <h1 className="mb-2">Weather Forecast App</h1>
      <hr />
      <Row md={2} xs={1} lg={3} className="g-3 mt-4">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <CityCard {...item} />
          </Col>
        ))}
      </Row>
    </section>
  );
}
