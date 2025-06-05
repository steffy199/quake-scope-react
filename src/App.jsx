import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import ChartPanel from "./components/ChartPanel";
import TablePanel from "./components/TablePanel";
import './App.css';

const CSV_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";
const CHUNK_SIZE = 100;

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const scrollRef = useRef(null);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (result) => {
        const filtered = result.data
          .map((row, index) => ({ ...row, globalIndex: index }))
          .filter(row => row.latitude && row.longitude && row.mag && row.depth);
        setColumns(Object.keys(filtered[0]));
        setData(filtered);
        setLoading(false);
      }
    });
  }, []);

  // Infinite scroll handler
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setVisibleCount(prev => Math.min(prev + CHUNK_SIZE, data.length));
    }
  };

  if (loading)
  return (
   <div className="d-flex vh-100 justify-content-center align-items-center">
  <div className="spinner-border text-primary" role="status" style={{ width: 48, height: 48 }} />
  <span className="ms-3 fs-5">Loading data...</span>
</div>
  );

  const visibleData = data.slice(0, visibleCount);

  return (
    <div className="container-fluid py-4 px-5 bg-light" style={{ minHeight: '100vh' }}>
      <h2 className="text-center text-primary mb-3">QuakeScope — Earthquake Dashboard</h2>

      <div className="dashboard-container" style={{ display: 'flex', gap: '1rem' }}>
        <div className="dashboard-panel chart-panel" style={{ flex: 1 }}>
          <div className="card-header bg-primary text-white fw-semibold">Earthquake Scatter Plot</div>
          <div className="card-body">
            <ChartPanel data={visibleData} />
          </div>
        </div>

        <div className="dashboard-panel table-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="card-header bg-dark text-white fw-semibold">Data Table</div>
          <div
            className="card-body p-0 flex-grow-1"
            style={{ maxHeight: '400px', overflowY: 'auto' }}
            onScroll={handleScroll}
            ref={scrollRef}
          >
            <TablePanel data={visibleData} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
