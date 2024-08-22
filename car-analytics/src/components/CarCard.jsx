import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './CarCard.css'; // Ensure this file is in the same directory as CarCard.jsx

const CarCard = ({ car, carCount, isHighlighted, onHighlightToggle }) => (
  <Card className={`car-card ${isHighlighted ? 'highlighted' : ''}`}>
    <Card.Img variant="top" src={car.Img300} alt={car.Model} className="car-card-img" />
    <Card.Body>
      <Card.Title>{car.NameMMT}</Card.Title>
      <Card.Text>
        <strong>Model:</strong> {car.Model}<br />
        <strong>Status:</strong> {car.Status}<br />
        <strong>Province:</strong> {car.Province}<br/>
        <strong>Price:</strong> {car.Prc} {car.Currency}<br/>
        <strong>Count:</strong> {carCount}
      </Card.Text>
      <div className="highlight-button-container">
        <Button 
          variant={isHighlighted ? 'danger' : 'primary'} 
          onClick={onHighlightToggle}
          className="highlight-toggle-btn"
        >
          {isHighlighted ? 'Remove Highlight' : 'Highlight'}
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default CarCard;
