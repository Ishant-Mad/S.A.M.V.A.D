import React, { useState } from 'react';
import axios from 'axios';
import { Search, ArrowRight, Shield, CheckCircle, XCircle, Home, Camera, User, MessageSquare, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const CitizenView = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    if (!query.trim()) return toast.error("Please enter text");
    setLoading(true); setResult(null);
    try {
      const res = await axios.post('http://localhost:5000/api/verify', { query });
      setResult(res.data);
      toast.success("Fact Check Complete");
    } catch (e) { toast.error("Connection Error"); }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto min-h-[calc(100vh-80px)] bg-white shadow-2xl relative border-x border-gray-200 flex flex-col">
      {/* VARTA BRANDING */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 pb-12 rounded-b-[2.5rem] relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="text-yellow-400 fill-yellow-400 w-6 h-6" />
          <h1 className="text-3xl font-black tracking-widest">VARTA</h1>
        </div>
        <p className="text-xs text-blue-200 uppercase font-semibold tracking-wide">Voter Awareness & Real-time Truth Assistant</p>
      </div>

      <div className="px-6 -mt-8 relative z-20 space-y-6 flex-1">
        {/* SEARCH */}
        <div className="bg-white p-2 rounded-xl shadow-lg flex items-center border border-slate-100">
          <Search className="text-slate-400 ml-3 w-5 h-5" />
          <input 
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask VARTA..." className="w-full p-3 outline-none text-slate-700 bg-transparent text-sm font-medium"
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          />
          <button onClick={handleVerify} disabled={loading} className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition shadow-md disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>

        {/* RESULT CARD */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
              <div className={`p-3 flex items-center gap-2 border-b ${result.isMisinfo ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                {result.isMisinfo ? <XCircle className="text-red-600" size={20}/> : <CheckCircle className="text-green-600" size={20}/>}
                <span className={`text-xs font-bold uppercase ${result.isMisinfo ? 'text-red-700' : 'text-green-700'}`}>
                  {result.title}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-700 leading-relaxed font-medium mb-3">{result.fact}</p>
                <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                  <Shield size={10} className="inline mr-1"/> Source: <span className="font-bold text-blue-900">{result.source}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DEFAULT STATE */}
        {!result && (
          <div className="text-center pt-8 opacity-40">
            <Shield size={48} className="mx-auto mb-2 text-slate-300" />
            <p className="text-xs font-bold text-slate-400">Protected by S.A.M.V.A.D</p>
          </div>
        )}
      </div>

      {/* NAV */}
      <div className="border-t p-2 flex justify-around text-[10px] font-bold text-slate-400 bg-white">
        <button onClick={()=>setActiveTab('home')} className={`flex flex-col items-center p-2 ${activeTab==='home'?'text-blue-900':''}`}><Home size={20}/><span>Home</span></button>
        <button onClick={()=>setActiveTab('scan')} className={`flex flex-col items-center p-2 ${activeTab==='scan'?'text-blue-900':''}`}><Camera size={20}/><span>Scan</span></button>
        <button onClick={()=>setActiveTab('profile')} className={`flex flex-col items-center p-2 ${activeTab==='profile'?'text-blue-900':''}`}><User size={20}/><span>Profile</span></button>
      </div>
    </div>
  );
};
export default CitizenView;