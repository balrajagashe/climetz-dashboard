import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mockWaterData, WaterData } from '../utils/mockWater';
import DateFilter from '../components/DateFilter';
import WaterTable from '../components/WaterTable';
import { downloadCSV } from '../utils/downloadCSV';

export default function WaterPage() {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<WaterData[]>([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    } else {
      const selected = localStorage.getItem('selectedLocation');
      if (selected) {
        setLocation(selected);
        const locData = mockWaterData.filter(d => d.station === selected);
        setFilteredData(locData);
      } else {
        router.push('/');
      }
    }
  }, []);

  const handleFilter = (start: string, end: string) => {
    const from = new Date(start);
    const to = new Date(end);
    const result = mockWaterData.filter(d => {
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
      <h2>Water Level – {location}</h2>

      <DateFilter onFilter={handleFilter} />

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => downloadCSV('water.csv', filteredData)} style={{ float: 'right' }}>
          ⬇️ Download CSV
        </button>
      </div>

      <WaterTable data={filteredData} />
    </main>
  );
}
