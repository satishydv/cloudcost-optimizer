
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { DailyTotal } from '../types';
import { Search, Filter, Download, Calendar, BarChart as BarChartIcon, Activity, Cpu, Database, TrendingUp, Globe } from 'lucide-react';
import Skeleton from '../components/Skeleton';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const Analysis: React.FC = () => {
  const [data, setData] = useState<DailyTotal[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string, cost: number }[]>([]);
  const [filteredData, setFilteredData] = useState<DailyTotal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [dailyRes, monthlyRes] = await Promise.all([
        api.getDailyCosts(),
        api.getMonthlyCosts()
      ]);
      const sorted = [...dailyRes].reverse();
      setData(sorted);
      setFilteredData(sorted);
      setMonthlyData(monthlyRes);
      setLoading(false);
    };
    load();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = data.filter(d => d.date.includes(term));
    setFilteredData(filtered);
  };

  // Initial loading logic handled by component-level skeletons

  return (
    <div className="space-y-10 pb-16 relative">
      {/* Atmospheric Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] pointer-events-none -z-10"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">Deep Cost Analytics</h2>
          <p className="text-slate-400/80 font-medium mt-1">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-500 uppercase text-[10px] tracking-[0.2em] font-bold">Atomic-level visibility into cloud expenditures</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-emerald-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search resource telemetry..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 w-72 text-white backdrop-blur-md transition-all placeholder:text-slate-600"
            />
          </div>
          <button className="flex items-center space-x-2 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 text-sm font-bold hover:bg-white/10 transition-all backdrop-blur-md text-slate-300">
            <Filter size={18} className="text-emerald-400" />
            <span>Smart Filters</span>
          </button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center space-x-2 px-8 py-3 rounded-full text-white font-black text-sm transition-all overflow-hidden group shadow-[0_10px_20px_rgba(244,63,94,0.3)]"
          >
            {/* Crystal Base Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-rose-400 to-rose-600"></div>

            {/* Glass Gloss Overlay */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

            {/* Inner Highlight Border */}
            <div className="absolute inset-[1px] rounded-full border border-white/20 pointer-events-none"></div>

            <Download size={18} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
            <span className="relative z-10 drop-shadow-md">Generate PDF Report</span>
          </motion.button>
        </div>
      </div>

      {/* Metric Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Analyzed',
            value: `$${data.reduce((acc, curr) => acc + curr.totalCost, 0).toLocaleString()}`,
            icon: Database,
            gradient: 'from-indigo-600/30 via-indigo-900/40 to-indigo-900/60',
            glow: 'bg-indigo-500/20',
            border: 'border-indigo-500/30',
            iconColor: 'text-indigo-400'
          },
          {
            label: 'Active Clusters',
            value: '14 Units',
            icon: Activity,
            gradient: 'from-emerald-600/30 via-emerald-900/40 to-emerald-900/60',
            glow: 'bg-emerald-500/20',
            border: 'border-emerald-500/30',
            iconColor: 'text-emerald-400'
          },
          {
            label: 'Efficiency Score',
            value: '94.2%',
            icon: TrendingUp,
            gradient: 'from-blue-600/30 via-blue-900/40 to-blue-900/60',
            glow: 'bg-blue-500/20',
            border: 'border-blue-500/30',
            iconColor: 'text-blue-400'
          },
          {
            label: 'Cloud Footprint',
            value: '4 Regions',
            icon: Globe,
            gradient: 'from-purple-600/30 via-purple-900/40 to-purple-900/60',
            glow: 'bg-purple-500/20',
            border: 'border-purple-500/30',
            iconColor: 'text-purple-400'
          },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay: 0.05 * i, type: 'spring', stiffness: 300 }}
            className={`relative overflow-hidden p-6 rounded-[2.5rem] border ${metric.border} bg-gradient-to-br ${metric.gradient} backdrop-blur-3xl group shadow-2xl`}
          >
            {/* Internal Glow Effect */}
            <div className={`absolute -top-12 -right-12 w-24 h-24 ${metric.glow} blur-[40px] pointer-events-none group-hover:blur-[60px] transition-all duration-700`}></div>

            <div className="relative z-10 flex items-center space-x-4">
              <div className={`w-14 h-14 ${metric.glow} rounded-2xl flex items-center justify-center ${metric.iconColor} border border-white/10 shadow-lg`}>
                <metric.icon size={28} />
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1 ${metric.iconColor}`}>{metric.label}</p>
                <p className="text-2xl font-black text-white drop-shadow-md">{metric.value}</p>
              </div>
            </div>

            {/* Subtle Glass Reflection */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {/* Monthly Trend Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-rose-500/10 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group"
      >
        {/* Decorative Energy Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500/20 blur-[100px] pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-1000"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-500/15 blur-[100px] pointer-events-none group-hover:bg-rose-500/25 transition-all duration-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="text-2xl font-black flex items-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300">
                <BarChartIcon className="text-indigo-400 mr-3" size={28} />
                Monthly Expenditure Trend
              </h4>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-1 ml-10">Aggregate telemetry across all availability zones</p>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
              <span className="text-[10px] font-black text-rose-400 tracking-widest uppercase">Live Delta</span>
            </div>
          </div>

          <div className="h-[250px] w-full">
            {loading ? (
              <Skeleton className="w-full h-full" variant="indigo" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    fontSize={11}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontWeight: 700 }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontWeight: 700 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '1.5rem',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                      padding: '12px 16px'
                    }}
                    itemStyle={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}
                  />
                  <Bar dataKey="cost" radius={[8, 8, 0, 0]} barSize={48}>
                    {monthlyData.map((entry, index) => {
                      const colors = ['#818cf8', '#a78bfa', '#f472b6', '#fb7185', '#34d399', '#fbbf24'];
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                          className="transition-all duration-500 hover:opacity-100 hover:filter-[url(#glow)] cursor-pointer"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </motion.div>

      {/* Detailed Table Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-3xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Telemetry Date</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Compute (EC2)</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Objects (S3)</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Database (RDS)</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">Compute (Lmb)</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white text-right">Daily Aggregate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20 float-right" variant="emerald" /></td>
                  </tr>
                ))
              ) : (
                filteredData.map((row, idx) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    key={row.date}
                    className="hover:bg-white/[0.04] transition-all duration-300 group cursor-default"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">
                          <Calendar size={14} />
                        </div>
                        <span className="font-mono text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{row.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-bold text-white">${row.services['EC2']?.toFixed(2) || '0.00'}</span>
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Compute Unit</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-bold text-blue-400">${row.services['S3']?.toFixed(2) || '0.00'}</span>
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Storage S3</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-bold text-emerald-400">${row.services['RDS']?.toFixed(2) || '0.00'}</span>
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Relational DB</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-bold text-amber-400">${row.services['Lambda']?.toFixed(2) || '0.00'}</span>
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">FaaS Run</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="inline-flex flex-col items-end">
                        <span className="bg-emerald-500/20 text-emerald-300 font-black px-4 py-2 rounded-2xl text-sm border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
                          ${row.totalCost.toFixed(2)}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Search className="text-slate-600" size={24} />
            </div>
            <h3 className="font-bold text-slate-400">No matching telemetry</h3>
            <p className="text-slate-500 text-sm">Adjust filters to broaden your search.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Analysis;
