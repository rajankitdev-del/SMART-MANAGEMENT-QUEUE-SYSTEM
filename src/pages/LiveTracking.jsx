import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Icon, Card, ProgressBar, StatusBadge, LoadingSpinner, TricolorSeparator } from '../components/UIComponents';
import { tokenApi } from '../api';

const LiveTracking = () => {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    const tokenId = localStorage.getItem('activeTokenId');
    if (!tokenId) {
      setError('No active token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await tokenApi.getStatus(tokenId);
      setTokenData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch queue status.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner className="py-32" />;
  if (error || !tokenData) return (
    <div className="py-20 text-center space-y-4">
      <Icon name="error" className="text-error !text-5xl" />
      <p className="font-bold text-on-surface-variant">{error || 'No active token session.'}</p>
      <Button onClick={() => navigate('/qr-scan')}>Scan QR to Start</Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Live Tracking</h2>
          <p className="text-on-surface-variant font-bold text-sm">Real-time queue status</p>
        </div>
        <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center shadow-inner">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Icon name="sync" className="text-primary opacity-50" />
          </motion.div>
        </div>
      </header>

      {/* Live Status Card */}
      <Card className="p-0 border-none shadow-xl overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Your Token</p>
              <h3 className="text-4xl font-black text-on-surface">{tokenData.tokenNumber}</h3>
            </div>
            <StatusBadge status={tokenData.status} />
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl text-center space-y-2 border border-white/50 relative overflow-hidden">
            {/* Background Flow Visual */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="4 4" className="text-primary animate-[pattern-drift_5s_linear_infinite]" />
                <path d="M0,70 Q25,45 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="4 4" className="text-secondary-container animate-[pattern-drift_7s_linear_infinite_reverse]" />
              </svg>
            </div>
            
            <motion.div
              key={tokenData.queuePosition}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-black text-primary tracking-tighter"
            >
              #{tokenData.queuePosition}
            </motion.div>
            <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-xs relative z-10">Positions to go</p>
          </div>

          <TricolorSeparator />

          <ProgressBar 
            progress={tokenData.progressPercentage} 
            label={`Currently Serving: ${tokenData.currentServingToken || 'N/A'}`} 
            sublabel={`${tokenData.progressPercentage}% Complete`} 
          />

          <div className="flex flex-col gap-2 bg-primary/5 p-4 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="timer" className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">AI Est. Wait Time</p>
                <p className="text-xl font-black text-on-surface">{tokenData.estimatedWaitTime} Minutes</p>
              </div>
            </div>
            {tokenData.waitExplanation && (
              <p className="text-[10px] font-bold text-on-surface-variant/70 italic px-2 border-l-2 border-primary/20 ml-6">
                {tokenData.waitExplanation}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="flex-col h-auto py-6 gap-3"
          onClick={() => navigate('/notifications')}
        >
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Icon name="notifications" fill />
          </div>
          <span className="text-xs uppercase font-black tracking-widest">Alerts</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex-col h-auto py-6 gap-3"
          onClick={() => navigate('/priority')}
        >
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <Icon name="emergency" />
          </div>
          <span className="text-xs uppercase font-black tracking-widest">Priority</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex-col h-auto py-6 gap-3"
          onClick={() => navigate('/help')}
        >
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <Icon name="support_agent" />
          </div>
          <span className="text-xs uppercase font-black tracking-widest">Help</span>
        </Button>
        <Button 
          variant="primary" 
          className="flex-col h-auto py-6 gap-3"
          onClick={() => navigate('/confirm')}
        >
          <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center">
            <Icon name="done_all" />
          </div>
          <span className="text-xs uppercase font-black tracking-widest">Finished</span>
        </Button>
      </div>

      <div className="bg-white/80 p-5 rounded-2xl border border-outline-variant/20 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-lg font-black text-on-surface mb-1">Queue Updates</h4>
          <p className="text-xs text-on-surface-variant font-bold">
            {tokenData.status === 'serving' 
              ? `Please proceed to ${tokenData.counterNumber}.` 
              : `The queue is moving. You are currently at position ${tokenData.queuePosition}.`}
          </p>
        </div>
        <Icon name="rocket_launch" className="absolute -right-2 -bottom-2 !text-6xl text-primary/5" />
      </div>
    </div>
  );
};

export default LiveTracking;
