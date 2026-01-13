
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: any;
  delay?: number;
  variant?: 'indigo' | 'purple' | 'emerald' | 'rose' | 'slate';
}

const variants = {
  indigo: 'from-indigo-600 to-indigo-900 border-indigo-400/30 shadow-indigo-500/20',
  purple: 'from-purple-600 to-purple-900 border-purple-400/30 shadow-purple-500/20',
  emerald: 'from-emerald-600 to-emerald-900 border-emerald-400/30 shadow-emerald-500/20',
  rose: 'from-rose-600 to-rose-900 border-rose-400/30 shadow-rose-500/20',
  slate: 'from-slate-800 to-slate-950 border-white/10 shadow-black/20'
};

const KpiCard: React.FC<KpiCardProps> = ({ label, value, change, icon: Icon, delay = 0, variant = 'slate' }) => {
  const isPositive = change && change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={`relative overflow-hidden p-6 rounded-[2.5rem] border bg-gradient-to-br transition-all duration-300 group hover:scale-[1.02] shadow-2xl ${variants[variant]}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-500">
        {Icon && <Icon size={100} strokeWidth={1} />}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{value}</h3>
            {Icon && <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              <Icon size={20} className="text-white" />
            </div>}
          </div>
        </div>

        {change !== undefined && (
          <div className="mt-4 flex items-center">
            <div className={`flex items-center text-[10px] font-black px-3 py-1.5 rounded-xl backdrop-blur-md border ${isPositive ? 'text-rose-200 bg-rose-500/30 border-rose-400/20' : 'text-emerald-200 bg-emerald-500/30 border-emerald-400/20'
              }`}>
              {isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
              {Math.abs(change).toFixed(1)}%
            </div>
            <span className="ml-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">since last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default KpiCard;
