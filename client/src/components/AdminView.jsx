import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Users, Check, X, ShieldAlert, Map, LayoutDashboard, TrendingUp, Clock, ChevronDown, Heart, Repeat, Twitter, FileText, RotateCcw, CheckCircle, XCircle, Hash, MessageCircle, Quote } from 'lucide-react';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AdminView = () => {
  // State for switching tabs
  const [activeModule, setActiveModule] = useState('veer'); // 'veer' or 'parakh'
  const [parakhView, setParakhView] = useState('pending'); // 'pending' or 'resolved'
  
  // Data State
  const [stats, setStats] = useState({ queries: 0, blocked: 0, pending: 0 });
  const [queue, setQueue] = useState([]);
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [regionalData, setRegionalData] = useState([]);
  const [tweets, setTweets] = useState([]);
  
  // Filter States
  const [timeScale, setTimeScale] = useState('daily'); // hourly, daily, monthly
  const [expandedReview, setExpandedReview] = useState(null);

  // Fetch Data
  const refreshData = () => {
    axios.get(`${API_URL}/api/stats`).then(res => setStats(res.data));
    axios.get(`${API_URL}/api/queue`).then(res => setQueue(res.data));
    axios.get(`${API_URL}/api/resolved`).then(res => setResolvedIssues(res.data));
    axios.get(`${API_URL}/api/stats/timeseries?scale=${timeScale}`).then(res => setTimeSeriesData(res.data));
    axios.get(`${API_URL}/api/stats/regional`).then(res => setRegionalData(res.data));
    axios.get(`${API_URL}/api/tweets`).then(res => setTweets(res.data));
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, [timeScale]);

  // Handle Approve/Reject
  const handleAction = async (id, action) => {
    await axios.post(`${API_URL}/api/queue/${id}/resolve`, { action });
    toast.success(action === 'approve' ? "Published Fact-Check ✓" : "Issue Rejected");
    setExpandedReview(null);
    setParakhView('resolved'); // Auto-switch to resolved view
    refreshData();
  };

  // Handle Revert
  const handleRevert = async (id) => {
    await axios.post(`${API_URL}/api/resolved/${id}/revert`);
    toast.success("Moved back to pending queue");
    setExpandedReview(null);
    setParakhView('pending');
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
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
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

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Time Series Chart */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-blue-600" size={20} />
                    <h3 className="font-bold text-slate-700">Threat Trends</h3>
                  </div>
                  <select 
                    value={timeScale} 
                    onChange={(e) => setTimeScale(e.target.value)}
                    className="text-xs font-bold border border-slate-200 rounded-lg px-3 py-1.5 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="hourly">Last 24 Hours</option>
                    <option value="daily">Last 30 Days</option>
                    <option value="monthly">Last 12 Months</option>
                  </select>
                </div>
                
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: 'none', 
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#fff'
                      }} 
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                    <Bar dataKey="threats" fill="#ef4444" name="Threats Detected" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="blocked" fill="#22c55e" name="Threats Blocked" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Regional Distribution */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Map className="text-orange-600" size={20} />
                  <h3 className="font-bold text-slate-700">Top Affected States</h3>
                </div>
                
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {regionalData.map((region, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-slate-400">#{idx + 1}</span>
                        <div>
                          <div className="font-bold text-sm text-slate-800">{region.state}</div>
                          <div className="text-xs text-slate-500">{region.threats} threats detected</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                        region.severity === 'HIGH' ? 'bg-red-100 text-red-700' :
                        region.severity === 'MED' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {region.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Regional Threat Distribution */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                <Map className="text-slate-500" size={20} />
                <h3 className="font-bold text-slate-700">Regional Threat Distribution</h3>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 min-h-[400px] flex flex-col items-center justify-center">
                <div className="text-center max-w-xl">
                  <div className="mb-4">
                    <Map size={48} className="text-slate-400 mx-auto" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">
                    Geographic Visualization
                  </h4>
                  <p className="text-sm text-slate-500 mb-6">
                    Interactive map view under development
                  </p>
                  
                  {/* Simple Stats Table */}
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100 border-b border-slate-200">
                        <tr>
                          <th className="text-left px-4 py-2 font-semibold text-slate-600">State</th>
                          <th className="text-right px-4 py-2 font-semibold text-slate-600">Threats</th>
                          <th className="text-center px-4 py-2 font-semibold text-slate-600">Severity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regionalData.map((region, idx) => (
                          <tr key={idx} className="border-b border-slate-100 last:border-0">
                            <td className="px-4 py-2 text-slate-700">{region.state}</td>
                            <td className="px-4 py-2 text-right text-slate-700 font-semibold">{region.threats}</td>
                            <td className="px-4 py-2 text-center">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                region.severity === 'HIGH' ? 'bg-red-100 text-red-700' : 
                                region.severity === 'MED' ? 'bg-orange-100 text-orange-700' : 
                                'bg-green-100 text-green-700'
                              }`}>
                                {region.severity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Malicious Tweets Feed */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Twitter className="text-blue-400" size={20} />
                <h3 className="font-bold text-slate-700">Flagged Content (Live Feed)</h3>
                <span className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">{tweets.length} Active</span>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {tweets.map((tweet) => (
                  <div key={tweet.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition">
                    <div className="flex gap-3">
                      <img src={tweet.authorImage} alt="" className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-sm text-slate-800">{tweet.author}</span>
                          <span className="text-xs text-slate-400">• {tweet.timestamp}</span>
                          <span className={`ml-auto text-[10px] font-bold px-2 py-1 rounded ${
                            tweet.severity === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {tweet.severity}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-3">{tweet.content}</p>
                        <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
                          <span className="flex items-center gap-1"><Heart size={14} /> {tweet.likes}</span>
                          <span className="flex items-center gap-1"><Repeat size={14} /> {tweet.retweets}</span>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded text-xs mb-3">
                          <span className="font-bold text-red-700">⚠️ Detected Issue: </span>
                          <span className="text-red-600">{tweet.detectedIssue}</span>
                        </div>
                        
                        {/* S.A.M.V.A.D Response Indicators */}
                        {tweet.samvadResponse && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="text-green-600" size={14} />
                              <span className="text-xs font-bold text-green-700">S.A.M.V.A.D RESPONSE DEPLOYED</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {/* Reply Indicator */}
                              {tweet.samvadResponse.replied && (
                                <div className="flex-1 min-w-[200px] bg-white border border-green-300 rounded p-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <MessageCircle className="text-blue-600" size={12} />
                                    <span className="text-[10px] font-bold text-slate-600">REPLIED WITH FACTS</span>
                                  </div>
                                  <div className="text-[10px] text-slate-500 mb-1">
                                    by <span className="font-bold text-blue-700">{tweet.samvadResponse.officialAccount}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-400">{tweet.samvadResponse.repliedAt}</div>
                                  <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                                    <span className="flex items-center gap-1">
                                      <Heart size={10} className="text-red-400" /> 
                                      {tweet.samvadResponse.replyEngagement.likes.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Repeat size={10} className="text-green-500" /> 
                                      {tweet.samvadResponse.replyEngagement.retweets.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              )}
                              
                              {/* Repost Indicator */}
                              {tweet.samvadResponse.reposted && (
                                <div className="flex-1 min-w-[200px] bg-white border border-green-300 rounded p-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Quote className="text-purple-600" size={12} />
                                    <span className="text-[10px] font-bold text-slate-600">QUOTE-TWEETED</span>
                                  </div>
                                  <div className="text-[10px] text-slate-500 mb-1">
                                    by <span className="font-bold text-purple-700">{tweet.samvadResponse.officialAccount}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-400">{tweet.samvadResponse.repostedAt}</div>
                                  <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                                    <span className="flex items-center gap-1">
                                      <Heart size={10} className="text-red-400" /> 
                                      {tweet.samvadResponse.repostEngagement.likes.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Repeat size={10} className="text-green-500" /> 
                                      {tweet.samvadResponse.repostEngagement.retweets.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-[10px] text-green-600 font-bold pt-1">
                              ✓ Fact-check deployed • Counter-narrative active
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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

            {/* Tab Switcher */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setParakhView('pending')}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 ${
                  parakhView === 'pending' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300'
                }`}
              >
                <Clock size={18} />
                Pending Review ({queue.length})
              </button>
              <button
                onClick={() => setParakhView('resolved')}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 ${
                  parakhView === 'resolved' 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-green-300'
                }`}
              >
                <CheckCircle size={18} />
                Resolved Issues ({resolvedIssues.length})
              </button>
            </div>

            {/* PENDING VIEW */}
            {parakhView === 'pending' && (
              <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                     <h3 className="font-bold text-slate-700">Verification Tasks</h3>
                   </div>
                   <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded font-bold">{queue.length} Pending</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                   {queue.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                       <Check size={64} className="mb-4 text-green-500"/>
                       <span className="text-lg font-bold text-slate-500">All caught up!</span>
                       <span className="text-sm">No pending items for review.</span>
                     </div>
                   ) : (
                     queue.map(item => (
                       <div key={item.id}>
                         {/* Compact View */}
                         {expandedReview !== item.id && (
                           <div 
                             onClick={() => setExpandedReview(item.id)}
                             className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-orange-300 transition group relative overflow-hidden cursor-pointer"
                           >
                              <div className="absolute left-0 top-0 h-full w-1 bg-orange-500"></div>
                              
                              <div className="flex justify-between mb-3">
                                 <div className="flex items-center gap-2">
                                   <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-wide">{item.time}</span>
                                   <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center gap-1">
                                     <Hash size={10} /> {item.narrativeCount}x spread
                                   </span>
                                 </div>
                                 <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${item.severity==='HIGH'?'bg-red-100 text-red-700':'bg-yellow-100 text-yellow-700'}`}>
                                   {item.severity === 'HIGH' && <ShieldAlert size={10} />}
                                   {item.severity} SEVERITY
                                 </span>
                              </div>
                              
                              <p className="text-base font-semibold text-slate-800 mb-2 leading-relaxed">"{item.text}"</p>
                              <div className="text-xs text-slate-500 mb-3">
                                <span className="font-bold">Narrative:</span> {item.narrativeType}
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Click to view full report & proposed response</span>
                                <ChevronDown className="text-slate-400 group-hover:text-orange-500 transition" size={16} />
                              </div>
                           </div>
                         )}

                         {/* Expanded View */}
                         {expandedReview === item.id && (
                           <RenderFullReport item={item} onAction={handleAction} onClose={() => setExpandedReview(null)} />
                         )}
                       </div>
                     ))
                   )}
                </div>
              </div>
            )}

            {/* RESOLVED VIEW */}
            {parakhView === 'resolved' && (
              <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-green-50">
                   <div className="flex items-center gap-2">
                     <CheckCircle className="text-green-600" size={20} />
                     <h3 className="font-bold text-slate-700">Resolved Issues (History)</h3>
                   </div>
                   <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">{resolvedIssues.length} Total</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                   {resolvedIssues.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                       <FileText size={64} className="mb-4 text-slate-300"/>
                       <span className="text-lg font-bold text-slate-500">No resolved issues yet</span>
                       <span className="text-sm">Processed items will appear here.</span>
                     </div>
                   ) : (
                     resolvedIssues.map(item => (
                       <div key={item.id}>
                         {/* Compact Resolved View */}
                         {expandedReview !== item.id && (
                           <div 
                             onClick={() => setExpandedReview(item.id)}
                             className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition group relative overflow-hidden cursor-pointer"
                           >
                              <div className={`absolute left-0 top-0 h-full w-1 ${item.resolvedAction === 'approve' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              
                              <div className="flex justify-between mb-3">
                                 <div className="flex items-center gap-2">
                                   {item.resolvedAction === 'approve' ? (
                                     <CheckCircle className="text-green-600" size={16} />
                                   ) : (
                                     <XCircle className="text-red-600" size={16} />
                                   )}
                                   <span className="text-xs font-bold text-slate-600">
                                     {item.resolvedAction === 'approve' ? 'PUBLISHED' : 'REJECTED'} • {new Date(item.resolvedAt).toLocaleString()}
                                   </span>
                                   <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                     {item.narrativeCount}x spread
                                   </span>
                                 </div>
                                 <button
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     handleRevert(item.id);
                                   }}
                                   className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded flex items-center gap-1 transition"
                                 >
                                   <RotateCcw size={12} /> Revert
                                 </button>
                              </div>
                              
                              <p className="text-sm font-semibold text-slate-700 mb-2">"{item.text}"</p>
                              <div className="text-xs text-slate-500">
                                <span className="font-bold">Type:</span> {item.narrativeType}
                              </div>
                           </div>
                         )}

                         {/* Expanded Resolved View */}
                         {expandedReview === item.id && (
                           <RenderFullReport 
                             item={item} 
                             isResolved={true}
                             onRevert={handleRevert}
                             onClose={() => setExpandedReview(null)} 
                           />
                         )}
                       </div>
                     ))
                   )}
                </div>
              </div>
            )}
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

const RenderFullReport = ({ item, onAction, onRevert, onClose, isResolved = false }) => (
  <div className="bg-white border-2 border-orange-500 rounded-xl shadow-xl overflow-hidden">
    {/* Header */}
    <div className={`bg-gradient-to-r ${isResolved ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600'} text-white p-6`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-black mb-2">DETAILED REVIEW REPORT</h3>
          {isResolved && (
            <div className="flex items-center gap-2 text-sm">
              {item.resolvedAction === 'approve' ? (
                <span className="bg-white/20 px-3 py-1 rounded font-bold">✓ PUBLISHED</span>
              ) : (
                <span className="bg-white/20 px-3 py-1 rounded font-bold">✗ REJECTED</span>
              )}
              <span className="text-white/80">on {new Date(item.resolvedAt).toLocaleString()}</span>
            </div>
          )}
        </div>
        <button 
          onClick={onClose}
          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-bold transition"
        >
          Close
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold px-2 py-1 rounded ${item.severity==='HIGH'?'bg-red-600':'bg-yellow-600'}`}>
          {item.severity} SEVERITY
        </span>
        <span className="text-xs font-bold px-2 py-1 rounded bg-white/20">
          <Hash size={10} className="inline mr-1" />
          {item.narrativeCount} instances detected
        </span>
      </div>
    </div>

    {/* Full Report Content */}
    <div className="p-6 space-y-6">
      {/* Narrative Type & Count */}
      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
        <label className="text-xs font-bold text-purple-700 uppercase tracking-wide block mb-1">Narrative Category</label>
        <p className="text-base font-black text-purple-900">{item.narrativeType}</p>
        <p className="text-xs text-purple-600 mt-1">This false narrative has been detected <span className="font-bold">{item.narrativeCount} times</span> across multiple platforms</p>
      </div>

      {/* Claim */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Original Claim</label>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-base font-semibold text-slate-800">"{item.fullReport.claim}"</p>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Source Platform</label>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm font-bold text-blue-900">{item.fullReport.platform}</p>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Estimated Reach</label>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-sm font-bold text-purple-900">{item.fullReport.reach}</p>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Detected At</label>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm font-bold text-amber-900">{new Date(item.fullReport.detectedAt).toLocaleString()}</p>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">AI Confidence</label>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm font-bold text-green-900">{item.fullReport.aiConfidence}% Misinformation</p>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">AI Analysis & Reasoning</label>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4">
          <p className="text-sm text-slate-700 leading-relaxed">{item.fullReport.reasoning}</p>
        </div>
      </div>

      {/* Proposed Publication - Only for pending items */}
      {!isResolved && item.fullReport.proposedPublication && (
        <div className="border-2 border-green-200 rounded-xl overflow-hidden bg-green-50">
          <div className="bg-green-600 text-white p-4 flex items-center gap-2">
            <FileText size={20} />
            <div>
              <h4 className="font-black text-sm">PROPOSED FACT-CHECK PUBLICATION</h4>
              <p className="text-xs text-green-100">This will be published if you approve</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="text-xs font-bold text-green-700 uppercase block mb-1">Publication Title</label>
              <p className="text-base font-black text-slate-800">{item.fullReport.proposedPublication.title}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-green-700 uppercase block mb-1">Content</label>
              <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded border border-green-200">{item.fullReport.proposedPublication.content}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-green-700 uppercase block mb-1">Distribution Channels</label>
                <div className="flex flex-wrap gap-1">
                  {item.fullReport.proposedPublication.channels.map((channel, idx) => (
                    <span key={idx} className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-1 rounded">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-green-700 uppercase block mb-1">Expected Reach</label>
                <p className="text-sm font-bold text-green-900 bg-white px-3 py-2 rounded border border-green-200">{item.fullReport.proposedPublication.expectedReach}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Action */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Recommended Action</label>
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
          <p className="text-sm font-bold text-orange-900">{item.fullReport.recommendedAction}</p>
        </div>
      </div>

      {/* Related Links */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Official References</label>
        <div className="flex flex-wrap gap-2">
          {item.fullReport.relatedLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded border border-blue-200 transition"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 border-t border-slate-200 pt-6 mt-6">
        {!isResolved ? (
          <>
            <button 
              onClick={()=>onAction(item.id, 'approve')} 
              className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 shadow-md transition transform active:scale-95"
            >
              <Check size={18}/> PUBLISH FACT-CHECK
            </button>
            <button 
              onClick={()=>onAction(item.id, 'reject')} 
              className="flex-1 py-4 bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 text-sm font-bold rounded-lg flex items-center justify-center gap-2 shadow-md transition transform active:scale-95"
            >
              <X size={18}/> REJECT & DISMISS
            </button>
          </>
        ) : (
          <button 
            onClick={()=>onRevert(item.id)} 
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 shadow-md transition transform active:scale-95"
          >
            <RotateCcw size={18}/> REVERT TO PENDING QUEUE
          </button>
        )}
      </div>
    </div>
  </div>
);

export default AdminView;