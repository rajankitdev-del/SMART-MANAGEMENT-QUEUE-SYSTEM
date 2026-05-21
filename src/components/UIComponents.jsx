import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ className, variant = 'primary', children, ...props }) => {
  const variants = {
    primary: 'bg-primary-container text-white hover:bg-primary duration-150',
    secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary duration-150',
    outline: 'bg-white/80 backdrop-blur-sm border border-outline-variant/30 text-on-surface hover:bg-white duration-150',
    ghost: 'hover:bg-black/5 text-on-surface',
    danger: 'bg-error text-on-error hover:bg-error/90 duration-150',
  };

  return (
    <button
      className={cn(
        'h-12 px-6 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md disabled:opacity-50 disabled:active:scale-100',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white/85 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const TricolorSeparator = ({ className }) => (
  <div className={cn("flex w-full h-1.5 rounded-full overflow-hidden opacity-40 my-4 shadow-sm", className)}>
    <div className="flex-1 bg-[#FF9933]" />
    <div className="flex-1 bg-white" />
    <div className="flex-1 bg-[#198754]" />
  </div>
);

export const StatusBadge = ({ status, className }) => {
  const styles = {
    waiting: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    serving: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    completed: 'bg-primary-fixed text-on-primary-fixed-variant',
    cancelled: 'bg-error-container text-on-error-container',
  };

  return (
    <span className={cn('px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider', styles[(status || 'waiting').toLowerCase()] || styles.waiting, className)}>
      {status || 'Waiting'}
    </span>
  );
};

export const ProgressBar = ({ progress, label, sublabel, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {(label || sublabel) && (
        <div className="flex justify-between text-sm font-bold text-on-surface-variant">
          <span>{label}</span>
          <span className="text-primary">{sublabel}</span>
        </div>
      )}
      <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const Icon = ({ name, className, fill = false }) => {
  return (
    <span className={cn('material-symbols-outlined', fill && 'fill-icon', className)}>
      {name}
    </span>
  );
};

export const LoadingSpinner = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 gap-4', className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-primary/20 border-b-primary rounded-full"
      />
      <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant animate-pulse">
        Fetching Data...
      </p>
    </div>
  );
};
