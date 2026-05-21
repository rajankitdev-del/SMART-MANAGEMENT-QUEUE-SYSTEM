import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Icon, Card, ProgressBar, StatusBadge, LoadingSpinner } from '../components/UIComponents';
import { tokenApi } from '../api';

const TokenGenerated = () => {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const tokenId = localStorage.getItem('activeTokenId');
      if (!tokenId) {
        navigate('/home');
        return;
      }
      try {
        const response = await tokenApi.getDetails(tokenId);
        setTokenData(response.data);
      } catch (err) {
        console.error('Error fetching token:', err);
        setError('Failed to load token details.');
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, [navigate]);

  if (loading) return <LoadingSpinner className="py-32" />;
  if (error || !tokenData) return (
    <div className="py-20 text-center space-y-4">
      <Icon name="error" className="text-error !text-5xl" />
      <p className="font-bold text-on-surface-variant">{error || 'Token not found.'}</p>
      <Button onClick={() => navigate('/qr-scan')}>Scan Again</Button>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="mt-4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black leading-tight text-primary tracking-tight font-headline"
        >
          Token<br/>Generated
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          className="h-1.5 bg-secondary-container mt-2 rounded-full"
        />
      </header>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="overflow-hidden p-0 border-none shadow-2xl">
          <div className="bg-primary-container p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name="confirmation_number" fill />
              </div>
              <span className="font-black tracking-widest text-2xl uppercase">{tokenData.token_number}</span>
            </div>
            <StatusBadge status={tokenData.status} className="bg-secondary-container text-on-secondary-container" />
          </div>

          <div className="p-8 space-y-8">
            <div className="text-center space-y-1">
              <p className="text-on-surface-variant font-black uppercase tracking-widest text-[10px] opacity-60">Queue Position</p>
              <h3 className="text-5xl font-black text-on-surface tracking-tighter">{tokenData.queue_position}th in line</h3>
            </div>

            <ProgressBar 
              progress={100 - (tokenData.queue_position * 5)} 
              label={`Currently Serving: ${tokenData.current_serving_token}`} 
              sublabel={`Your Turn: ${tokenData.token_number}`} 
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low/80 p-5 rounded-2xl border-b-4 border-primary shadow-inner">
                <Icon name="schedule" className="text-primary mb-2" />
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter opacity-60">Wait Time</p>
                <p className="text-xl font-black text-on-surface">{tokenData.estimated_wait_time} mins</p>
              </div>
              <div className="bg-surface-container-low/80 p-5 rounded-2xl border-b-4 border-secondary shadow-inner">
                <Icon name="meeting_room" className="text-secondary mb-2" />
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter opacity-60">Counter</p>
                <p className="text-xl font-black text-on-surface">{tokenData.counter_number}</p>
              </div>
            </div>

            <div className="bg-tertiary-fixed/20 p-5 rounded-2xl flex gap-4 items-center border border-tertiary/10">
              <div className="w-10 h-10 bg-tertiary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="info" className="text-tertiary" />
              </div>
              <p className="text-sm font-bold leading-snug text-on-tertiary-fixed-variant">
                We will alert you when your turn is near. You can wait comfortably.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <section className="space-y-4 pt-4">
        <Button 
          onClick={() => navigate('/live-tracking')}
          className="w-full h-16 shadow-xl"
        >
          <Icon name="insights" />
          Track Live Queue
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-14"
          onClick={() => navigate('/home')}
        >
          <Icon name="home" />
          Back to Home
        </Button>
      </section>
    </div>
  );
};

export default TokenGenerated;
