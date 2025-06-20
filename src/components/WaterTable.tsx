import React from 'react';
import { WaterData } from '../utils/mockWater';

type Props = {
  data: WaterData[];
};

export default function WaterTable({ data }: Props) {
  return (
    <table border={1} cellPadding={6} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: 160 }}>Date Time</th>
          <th style={{ minWidth: 120 }}>Water Level (m)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            <td>{d.timestamp}</td>
            <td>{d.level.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
