// src/components/StackedChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';
import { ResponsiveContainer } from 'recharts'; // To make the chart responsive

const StackedBarChart = ({ cars }) => {
  const brandModels = cars.reduce((acc, car) => {
    if (!acc[car.Model]) {
      acc[car.Model] = { name: car.Model, count: 0 };
    }
    acc[car.Model].count += 1;
    return acc;
  }, {});

  const data = Object.values(brandModels);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8">
          <LabelList dataKey="count" position="top" /> {/* Data labels */}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
