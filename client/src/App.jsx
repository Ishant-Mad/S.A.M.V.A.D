import React, { useState } from 'react';
import CitizenView from './components/CitizenView';
import AdminView from './components/AdminView';
import { Toaster } from 'react-hot-toast';

function App() {
  const [view, setView] = useState('citizen');

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50">
      <Toaster position="top-center" />
      
      {/* S.A.M.V.A.D HEADER */}
      <div className="bg-white border-b-4 border-orange-500 px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-black tracking-widest text-blue-900">S.A.M.V.A.D.</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            System for Automated Management of Voter Awareness & Data
          </p>
        </div>

        {/* DEMO SWITCHER */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
          <button 
            onClick={() => setView('citizen')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${view === 'citizen' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
          >
            VARTA (Citizen)
          </button>
          <button 
            onClick={() => setView('admin')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${view === 'admin' ? 'bg-blue-900 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
          >
            PARAKH (Admin)
          </button>
        </div>
      </div>

      {view === 'citizen' ? <CitizenView /> : <AdminView />}
    </div>
  );
}

export default App;