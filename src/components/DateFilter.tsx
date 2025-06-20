import React, { useState } from 'react';

type Props = {
  onFilter: (start: string, end: string) => void;
};

export default function DateFilter({ onFilter }: Props) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const applyFilter = () => {
    if (start && end) {
      onFilter(start, end);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ marginRight: 10 }}>
        From:{' '}
        <input
          type="datetime-local"
          value={start}
          onChange={e => setStart(e.target.value)}
        />
      </label>
      <label style={{ marginRight: 10 }}>
        To:{' '}
        <input
          type="datetime-local"
          value={end}
          onChange={e => setEnd(e.target.value)}
        />
      </label>
      <button onClick={applyFilter}>Apply Filter</button>
    </div>
  );
}
