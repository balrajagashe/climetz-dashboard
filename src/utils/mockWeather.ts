export type WeatherData = {
  timestamp: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  windDirection: number;
  station: string;
};

const stations = ['Station A', 'Station B', 'Station C'];

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const startDate = new Date('2024-06-01T00:00:00Z');
const hours = 72; // 3 days x 24 hrs

export const mockWeatherData: WeatherData[] = Array.from({ length: hours }, (_, i) => {
  const date = new Date(startDate);
  date.setHours(date.getHours() + i);

  return {
    timestamp: formatDate(date),
    temperature: 25 + (i % 5),
    humidity: 60 + (i % 10),
    rainfall: i % 3 === 0 ? 2.5 : 0,
    windSpeed: 2 + (i % 4),
    windDirection: (i * 15) % 360,
    station: stations[i % stations.length],
  };
});
