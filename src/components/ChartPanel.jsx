import React, { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import useEarthquakeStore from '../store/earthquakeStore'; 
const NUMERIC_FIELDS = ['mag', 'depth', 'latitude', 'longitude'];
const AXIS_LABELS = {
  mag: 'Magnitude',
  depth: 'Depth',
  latitude: 'Latitude',
  longitude: 'Longitude',
};

const ChartPanel = ({ data }) => {
  const [xAxis, setXAxis] = useState('mag');
  const [yAxis, setYAxis] = useState('depth');
  
  const { selectedId, setSelectedId } = useEarthquakeStore();

  // Add x and y props based on current axis selections
  const chartData = data.map((item, index) => ({
    ...item,
    x: parseFloat(item[xAxis]),
    y: parseFloat(item[yAxis]),
    id: index,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: 'white', border: '1px solid #ccc', padding: 10, fontSize: 12 }}>
          <p><strong>Location:</strong> {data.place || 'Unknown'}</p>
          <p><strong>{AXIS_LABELS[xAxis]}:</strong> {data.x}</p>
          <p><strong>{AXIS_LABELS[yAxis]}:</strong> {data.y}</p>
          <p><strong>Time:</strong> {new Date(data.time).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-3 bg-white rounded shadow">
      <div className="mb-3 d-flex gap-3 align-items-center">
        <label className="form-label mb-0">
          X-Axis:
          <select
            className="form-select form-select-sm d-inline w-auto ms-2"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
          >
            {NUMERIC_FIELDS.map(field => <option key={field} value={field}>{AXIS_LABELS[field]}</option>)}
          </select>
        </label>

        <label className="form-label mb-0">
          Y-Axis:
          <select
            className="form-select form-select-sm d-inline w-auto ms-2"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
          >
            {NUMERIC_FIELDS.map(field => <option key={field} value={field}>{AXIS_LABELS[field]}</option>)}
          </select>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            name={xAxis}
            label={{ value: AXIS_LABELS[xAxis], position: 'insideBottom', offset: -5 }}
            type="number"
          />
          <YAxis
            dataKey="y"
            name={yAxis}
            label={{ value: AXIS_LABELS[yAxis], angle: -90, position: 'insideLeft' }}
            type="number"
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            name="Earthquakes"
            data={chartData}
            fill="#0d6efd"
            shape={(props) => {
              const { cx, cy, payload } = props;
              const isSelected = selectedId === payload.id;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 10 : 5}
                  fill={isSelected ? 'red' : '#0d6efd'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedId(payload.id)}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPanel;
