import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import CrisisModal from '../components/CrisisModal';

const moods = ['😄','😐','😞','😢','😡'];

export default function MoodCheck() {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showCrisis, setShowCrisis] = useState(false);

  const submitMood = async () => {
    if (!selectedMood) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/mood`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: selectedMood, note })
      });
      const data = await res.json();
      setResult(data);
      if (data?.analysis?.risk >= 0.8) {
        setShowCrisis(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 space-y-8">
      <h2 className="text-2xl font-semibold text-slate-700">How are you feeling today?</h2>
      <div className="grid grid-cols-5 gap-4">
        {moods.map(m => (
          <button key={m} onClick={() => setSelectedMood(m)}
            className={`text-3xl md:text-4xl p-4 rounded-xl border bg-white shadow-sm hover:shadow transition ${selectedMood===m ? 'ring-4 ring-emerald-300 border-emerald-400' : 'border-slate-200'}`}>{m}</button>
        ))}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600">Add a note (optional)</label>
        <textarea value={note} onChange={e=>setNote(e.target.value)} rows={4}
          placeholder="Anything on your mind?" className="w-full rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-emerald-400/40 focus:ring-2 text-sm p-3 resize-y bg-white"/>
      </div>
      <div className="flex items-center gap-4">
        <button disabled={!selectedMood || loading} onClick={submitMood}
          className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 shadow">
          {loading ? 'Saving...' : 'Submit'}
        </button>
        {result && (
          <div className="text-sm text-slate-600 space-y-0.5">
            {result.analysis && (
              <>
                <p>Sentiment: <span className="font-medium text-slate-800">{result.analysis.sentiment}</span></p>
                <p>Score: <span className="font-medium text-slate-800">{(result.analysis.score ?? 0).toFixed(2)}</span></p>
                <p>Risk: <span className="font-medium text-slate-800">{(result.analysis.risk ?? 0).toFixed(2)}</span></p>
              </>
            )}
          </div>
        )}
      </div>
      <CrisisModal open={showCrisis} risk={result?.analysis?.risk || 0} onClose={()=>setShowCrisis(false)} />
    </div>
  );
}
