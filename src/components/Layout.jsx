import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './UIComponents';
import { AnimatedBackground } from './AnimatedBackground';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home';
  const isSplash = location.pathname === '/splash';

  if (isSplash) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 h-16 bg-primary dark:bg-blue-900 shadow-md">
      <div className="flex items-center gap-2">
        {!isHome && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <Icon name="arrow_back" />
          </button>
        )}
        <h1 className="font-headline font-bold text-2xl tracking-tight text-white">Queue सेवा</h1>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => navigate('/language')}
          className="flex items-center gap-1 py-1.5 px-3 bg-white/10 rounded-full text-white text-xs font-bold hover:bg-white/20 transition-all active:scale-95"
        >
          <Icon name="language" className="text-sm" />
          Language
        </button>
      </div>
    </header>
  );
};

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: 'home', path: '/home' },
    { label: 'My Token', icon: 'confirmation_number', path: '/live-tracking' },
    { label: 'History', icon: 'history', path: '/history' },
    { label: 'Help', icon: 'help_center', path: '/help' },
  ];

  const isSplash = location.pathname === '/splash';
  if (isSplash) return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 pb-safe px-2 bg-primary dark:bg-blue-900 shadow-[0_-4px_24px_rgba(0,0,0,0.2)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center transition-all duration-200 px-4 py-2 rounded-xl ${
              isActive ? 'bg-white/10 text-white scale-105' : 'text-blue-200 hover:text-white'
            }`}
          >
            <Icon name={item.icon} fill={isActive} />
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      <AnimatedBackground />
      <Header />
      <main className="flex-1 pt-20 pb-24 px-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
};
