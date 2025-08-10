import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
      <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-sky-600 text-transparent bg-clip-text">MindCare</h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          A gentle space to track your daily mood, reflect, and spot early signs of emotional strain. Designed for Indian college students to build healthier mental habits.
        </p>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">Your data stays anonymous. We only use it to show you patterns and provide timely guidance.</p>
        <button onClick={() => navigate('/mood')} className="px-8 py-3 rounded-full bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">
          Start Mood Check
        </button>
      </div>
    </section>
  );
}
