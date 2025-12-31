import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Users, Check, X, ShieldAlert, Map, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminView = () => {
  // State for switching tabs
  const [activeModule, setActiveModule] = useState('veer'); // 'veer' or 'parakh'
  
  // Data State
  const [stats, setStats] = useState({ queries: 0, blocked: 0, pending: 0 });
  const [queue, setQueue] = useState([]);

  // Fetch Data
  const refreshData = () => {
    axios.get('http://localhost:5000/api/stats').then(res => setStats(res.data));
    axios.get('http://localhost:5000/api/queue').then(res => setQueue(res.data));
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, []);

  // Handle Approve/Reject
  const handleAction = async (id, action) => {
    await axios.post(`http://localhost:5000/api/queue/${id}/resolve`, { action });
    toast.success(action === 'approve' ? "Published by PARAKH" : "Rejected");
    refreshData();
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-slate-100">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 text-slate-300 p-6 flex flex-col shadow-2xl z-10">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Select Module</div>
        
        <div className="space-y-3">
          {/* VEER BUTTON */}
          <button 
            onClick={() => setActiveModule('veer')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 transition-all duration-200 ${
              activeModule === 'veer' 
              ? 'bg-blue-900/50 text-white border-blue-500 shadow-lg' 
              : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Activity size={20} className={activeModule === 'veer' ? 'text-blue-400' : ''} /> 
            <div className="text-left">
              <span className="font-bold text-sm block">VEER Engine</span>
              <span className="text-[10px] opacity-60 font-medium">Crawler & Stats</span>
            </div>
          </button>

          {/* PARAKH BUTTON */}
          <button 
            onClick={() => setActiveModule('parakh')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 transition-all duration-200 ${
              activeModule === 'parakh' 
              ? 'bg-orange-900/20 text-white border-orange-500 shadow-lg' 
              : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users size={20} className={activeModule === 'parakh' ? 'text-orange-400' : ''} /> 
            <div className="text-left">
              <span className="font-bold text-sm block">PARAKH Portal</span>
              <span className="text-[10px] opacity-60 font-medium">Human Review</span>
            </div>
          </button>
        </div>

        {/* SYSTEM STATUS FOOTER */}
        <div className="mt-auto p-4 bg-slate-800 rounded-lg border border-slate-700">
           <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">System Status</div>
           <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ONLINE
           </div>
        </div>
      </aside>


      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        
        {/* === MODULE 1: VEER ENGINE (CRAWLER & STATS) === */}
        {activeModule === 'veer' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                <Activity className="text-blue-600" size={32}/> 
                VEER 
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Virtual Engine for Eliminating Rumors • Live Monitoring Active</p>
            </header>

            {/* VEER Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <StatCard label="Rumors Crawled" value={stats.queries} color="text-blue-600" icon={<Map size={24} className="text-blue-200"/>} />
              <StatCard label="Threats Neutralized" value={stats.blocked} color="text-green-600" icon={<ShieldAlert size={24} className="text-green-200"/>} />
              <StatCard label="Pending Review" value={stats.pending} color="text-orange-500" icon={<Users size={24} className="text-orange-200"/>} />
            </div>

            {/* VEER Heatmap Simulation */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden h-96 flex flex-col">
              <div className="flex justify-between items-center mb-4 z-10">
                <h3 className="font-bold text-slate-700">Live Threat Heatmap</h3>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold animate-pulse">LIVE FEED</span>
              </div>
              
              {/* Abstract Map UI */}
              <div className="flex-1 bg-slate-50 rounded border border-slate-100 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                 <div className="font-black text-8xl text-slate-200 select-none tracking-widest">INDIA</div>
                 
                 {/* Animated Hotspots */}
                 <div className="absolute top-1/3 left-1/2 group cursor-pointer">
                    <div className="w-24 h-24 bg-red-500 rounded-full animate-ping opacity-20 absolute -top-10 -left-10"></div>
                    <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white relative z-10 shadow-xl"></div>
                    <div className="absolute left-6 top-0 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded w-max opacity-0 group-hover:opacity-100 transition shadow-lg z-20">
                      High Severity: UP Region
                    </div>
                 </div>

                 <div className="absolute bottom-1/3 left-1/3 group cursor-pointer">
                    <div className="w-16 h-16 bg-orange-500 rounded-full animate-pulse opacity-20 absolute -top-6 -left-6"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white relative z-10 shadow-xl"></div>
                 </div>
              </div>
            </div>
          </div>
        )}


        {/* === MODULE 2: PARAKH PORTAL (HUMAN QUEUE) === */}
        {activeModule === 'parakh' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
            <header className="mb-6 border-b border-orange-200 pb-4 bg-orange-50 -m-8 mb-6 p-8 shadow-sm">
              <h2 className="text-3xl font-black text-orange-900 flex items-center gap-3">
                <Users className="text-orange-600" size={32}/> 
                PARAKH 
              </h2>
              <p className="text-sm font-bold text-orange-700 mt-1 uppercase tracking-wide">Portal for Accuracy, Review & Authenticity by Knowledgeable Humans</p>
            </header>

            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              {/* Queue Header */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                   <h3 className="font-bold text-slate-700">Verification Tasks</h3>
                 </div>
                 <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded font-bold">{queue.length} Pending</span>
              </div>

              {/* Queue List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                 {queue.length === 0 ? (
                   <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                     <Check size={64} className="mb-4 text-green-500"/>
                     <span className="text-lg font-bold text-slate-500">All caught up!</span>
                     <span className="text-sm">No pending items for review.</span>
                   </div>
                 ) : (
                   queue.map(item => (
                     <div key={item.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-orange-300 transition group relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-1 bg-orange-500"></div>
                        
                        <div className="flex justify-between mb-3">
                           <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-wide">{item.time}</span>
                           <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${item.severity==='HIGH'?'bg-red-100 text-red-700':'bg-yellow-100 text-yellow-700'}`}>
                             {item.severity === 'HIGH' && <ShieldAlert size={10} />}
                             {item.severity} SEVERITY
                           </span>
                        </div>
                        
                        <p className="text-base font-semibold text-slate-800 mb-6 leading-relaxed">"{item.text}"</p>
                        
                        <div className="flex gap-4 border-t border-slate-50 pt-4">
                           <button 
                             onClick={()=>handleAction(item.id, 'approve')} 
                             className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition transform active:scale-95"
                           >
                             <Check size={16}/> VERIFY & PUBLISH
                           </button>
                           <button 
                             onClick={()=>handleAction(item.id, 'reject')} 
                             className="flex-1 py-3 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition transform active:scale-95"
                           >
                             <X size={16}/> REJECT AS FAKE
                           </button>
                        </div>
                     </div>
                   ))
                 )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

const StatCard = ({ label, value, color, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-4xl font-black ${color}`}>{value.toLocaleString()}</div>
    </div>
    <div className="p-3 bg-slate-50 rounded-full">{icon}</div>
  </div>
);

export default AdminView;