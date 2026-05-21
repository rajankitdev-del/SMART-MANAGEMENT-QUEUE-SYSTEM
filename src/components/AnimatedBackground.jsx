import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './UIComponents';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-transparent pointer-events-none">
      
      {/* 1. Base Moving Gradient (Tricolor) */}
      <motion.div 
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255,153,51,0.15) 0%, rgba(255,255,255,0) 50%), radial-gradient(circle at 50% 100%, rgba(25,135,84,0.15) 0%, rgba(255,255,255,0) 50%)',
          backgroundSize: '200% 200%'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF9933]/10 via-white/50 to-[#198754]/10 mix-blend-multiply" />

      {/* 2. Civic Geometric Pattern (Dots & Grids) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#0047a9 1px, transparent 1px), radial-gradient(#0047a9 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          animation: 'pattern-drift 60s linear infinite'
        }}
      />

      {/* 3. Ashoka Chakra / Mandala Abstract Hints */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full border-[1px] border-primary/5 border-dashed animate-[spin_120s_linear_infinite]" />
      <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] rounded-full border-[1px] border-primary/5 animate-[spin_90s_linear_infinite_reverse]" />
      
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full border-[1px] border-secondary-container/10 border-dashed animate-[spin_150s_linear_infinite]" />

      {/* 4. Floating Particles & UI Elements */}
      {/* Primary specs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-[pulse-glow_4s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-tertiary/5 rounded-full blur-3xl animate-[pulse-glow_6s_ease-in-out_infinite_0.5s]" />

      {/* Floating Icons */}
      <div className="absolute top-[15%] right-[10%] text-primary/10 animate-[float-slow_8s_ease-in-out_infinite]">
        <Icon name="confirmation_number" className="!text-6xl" />
      </div>
      <div className="absolute top-[40%] left-[5%] text-secondary-container/10 animate-[float-medium_12s_ease-in-out_infinite]">
        <Icon name="qr_code_scanner" className="!text-5xl" />
      </div>
      <div className="absolute bottom-[20%] right-[15%] text-tertiary/10 animate-[float-slow_10s_ease-in-out_infinite_1s]">
        <Icon name="notifications_active" className="!text-4xl" />
      </div>
      <div className="absolute bottom-[40%] left-[10%] text-primary/5 animate-[float-medium_15s_ease-in-out_infinite_2s]">
        <Icon name="account_balance" className="!text-7xl" />
      </div>
    </div>
  );
};
