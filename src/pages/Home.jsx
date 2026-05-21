import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Icon, Button } from '../components/UIComponents';
import { queueApi } from '../api';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await queueApi.getStatus();
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching queue stats:', err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8">
      {/* Live Stats Bar */}
      {stats && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center bg-white/85 backdrop-blur-2xl px-4 py-2 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Live Status</span>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[8px] font-bold text-on-surface-variant uppercase opacity-60">Serving</p>
              <p className="text-xs font-black text-primary">{stats.currentServingToken}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-bold text-on-surface-variant uppercase opacity-60">Waiting</p>
              <p className="text-xs font-black text-secondary">{stats.totalWaitingUsers}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Priority Access Banner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/85 backdrop-blur-2xl p-4 rounded-2xl flex items-start gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 border-l-4 border-l-tertiary"
      >
        <div className="w-10 h-10 bg-tertiary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="accessible_forward" className="text-tertiary" />
        </div>
        <div>
          <h2 className="font-bold text-on-surface">Priority Access Info</h2>
          <p className="text-xs text-on-surface-variant font-medium">Special queues available for senior citizens and persons with disabilities.</p>
        </div>
      </motion.div>

      {/* Hero Section */}
      <header>
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-primary leading-tight tracking-tight mb-2"
        >
          Welcome, Citizen
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-on-surface-variant font-bold bg-white/30 backdrop-blur-xs inline-block px-2 py-1 rounded text-sm"
        >
          Please select a service below to begin.
        </motion.p>
      </header>

      {/* Action Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Main Hero Card: Scan QR */}
        <motion.button 
          variants={item}
          onClick={() => navigate('/qr-scan')}
          className="md:col-span-2 bg-primary-container text-white p-8 rounded-2xl flex flex-col items-center text-center gap-4 shadow-lg active:scale-[0.98] transition-all group overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Icon name="qr_code_2" className="!text-9xl" />
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-inner">
            <Icon name="qr_code_scanner" className="!text-5xl" fill />
          </div>
          <div className="space-y-1 relative z-10">
            <h3 className="text-2xl font-black tracking-tight">Scan QR to Get Token</h3>
            <p className="text-on-primary-container opacity-90 font-bold text-sm">Fastest way to join the digital queue</p>
          </div>
        </motion.button>

        {/* Track My Token */}
        <motion.button 
          variants={item}
          onClick={() => navigate('/live-tracking')}
          className="bg-white/85 backdrop-blur-2xl p-6 rounded-2xl flex flex-col gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 text-left active:scale-[0.98] transition-all group"
        >
          <div className="w-12 h-12 bg-secondary-fixed text-on-secondary-fixed-variant rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <Icon name="confirmation_number" fill />
          </div>
          <div>
            <h3 className="text-lg font-black text-on-surface">Track My Token</h3>
            <p className="text-on-surface-variant text-xs mt-1 leading-relaxed font-bold">View details & wait time.</p>
          </div>
        </motion.button>

        {/* Live Status */}
        <motion.button 
          variants={item}
          onClick={() => navigate('/notifications')}
          className="bg-white/85 backdrop-blur-2xl p-6 rounded-2xl flex flex-col gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 text-left active:scale-[0.98] transition-all group"
        >
          <div className="w-12 h-12 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-xl flex items-center justify-center group-hover:-rotate-6 transition-transform">
            <Icon name="insights" />
          </div>
          <div>
            <h3 className="text-lg font-black text-on-surface">Queue Status</h3>
            <p className="text-on-surface-variant text-xs mt-1 leading-relaxed font-bold">Live updates on all services.</p>
          </div>
        </motion.button>

        {/* Help / Assisted Use */}
        <motion.button 
          variants={item}
          onClick={() => navigate('/help')}
          className="md:col-span-2 bg-white/85 backdrop-blur-2xl p-5 rounded-2xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary shadow-inner">
              <Icon name="help_center" />
            </div>
            <div>
              <h3 className="text-md font-black text-on-surface">Help / Assisted Use</h3>
              <p className="text-on-surface-variant text-xs font-bold">Need help using this app?</p>
            </div>
          </div>
          <Icon name="chevron_right" className="text-primary" />
        </motion.button>
      </motion.div>

      {/* Visual Anchor */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 rounded-3xl overflow-hidden h-32 relative shadow-xl border-4 border-white/50"
      >
        <img 
          alt="Government Building" 
          className="w-full h-full object-cover grayscale opacity-20" 
          src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div>
        <div className="absolute bottom-4 left-0 w-full">
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-center">Serving the nation with digital dignity</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
