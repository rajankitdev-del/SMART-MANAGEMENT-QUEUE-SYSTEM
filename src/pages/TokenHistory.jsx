import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Icon, StatusBadge } from '../components/UIComponents';
import { tokenApi } from '../api';

const TokenHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await tokenApi.getHistory();
        setHistory(response.data);
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-black text-primary tracking-tight">Token History</h2>
        <p className="text-on-surface-variant font-bold">Your previous service visits</p>
      </header>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 font-bold opacity-50">Loading history...</div>
        ) : history.length > 0 ? (
          history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-0 overflow-hidden border-none shadow-md">
                <div className="flex">
                  <div className={`w-20 flex flex-col items-center justify-center text-white ${
                    item.status === 'completed' ? 'bg-primary' : 'bg-surface-dim'
                  }`}>
                    <span className="text-xs font-black opacity-60 uppercase">Token</span>
                    <span className="text-xl font-black">{item.token_number}</span>
                  </div>
                  <div className="flex-1 p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h4 className="font-black text-on-surface">{item.service_type || 'General Service'}</h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
                        <Icon name="calendar_today" className="!text-[12px]" />
                        {formatDate(item.created_at)}
                        <span className="mx-1">•</span>
                        <Icon name="meeting_room" className="!text-[12px]" />
                        {item.counter_number || 'N/A'}
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4 opacity-40">
            <Icon name="history" className="!text-6xl" />
            <p className="font-bold">No history found</p>
          </div>
        )}
      </div>

      <div className="bg-white/85 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 flex gap-4 items-center mt-8">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="verified_user" className="text-primary" />
        </div>
        <p className="text-xs font-bold text-primary leading-tight">
          Your records are securely stored and only accessible through this device.
        </p>
      </div>
    </div>
  );
};

export default TokenHistory;
