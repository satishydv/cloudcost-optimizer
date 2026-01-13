
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Alert } from '../types';
import { Bell, AlertTriangle, CheckCircle2, ShieldAlert, MoreHorizontal, Activity, Calendar } from 'lucide-react';
import Skeleton from '../components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await api.getAlerts();
      setAlerts(res);
      setLoading(false);
    };
    load();
  }, []);

  // Loading state handled in JSX

  return (
    <div className="space-y-10 pb-16 relative">
      {/* Atmospheric Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/5 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] pointer-events-none -z-10"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">Anomaly Pulse</h2>
        <p className="text-slate-400/80 font-medium mt-1">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-500 uppercase text-[10px] tracking-[0.2em] font-bold">Heuristic-based detection of cloud cost spikes</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Alerts Sidebar Stats */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden bg-gradient-to-br from-yellow-600/30 via-yellow-900/40 to-yellow-900/60 p-8 rounded-[2.5rem] border border-yellow-500/30 shadow-2xl group"
          >
            {/* Internal Glow Effect */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-500/30 blur-[50px] pointer-events-none group-hover:blur-[70px] transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-400 border border-white/10 shadow-lg mb-4">
                <ShieldAlert size={32} />
              </div>
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.2em] opacity-80 mb-1">Open High-Risk</span>
              {loading ? <Skeleton className="h-12 w-20" variant="yellow" /> : <p className="text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">{alerts.filter(a => a.severity === 'high').length}</p>}
              <p className="text-[10px] text-yellow-400/60 mt-4 font-black uppercase tracking-wider">Critical attention required</p>
            </div>
            {/* Subtle Glass Reflection */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-gradient-to-br from-indigo-600/30 via-indigo-900/40 to-indigo-900/60 p-8 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl group"
          >
            {/* Internal Glow Effect */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/30 blur-[50px] pointer-events-none group-hover:blur-[70px] transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/10 shadow-lg mb-4">
                <Bell size={32} />
              </div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] opacity-80 mb-1">Total Detected</span>
              {loading ? <Skeleton className="h-12 w-20" variant="indigo" /> : <p className="text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">{alerts.length}</p>}
              <p className="text-[10px] text-indigo-400/60 mt-4 font-black uppercase tracking-wider">Historical 90-day window</p>
            </div>
            {/* Subtle Glass Reflection */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          </motion.div>
        </div>

        {/* Main Alerts List */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence>
            {loading ? (
              [1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-3xl" />)
            ) : alerts.length > 0 ? (
              alerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`relative overflow-hidden p-8 rounded-[2.5rem] border backdrop-blur-3xl shadow-2xl transition-all group ${alert.severity === 'high'
                    ? 'bg-gradient-to-br from-yellow-500/10 via-slate-900/40 to-slate-900/60 border-yellow-500/20'
                    : 'bg-gradient-to-br from-amber-500/10 via-slate-900/40 to-slate-900/60 border-amber-500/20'
                    }`}
                >
                  {/* Animated Edge Glow */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.severity === 'high' ? 'bg-yellow-400' : 'bg-amber-500'} shadow-[0_0_15px_rgba(250,204,21,0.5)]`}></div>

                  {/* Internal Atmospheric Glow */}
                  <div className={`absolute -top-24 -right-24 w-64 h-64 ${alert.severity === 'high' ? 'bg-yellow-500/10' : 'bg-amber-500/10'} blur-[80px] pointer-events-none group-hover:opacity-100 transition-opacity opacity-50`}></div>

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform ${alert.severity === 'high' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                        <AlertTriangle size={32} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="font-black text-2xl text-white tracking-tight">{alert.service} Cost Spike</h4>
                          <span className={`text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg ${alert.severity === 'high' ? 'bg-yellow-400 text-slate-900 shadow-yellow-500/20' : 'bg-amber-500 text-slate-900 shadow-amber-500/20'
                            }`}>
                            {alert.severity} Risk
                          </span>
                        </div>
                        <p className="text-slate-400 text-base font-medium mb-4 leading-relaxed max-w-2xl">{alert.reason}</p>
                        <div className="flex items-center space-x-6">
                          <span className="text-xs font-black text-slate-500 flex items-center uppercase tracking-widest">
                            <Calendar size={14} className="mr-2 text-indigo-400" />
                            Detected: <span className="text-slate-300 ml-1 font-mono">{alert.date}</span>
                          </span>
                          <span className="text-xs font-black text-slate-500 flex items-center uppercase tracking-widest">
                            <Activity size={14} className="mr-2 text-emerald-400" />
                            Agent: <span className="text-slate-300 ml-1 font-mono text-[10px]">Heuristic-v7.4</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-4">
                      <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/10">
                        <MoreHorizontal size={20} />
                      </button>
                      <div className={`text-[10px] font-black px-3 py-1 rounded-lg border flex items-center ${alert.severity === 'high' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-400/5' : 'border-amber-500/30 text-amber-400 bg-amber-500/5'
                        }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-2"></span>
                        Pending Action
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="glass-panel p-20 text-center rounded-3xl">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-bold mb-2">Systems Nominal</h3>
                <p className="text-slate-500">No anomalies detected within the threshold parameters.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
