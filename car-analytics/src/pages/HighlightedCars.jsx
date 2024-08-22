import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import CarCard from '../components/CarCard';
import carsData from '../data/cars.json';
import './HighlightedCars.css'; // Ensure this file is in the same directory as HighlightedCars.js

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState(() => {
    // Load highlighted cars from localStorage if available
    const savedHighlights = localStorage.getItem('highlightedCars');
    return savedHighlights ? JSON.parse(savedHighlights) : [];
  });

  const [showRemoveAllModal, setShowRemoveAllModal] = useState(false);
  const [showRemoveOneModal, setShowRemoveOneModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleRemoveAllHighlights = () => {
    setHighlightedCars([]);
    localStorage.removeItem('highlightedCars');
    setShowRemoveAllModal(false);
  };

  const handleRemoveHighlight = () => {
    if (selectedCar) {
      setHighlightedCars(prevHighlights => {
        const updatedHighlights = prevHighlights.filter(highlightedCar => highlightedCar.Cid !== selectedCar.Cid);
        localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlights));
        return updatedHighlights;
      });
      setShowRemoveOneModal(false);
    }
  };

  const handleShowRemoveOneModal = (car) => {
    setSelectedCar(car);
    setShowRemoveOneModal(true);
  };

  const handleCloseRemoveOneModal = () => {
    setShowRemoveOneModal(false);
    setSelectedCar(null);
  };

  const handleCloseRemoveAllModal = () => {
    setShowRemoveAllModal(false);
  };

  const { Cars } = carsData;

  return (
    <Container fluid className="highlighted-cars-container">
      <header className="text-center mb-4">
        <h1 className="display-4 text-primary">Highlighted Cars</h1>
        {/* Conditionally render the button based on the presence of highlighted cars */}
        {highlightedCars.length > 0 ? (
          <>
            <Button
              variant="danger"
              className="mt-3"
              onClick={() => setShowRemoveAllModal(true)}
            >
              Remove All Highlights
            </Button>
            <Row className="mb-5">
                <Col md={12}>
                  <div className="car-card-container">
                    {highlightedCars.map((car) => (
                      <CarCard
                        car={car}
                        carCount={highlightedCars.filter(c => c.Model === car.Model).length}
                        isHighlighted={true}
                        onHighlightToggle={() => handleShowRemoveOneModal(car)}
                        key={car.Cid}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
          </>
        ) : (
          <div className="text-center mt-4">
            <p className="text-muted">You currently have no highlighted cars. To highlight a car, navigate to the dashboard and select your preferred cars.</p>
          </div>
        )}
      </header>

      {/* Bootstrap Modal for removing a single highlight */}
      <Modal show={showRemoveOneModal} onHide={handleCloseRemoveOneModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCar && (
            <div>
              <h5>Are you sure you want to remove the highlight for this car?</h5>
              <p><strong>Name:</strong> {selectedCar.NameMMT}</p>
              <p><strong>Model:</strong> {selectedCar.Model}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemoveOneModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveHighlight}>
            Remove Highlight
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Bootstrap Modal for removing all highlights */}
      <Modal show={showRemoveAllModal} onHide={handleCloseRemoveAllModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to remove all highlighted cars?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemoveAllModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveAllHighlights}>
            Remove All Highlights
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HighlightedCars;
