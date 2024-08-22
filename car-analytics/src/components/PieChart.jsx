// src/components/PieChartComponent.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { ResponsiveContainer } from 'recharts'; // To make the chart responsive

const PieChartComponent = ({ cars }) => {
  // Aggregate data by model
  const modelCounts = cars.reduce((acc, car) => {
    if (!acc[car.Model]) {
      acc[car.Model] = { name: car.Model, count: 0 };
    }
    acc[car.Model].count += 1;
    return acc;
  }, {});

  const data = Object.values(modelCounts);

  // Define colors for each segment
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733', '#C70039'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          outerRadius={120}
          fill="#8884d8"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Data label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
