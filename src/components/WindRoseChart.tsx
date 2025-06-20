import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip, Legend } from 'recharts';
import { WeatherData } from '../utils/mockWeather';

type Props = {
  data: WeatherData[];
};

type RoseBin = {
  direction: string;
  avgSpeed: number;
};

export default function WindRoseChart({ data }: Props) {
  const bins = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  const getBin = (deg: number) => {
    const i = Math.round(deg / 45) % 8;
    return bins[i];
  };

  const grouped = data.reduce((acc: Record<string, number[]>, entry) => {
    const bin = getBin(entry.windDirection);
    if (!acc[bin]) acc[bin] = [];
    acc[bin].push(entry.windSpeed);
    return acc;
  }, {});

  const roseData: RoseBin[] = bins.map(bin => {
    const speeds = grouped[bin] || [];
    const avg = speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
    return { direction: bin, avgSpeed: parseFloat(avg.toFixed(2)) };
  });

  return (
    <div style={{ width: '100%', height: 400 }}>
      <RadarChart outerRadius={120} width={500} height={400} data={roseData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="direction" />
        <PolarRadiusAxis angle={30} domain={[0, Math.max(...roseData.map(d => d.avgSpeed)) + 1]} />
        <Radar name="Avg Wind Speed" dataKey="avgSpeed" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip />
        <Legend />
      </RadarChart>
    </div>
  );
}
