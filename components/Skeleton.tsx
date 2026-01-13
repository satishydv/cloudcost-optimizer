
import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
    variant?: 'indigo' | 'purple' | 'emerald' | 'rose' | 'slate';
    animate?: boolean;
}

const variants = {
    indigo: 'bg-indigo-500/10 border-indigo-500/20',
    purple: 'bg-purple-500/10 border-purple-500/20',
    emerald: 'bg-emerald-500/10 border-emerald-500/20',
    rose: 'bg-rose-500/10 border-rose-500/20',
    slate: 'bg-white/5 border-white/10'
};

const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'slate', animate = true }) => {
    return (
        <div className={`relative overflow-hidden rounded-2xl border ${variants[variant]} ${className}`}>
            {animate && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                />
            )}
        </div>
    );
};

export default Skeleton;
