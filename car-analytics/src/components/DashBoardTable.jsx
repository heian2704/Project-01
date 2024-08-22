import React from 'react';
import { Table } from 'react-bootstrap'; // Import Bootstrap Table component

const DashboardTable = ({ cars }) => {
  const brandModelCounts = cars.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0]; // Assuming the brand is the first word
    if (!acc[brand]) {
      acc[brand] = { count: 0, models: {} };
    }
    acc[brand].count += 1;
    if (!acc[brand].models[car.Model]) {
      acc[brand].models[car.Model] = { count: 0, value: 0 };
    }
    acc[brand].models[car.Model].count += 1;
    acc[brand].models[car.Model].value += parseInt(car.Prc.replace(/,/g, ''), 10);
    return acc;
  }, {});

  // Function to format numbers with commas
  const formatNumber = (number) => new Intl.NumberFormat().format(number);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Count</th>
          <th>Value (Baht)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(brandModelCounts).map(([brand, data]) => {
          const totalValue = Object.values(data.models).reduce((sum, model) => sum + model.value, 0);
          return (
            <React.Fragment key={brand}>
              {Object.entries(data.models).map(([model, modelData], index) => (
                <tr key={model}>
                  {index === 0 ? (
                    <td rowSpan={Object.keys(data.models).length + 1}>{brand}</td>
                  ) : null}
                  <td>{model}</td>
                  <td>{modelData.count}</td>
                  <td>{formatNumber(modelData.value)}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total</strong></td>
                <td>{data.count}</td>
                <td>{formatNumber(totalValue)}</td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DashboardTable;
