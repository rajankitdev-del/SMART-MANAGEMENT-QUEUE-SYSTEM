import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Icon, Card } from '../components/UIComponents';

const ErrorState = ({ message = "Something went wrong while processing your request.", code = "ERR_UNKNOWN" }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-8 py-12">
      <motion.div
        initial={{ rotate: -10, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 8 }}
        className="w-32 h-32 bg-error-container text-on-error-container rounded-full flex items-center justify-center shadow-xl mb-4"
      >
        <Icon name="error" className="!text-6xl" fill />
      </motion.div>

      <div className="space-y-3 px-6">
        <h2 className="text-3xl font-black text-on-surface tracking-tight">Oops! Problem Occurred</h2>
        <p className="text-on-surface-variant font-bold leading-relaxed">
          {message}
        </p>
        <div className="inline-block px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-black tracking-widest text-on-surface-variant/60">
          ERROR CODE: {code}
        </div>
      </div>

      <Card className="max-w-xs bg-white/40 border-white/60">
        <h4 className="font-black text-sm mb-2">Possible Solutions:</h4>
        <ul className="text-left text-xs font-bold text-on-surface-variant space-y-2">
          <li className="flex gap-2">
            <Icon name="wifi_off" className="text-sm" /> Check your internet connection
          </li>
          <li className="flex gap-2">
            <Icon name="qr_code" className="text-sm" /> Try scanning the QR code again
          </li>
          <li className="flex gap-2">
            <Icon name="refresh" className="text-sm" /> Restart the application
          </li>
        </ul>
      </Card>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button onClick={() => navigate('/home')} className="w-full h-14">
          <Icon name="home" />
          Back to Home
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)} className="w-full h-14">
          <Icon name="replay" />
          Try Again
        </Button>
      </div>

      <div className="pt-8 flex items-center gap-2 opacity-40">
        <Icon name="support_agent" className="text-sm" />
        <span className="text-[10px] font-black uppercase tracking-widest">Contact Desk Support</span>
      </div>
    </div>
  );
};

export default ErrorState;
