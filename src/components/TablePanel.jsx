import { useRef, useEffect } from 'react';
import useEarthquakeStore from '../store/earthquakeStore'; 
import '../css/Table.css';

const TablePanel = ({ data, columns }) => {
  const { selectedId, setSelectedId } = useEarthquakeStore(); 
  const selectedRef = useRef(null);

  // Scroll to the selected row when selectedId changes
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedId]);

  const formatDate = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const COLUMN_HEADERS = {
    time: 'Time',
    mag: 'Magnitude',
    depth: 'Depth',
    latitude: 'Latitude',
    longitude: 'Longitude',
    place: 'Location',
    id: 'ID',
    status: 'Status',
    type: 'Type',
    title: 'Title',
  };

  const getColumnClass = (col) => {
    if (col === 'time' || col === 'updated') return 'col-time';
    if (col === 'place') return 'col-location';
    return '';
  };

  return (
    <table className="table table-bordered table-hover align-middle" style={{ width: '100%' }}>
      <thead className="table-light">
        <tr style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 1 }}>
          {columns.map((col) => (
            <th key={col} className={getColumnClass(col)}>
              {COLUMN_HEADERS[col] || col.charAt(0).toUpperCase() + col.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className={`table-row-custom ${selectedId === index ? 'table-primary' : ''}`}
            onClick={() => setSelectedId(index)} 
            ref={selectedId === index ? selectedRef : null}
            style={{ cursor: 'pointer' }}
          >
            {columns.map((col) => (
              <td key={col} className={getColumnClass(col)}>
                {col === 'time' || col === 'updated' ? formatDate(row[col]) : row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePanel;
