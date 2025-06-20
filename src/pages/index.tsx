import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const LOCATIONS = ['Station A', 'Station B', 'Station C'];

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      const saved = localStorage.getItem('selectedLocation');
      if (saved) setLocation(saved);
    }
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setLocation(selected);
    localStorage.setItem('selectedLocation', selected);
  };

  const goTo = (type: 'weather' | 'water') => {
    router.push(`/${type}`);
  };

  if (!isAuthenticated) return null;

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ textAlign: 'right', marginBottom: 10 }}>
        <button
          onClick={() => {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>

      <h1>Select Site</h1>
      <select
        value={location}
        onChange={handleLocationChange}
        style={{ fontSize: 16, padding: 10, minWidth: 200 }}
      >
        <option value="">-- Choose Station --</option>
        {LOCATIONS.map(loc => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {location && (
        <div style={{ marginTop: 40 }}>
          <h2>View Data for: {location}</h2>
          <button
            style={{ padding: '16px 32px', margin: 20, fontSize: 18 }}
            onClick={() => goTo('weather')}
          >
            🌦️ Weather Dashboard
          </button>
          <button
            style={{ padding: '16px 32px', margin: 20, fontSize: 18 }}
            onClick={() => goTo('water')}
          >
            💧 Water Dashboard
          </button>
        </div>
      )}
    </main>
  );
}
