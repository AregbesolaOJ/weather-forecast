import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { Location } from './pages/Location';

function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:location" element={<Location />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
