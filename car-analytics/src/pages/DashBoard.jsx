import React, { useState } from 'react';
import BrandCard from '../components/BrandCard';
import DashboardTable from '../components/DashBoardTable';
import PieChartComponent from '../components/PieChart';
import StackedBarChart from '../components/StackedChart';
import CarCard from '../components/CarCard';
import carsData from '../data/cars.json';
import { Container, Row, Col } from 'react-bootstrap';
import './Dashboard.css'; // Ensure this file is in the same directory as Dashboard.jsx

const Dashboard = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [highlightedCars, setHighlightedCars] = useState(() => {
    const savedHighlights = localStorage.getItem('highlightedCars');
    return savedHighlights ? JSON.parse(savedHighlights) : [];
  });

  const { Cars, MMList } = carsData;

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand.mkID);
  };

  const handleHighlightToggle = (car) => {
    setHighlightedCars(prevHighlights => {
      const isHighlighted = prevHighlights.some(highlightedCar => highlightedCar.Cid === car.Cid);
      const updatedHighlights = isHighlighted
        ? prevHighlights.filter(highlightedCar => highlightedCar.Cid !== car.Cid)
        : [...prevHighlights, car];

      localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlights));
      return updatedHighlights;
    });
  };

  const filteredCars = selectedBrand
    ? Cars.filter(car => car.MkID === selectedBrand)
    : Cars;

  const brandData = Object.entries(filteredCars.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0];
    if (!acc[brand]) {
      acc[brand] = { brand, count: 0, models: {} };
    }
    acc[brand].count += 1;
    if (!acc[brand].models[car.Model]) {
      acc[brand].models[car.Model] = { count: 0, value: 0 };
    }
    acc[brand].models[car.Model].count += 1;
    acc[brand].models[car.Model].value += parseInt(car.Prc.replace(/,/g, ''), 10);
    return acc;
  }, {})).map(([brand, data]) => data);

  return (
    <Container fluid className="dashboard-container">
      <header className="text-center mb-4">
        <h1 className="display-4 text-primary">Dashboard</h1>
      </header>
      <Row className="mb-5">
        <Col md={12}>
          <h2 className="section-title">Car Brands</h2>
          <Row className="brand-card-container">
            {MMList.map((brand) => (
              <Col xs={12} sm={6} md={4} lg={2} key={brand.mkID} className="mb-4">
                <BrandCard
                  brand={brand}
                  onSelect={handleBrandSelect}
                  selected={selectedBrand === brand.mkID}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={12}>
          <h2 className="section-title">Data Table</h2>
          <DashboardTable cars={filteredCars} />
        </Col>
      </Row>
      <Row className="mb-5">
        <h2 className="section-title">Charts</h2>
        {selectedBrand ? (
          <>
            <Col md={6}>
              <div className="chart-container">
                <h3 className="chart-title">Car Distribution</h3>
                <PieChartComponent cars={filteredCars} />
              </div>
            </Col>
            <Col md={6}>
              <div className="chart-container">
                <h3 className="chart-title">Brand Analysis</h3>
                <StackedBarChart cars={filteredCars} />
              </div>
            </Col>
          </>
        ) : (
          <Col md={12} className="text-center">
            <p className="large-text">Select a brand to view charts.</p>
          </Col>
        )}
      </Row>
      <Row className="mb-5">
        <Col md={12}>
          <h2 className="section-title">Car Details</h2>
          <div className="car-card-container">
            {filteredCars.map((car) => (
              <CarCard
                car={car}
                carCount={filteredCars.filter(c => c.Model === car.Model).length}
                isHighlighted={highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid)}
                onHighlightToggle={() => handleHighlightToggle(car)}
                key={car.Cid}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
