import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { WeatherData } from '../utils/mockWeather';

type Props = {
  data: WeatherData[];
};

export default function DataChart({ data }: Props) {
  return (
    <div style={{ width: '100%' }}>
      <h3>Temperature & Humidity</h3>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" minTickGap={20} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="TEMP (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#387908" name="RH (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h3>Rainfall</h3>
      <div style={{ height: 200, marginTop: 30 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" minTickGap={20} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rainfall" fill="#007bff" name="Rainfall (mm)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
