import React from 'react';

const helplines = [
  { name: 'AASRA', number: '91-9820466726' },
  { name: 'iCall', number: '9152987821' },
  { name: 'Snehi', number: '9582208181' }
];

export default function CrisisModal({ open, onClose, risk }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg border border-rose-100 animate-scale-in">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-rose-600">High Emotional Risk Detected</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your responses indicate elevated emotional distress (risk score {(risk*100).toFixed(0)}%).
            You are not alone. Please reach out to someone you trust or use one of the helplines below.
          </p>
          <ul className="divide-y">
            {helplines.map(h => (
              <li key={h.number} className="py-2 flex items-center justify-between">
                <span className="font-medium text-slate-700">{h.name}</span>
                <a href={`tel:${h.number}`} className="text-emerald-600 font-semibold hover:underline tracking-wide">{h.number}</a>
              </li>
            ))}
          </ul>
          <div className="flex justify-end pt-2">
            <button onClick={onClose} className="px-4 py-2 text-sm rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium">Close</button>
          </div>
          <p className="text-[11px] text-slate-400">If you are in immediate danger, contact emergency services.</p>
        </div>
      </div>
    </div>
  );
}
