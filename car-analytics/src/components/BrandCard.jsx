import React from 'react';
import { Card } from 'react-bootstrap';
import './BrandCard.css'; // Ensure this file is in the same directory as BrandCard.js

const BrandCard = ({ brand, onSelect, selected }) => {
  return (
    <Card
      onClick={() => onSelect(brand)}
      className={`brand-card ${selected ? 'selected' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <Card.Title>{brand.Name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default BrandCard;
