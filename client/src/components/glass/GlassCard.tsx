import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;