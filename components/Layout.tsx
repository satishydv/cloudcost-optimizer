
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Bell, ShieldCheck, Github, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <motion.div
        whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        whileTap={{ scale: 0.98 }}
        className={`relative flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive
          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
          : 'text-slate-400 hover:text-slate-100 border border-transparent'
          }`}
      >
        {/* Active Indicator Glow */}
        {isActive && (
          <div className="absolute inset-0 bg-emerald-500/5 blur-xl rounded-2xl pointer-events-none"></div>
        )}

        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
        <span className={`relative z-10 font-bold tracking-wide transition-colors duration-300 ${isActive ? 'bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200' : 'text-slate-400 group-hover:text-slate-200'}`}>
          {label}
        </span>

        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute right-2 w-1.5 h-6 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
          />
        )}
      </motion.div>
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#050706] text-slate-200 selection:bg-emerald-500/30">
      {/* Sidebar */}
      <aside className="w-72 hidden md:flex flex-col border-r border-white/10 bg-white/[0.02] backdrop-blur-2xl sticky top-0 h-screen p-6 z-[60]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4 mb-12 px-2 group cursor-pointer"
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] border border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <ShieldCheck className="text-white relative z-10" size={28} />
          </motion.div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-100 to-purple-400 leading-tight">
              OPTIMIZER
            </h1>
            <span className="text-[10px] font-black font-mono text-indigo-500/60 block tracking-[0.3em] uppercase">Control Center</span>
          </div>
        </motion.div>

        <nav className="flex-1 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-slate-400 mb-4 px-4">Insights</p>
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/analysis" icon={BarChart3} label="Cost Analysis" />
          <NavItem to="/alerts" icon={Bell} label="Anomalies" />
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-[10px] uppercase tracking-wider text-indigo-400/60 font-bold mb-1">Environment</p>
            <p className="text-sm font-mono text-indigo-400 flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse mr-2 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
              MOCK_DATA_PROD
            </p>
          </div>
          <a href="#" className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors text-sm px-4">
            <Github size={16} />
            <span>Source Code</span>
          </a>
        </div>

        {/* Decorative Glows */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-500/10 blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute top-1/2 -right-32 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/5 blur-[120px] pointer-events-none"></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-emerald-500/50">cloud-cost-optimizer</span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-slate-400">internal-dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-500/20 transition-all">
              <Bell size={16} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-white/10"></div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
