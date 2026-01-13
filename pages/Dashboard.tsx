
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { KpiData, DailyTotal } from '../types';
import { calculateForecast } from '../services/forecasting';
import KpiCard from '../components/KpiCard';
import Skeleton from '../components/Skeleton';
import { DollarSign, Activity, Server, Zap, Globe, Cpu, Info, BarChart as BarChartIcon, Shield } from 'lucide-react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<KpiData | null>(null);
  const [dailyData, setDailyData] = useState<DailyTotal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [kpiRes, dailyRes] = await Promise.all([api.getKpis(), api.getDailyCosts()]);
        setKpis(kpiRes);
        setDailyData(dailyRes.slice(-30)); // Last 30 days
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading && !dailyData.length) {
    // Initial load handled by inner skeletons for better UX
  }

  const lastDay = dailyData[dailyData.length - 1];
  const serviceData = (kpis && lastDay) ? (Object.entries(lastDay.services) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value })) : [];

  const avgDaily = dailyData.length > 0
    ? dailyData.reduce((sum, d) => sum + d.totalCost, 0) / dailyData.length
    : 0;

  const forecast = calculateForecast(dailyData);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">Financial Overview</h2>
          <p className="text-slate-400/80 flex items-center mt-1">
            <Globe size={14} className="mr-2 text-emerald-500/60" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-500">Active monitoring across 12 global regions</span>
          </p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
          <button className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all">Last 30 Days</button>
          <button className="px-4 py-2 text-xs font-bold rounded-xl text-slate-400 hover:text-white transition-all">Last 90 Days</button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <Skeleton className="h-40" variant="indigo" />
            <Skeleton className="h-40" variant="purple" />
            <Skeleton className="h-40" variant="emerald" />
            <Skeleton className="h-40" variant="rose" />
          </>
        ) : (
          <>
            <KpiCard
              label="Today's Expenditure"
              value={`$${kpis?.todaySpend.toFixed(2)}`}
              change={kpis?.costChangePercent}
              icon={DollarSign}
              delay={0.1}
              variant="indigo"
            />
            <KpiCard
              label="MTD Actual"
              value={`$${forecast.mtd.toFixed(0)}`}
              icon={Activity}
              delay={0.2}
              variant="purple"
            />
            <KpiCard
              label="EOM Forecast"
              value={`$${forecast.forecast.toFixed(0)}`}
              icon={Zap}
              delay={0.3}
              trend="up"
              change={((forecast.forecast / (forecast.mtd || 1)) - 1) * 100}
              variant="emerald"
            />
            <KpiCard
              label="Avg Daily Cost"
              value={`$${forecast.avgDaily.toFixed(0)}`}
              icon={Cpu}
              delay={0.4}
              variant="rose"
            />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-slate-900/40 to-slate-900/60 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl group"
        >
          {/* Inner Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none"></div>
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300">
              <Activity className="text-indigo-400 mr-2" size={20} />
              Spending Velocity
            </h4>
            <div className="flex items-center space-x-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
              <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-wider">LIVE STREAM</span>
            </div>
          </div>
          <div className="h-[350px]">
            {loading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis
                    dataKey="date"
                    stroke="#475569"
                    fontSize={10}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v.split('-').slice(1).join('/')}
                  />
                  <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f1715', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px', padding: '12px' }}
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalCost"
                    stroke="url(#strokeGradient)"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorCost)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-slate-900/60 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl group"
        >
          {/* Inner Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[80px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
          <h4 className="text-lg font-bold mb-8 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-300">
            <Server className="text-emerald-400 mr-2" size={20} />
            Resource Distribution
          </h4>
          <div className="h-[320px]">
            {loading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={80} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#0f1715', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                    {serviceData.map((entry, index) => {
                      const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6'];
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                          className="transition-all duration-500 hover:opacity-80"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-4 pt-6 border-t border-white/5 space-y-4">
            {loading ? (
              [1, 2, 3].map(i => <Skeleton key={i} className="h-4 w-full" />)
            ) : (
              serviceData.slice(0, 3).map((item, idx) => (
                <div key={item.name} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-emerald-500' : 'bg-slate-700'}`}></span>
                    <span className="text-xs text-slate-400 font-mono group-hover:text-slate-200 transition-colors">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-200 tracking-tighter">${item.value.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* How it Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-12 space-y-6"
      >
        <div className="flex items-center space-x-3">
          <Info className="text-emerald-500" size={20} />
          <h3 className="text-xl font-bold text-white uppercase tracking-wider text-xs opacity-50">Methodology</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-slate-900/60 rounded-[2rem] border border-white/10 hover:border-emerald-500/30 transition-all group shadow-2xl">
            {/* Inner Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 blur-[40px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
            <Zap className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform relative z-10" size={24} />
            <h4 className="text-sm font-bold text-white mb-2 relative z-10">Real-time Analysis</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed font-mono uppercase relative z-10">
              Hourly consumption scans across all connected providers.
            </p>
          </div>

          <div className="p-8 relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-slate-900/40 to-slate-900/60 rounded-[2rem] border border-white/10 hover:border-blue-500/30 transition-all group shadow-2xl">
            {/* Inner Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 blur-[40px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
            <BarChartIcon className="text-blue-400 mb-4 group-hover:scale-110 transition-transform relative z-10" size={24} />
            <h4 className="text-sm font-bold text-white mb-2 relative z-10">Statistical Baseline</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed font-mono uppercase relative z-10">
              7-day rolling average to establish "normal" patterns.
            </p>
          </div>

          <div className="p-8 relative overflow-hidden bg-gradient-to-br from-violet-500/10 via-slate-900/40 to-slate-900/60 rounded-[2rem] border border-white/10 hover:border-violet-500/30 transition-all group shadow-2xl">
            {/* Inner Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-500/5 blur-[40px] pointer-events-none group-hover:bg-violet-500/20 transition-all duration-700"></div>
            <Shield className="text-violet-400 mb-4 group-hover:scale-110 transition-transform relative z-10" size={24} />
            <h4 className="text-sm font-bold text-white mb-2 relative z-10">Threshold Filter</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed font-mono uppercase relative z-10">
              Current Sensitivity: 25% Increase | Min Cost: $500
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
