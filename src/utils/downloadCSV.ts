export function downloadCSV(filename: string, data: any[]) {
  if (!data.length) return;

  const keys = Object.keys(data[0]);
  const rows = data.map(row =>
    keys.map(k => JSON.stringify(row[k] ?? '')).join(',')
  );
  const csvContent = [keys.join(','), ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
}
