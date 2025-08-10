import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  TimeScale
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend, TimeScale);

export default function MoodHistory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/moods`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const last7 = items.slice(-7);
  const labels = last7.map(i => new Date(i.timestamp).toLocaleDateString('en-IN', { weekday: 'short' }));
  const moodMap = { '😄': 4, '😐': 3, '😞': 2, '😢': 1, '😡': 0 };
  const dataSet = last7.map(i => moodMap[i.mood] ?? 2);

  const data = {
    labels,
    datasets: [
      {
        label: 'Mood Level',
        data: dataSet,
        fill: true,
        backgroundColor: 'rgba(16,185,129,0.15)',
        borderColor: 'rgb(16,185,129)',
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(16,185,129)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        min: 0,
        max: 4,
        ticks: { callback: v => Object.keys(moodMap).find(k => moodMap[k] === v) || v }
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
      <h2 className="text-2xl font-semibold text-slate-700">Mood History (Last 7 entries)</h2>
      {loading ? <p className="text-slate-500">Loading...</p> : (
        last7.length === 0 ? <p className="text-slate-500">No mood data yet.</p> : <Line data={data} options={options} />
      )}
      <p className="text-xs text-slate-400">Emojis mapped to a scale for visualization.</p>
    </div>
  );
}
