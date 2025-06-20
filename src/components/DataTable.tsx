import React from 'react';
import { WeatherData } from '../utils/mockWeather';

type Props = {
  data: WeatherData[];
};

export default function DataTable({ data }: Props) {
  const headers = ['Date Time', 'TEMP (°C)', 'RH (%)', 'RAIN (mm)', 'WS (m/s)', 'WD (°)'];

  return (
    <table border={1} cellPadding={6} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h} style={{ minWidth: 120 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            <td>{d.timestamp}</td>
            <td>{d.temperature.toFixed(1)}</td>
            <td>{d.humidity}</td>
            <td>{d.rainfall}</td>
            <td>{d.windSpeed}</td>
            <td>{d.windDirection}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
