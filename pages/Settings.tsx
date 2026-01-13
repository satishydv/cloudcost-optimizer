
import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, AlertTriangle, DollarSign, Info, Zap, BarChart, Shield } from 'lucide-react';
import { useSettings } from '../services/useSettings';

const Settings: React.FC = () => {
    const { settings, updateSettings } = useSettings();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateSettings({ [name]: parseFloat(value) || 0 });
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black tracking-tight mb-2 flex items-center space-x-3">
                        <SettingsIcon className="text-emerald-500" size={32} />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">Strategic Preferences</span>
                    </h2>
                    <p className="text-slate-400/80 font-medium">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-500 uppercase text-[10px] tracking-[0.2em] font-bold">Configure thresholds for anomaly detection and cost monitoring.</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-indigo-600 to-indigo-900 border border-indigo-400/30 p-8 rounded-[3rem] relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <AlertTriangle size={120} />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Anomaly Sensitivity</h3>
                        <p className="text-slate-400 text-sm mb-8">Set the percentage increase that triggers an anomaly alert.</p>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-slate-300">Percentage Threshold</label>
                                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-mono border border-emerald-500/20">
                                    {settings.anomalyThreshold}%
                                </span>
                            </div>
                            <input
                                type="range"
                                name="anomalyThreshold"
                                min="1"
                                max="100"
                                value={settings.anomalyThreshold}
                                onChange={handleInputChange}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500 font-mono">
                                <span>1%</span>
                                <span>50%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-purple-600 to-purple-900 border border-purple-400/30 p-8 rounded-[3rem] relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <DollarSign size={120} />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20">
                            <DollarSign size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Cost Minimum</h3>
                        <p className="text-slate-400 text-sm mb-8">Ignore anomalies for resources costing less than this amount.</p>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">USD ($)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <DollarSign size={16} />
                                </div>
                                <input
                                    type="number"
                                    name="minCostThreshold"
                                    value={settings.minCostThreshold}
                                    onChange={handleInputChange}
                                    className="block w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all font-mono"
                                    placeholder="100"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4 p-6 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
            >
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                    <Save size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-emerald-400">Settings Auto-saved</h4>
                    <p className="text-xs text-slate-400">Your preferences are automatically saved to your browser's local storage.</p>
                </div>
            </motion.div>

            {/* How it Works Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 space-y-6"
            >
                <div className="flex items-center space-x-3">
                    <Info className="text-emerald-500" size={20} />
                    <h3 className="text-xl font-bold text-white">How Anomaly Detection Works</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-slate-900/60 rounded-[2rem] border border-white/10 hover:border-emerald-500/30 transition-all group shadow-2xl">
                        {/* Inner Glow */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 blur-[40px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                        <Zap className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform relative z-10" size={24} />
                        <h4 className="text-sm font-bold text-white mb-2 relative z-10">1. Real-time Analysis</h4>
                        <p className="text-xs text-slate-400 leading-relaxed relative z-10">
                            Every hour, our engine scans your cloud resource consumption across all connected providers.
                        </p>
                    </div>

                    <div className="p-8 relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-slate-900/40 to-slate-900/60 rounded-[2rem] border border-white/10 hover:border-blue-500/30 transition-all group shadow-2xl">
                        {/* Inner Glow */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 blur-[40px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
                        <BarChart className="text-blue-400 mb-4 group-hover:scale-110 transition-transform relative z-10" size={24} />
                        <h4 className="text-sm font-bold text-white mb-2 relative z-10">2. Statistical Baseline</h4>
                        <p className="text-xs text-slate-400 leading-relaxed relative z-10">
                            We calculate a 7-day rolling average for each resource to establish a "normal" spending pattern.
                        </p>
                    </div>

                    <div className="p-8 relative overflow-hidden bg-gradient-to-br from-violet-500/10 via-slate-900/40 to-slate-900/60 rounded-[2rem] border border-white/10 hover:border-violet-500/30 transition-all group shadow-2xl">
                        {/* Inner Glow */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-500/5 blur-[40px] pointer-events-none group-hover:bg-violet-500/20 transition-all duration-700"></div>
                        <Shield className="text-violet-400 mb-4 group-hover:scale-110 transition-transform relative z-10" size={24} />
                        <h4 className="text-sm font-bold text-white mb-2 relative z-10">3. Threshold Filter</h4>
                        <p className="text-xs text-slate-400 leading-relaxed relative z-10">
                            Alerts only trigger if the cost jump exceeds your <b>{settings.anomalyThreshold}%</b> threshold and the resource cost is above <b>${settings.minCostThreshold}</b>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
