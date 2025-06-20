export type WaterData = {
  timestamp: string;
  level: number;
  station: string;
};

const stations = ['Station A', 'Station B', 'Station C'];

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const startDate = new Date('2024-06-01T00:00:00Z');
const hours = 72;

export const mockWaterData: WaterData[] = Array.from({ length: hours }, (_, i) => {
  const date = new Date(startDate);
  date.setHours(date.getHours() + i);

  return {
    timestamp: formatDate(date),
    level: 1.5 + (i % 10) * 0.1,
    station: stations[i % stations.length],
  };
});
