import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mockWeatherData, WeatherData } from '../utils/mockWeather';
import DateFilter from '../components/DateFilter';
import DataTable from '../components/DataTable';
import DataChart from '../components/DataChart';
import WindRoseChart from '../components/WindRoseChart';
import { downloadCSV } from '../utils/downloadCSV';

export default function WeatherPage() {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<WeatherData[]>([]);
  const [view, setView] = useState<'table' | 'chart' | 'wind'>('table');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    } else {
      const selected = localStorage.getItem('selectedLocation');
      if (selected) {
        setLocation(selected);
        const locData = mockWeatherData.filter(d => d.station === selected);
        setFilteredData(locData);
      } else {
        router.push('/');
      }
    }
  }, []);

  const handleFilter = (start: string, end: string) => {
    const from = new Date(start);
    const to = new Date(end);
    const result = mockWeatherData.filter(d => {
      const dt = new Date(d.timestamp.replace(' ', 'T'));
      return d.station === location && dt >= from && dt <= to;
    });
    setFilteredData(result);
  };

  return (
    <main style={{ padding: 20 }}>
      <div style={{ textAlign: 'right' }}>
        <button
          onClick={() => {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>
      <h2>Weather Data – {location}</h2>

      <DateFilter onFilter={handleFilter} />

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView('table')}>📋 Table</button>
        <button onClick={() => setView('chart')}>📈 Chart</button>
        <button onClick={() => setView('wind')}>🧭 Wind Rose</button>
        <button onClick={() => downloadCSV('weather.csv', filteredData)} style={{ float: 'right' }}>
          ⬇️ Download CSV
        </button>
      </div>

      {view === 'table' && <DataTable data={filteredData} />}
      {view === 'chart' && <DataChart data={filteredData} />}
      {view === 'wind' && <WindRoseChart data={filteredData} />}
    </main>
  );
}
