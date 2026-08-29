import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LogoProps {
  onAdminTrigger?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  onAdminTrigger,
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [isTapping, setIsTapping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    // Visual tap feedback
    setIsTapping(true);
    setTimeout(() => setIsTapping(false), 180);

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (nextCount >= 5) {
      setClickCount(0);
      if (onAdminTrigger) {
        onAdminTrigger();
      }
    } else {
      // Reset after 2 seconds
      timerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  const dimensions = {
    sm: { svgWidth: 32, svgHeight: 24, fontSize: 'text-lg', subSize: 'text-[9px]' },
    md: { svgWidth: 42, svgHeight: 32, fontSize: 'text-2xl', subSize: 'text-[11px]' },
    lg: { svgWidth: 64, svgHeight: 48, fontSize: 'text-4xl', subSize: 'text-[14px]' },
  }[size];

  return (
    <div
      id="brand-logo-container"
      onClick={handleLogoClick}
      className={`relative inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      title="FF TACTIX"
    >
      {/* Visual tap ripple ring effect for hidden clicks */}
      <AnimatePresence>
        {isTapping && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute -inset-2 rounded-xl bg-[#FF9F1C]/20 border border-[#FF9F1C]/40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Slanted Bold "FF" Vector Icon */}
      <motion.div
        animate={{
          scale: isTapping ? 0.94 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative flex items-center justify-center"
      >
        <svg
          width={dimensions.svgWidth}
          height={dimensions.svgHeight}
          viewBox="0 0 100 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(255,159,28,0.3)] transition-transform duration-200 group-hover:scale-105"
        >
          {/* First 'F' in Crisp Pure White */}
          <path
            d="M 28 8 L 56 8 L 52 24 L 38 24 L 35 36 L 47 36 L 43 50 L 31 50 L 25 72 L 8 72 L 28 8 Z"
            fill="#FFFFFF"
          />
          {/* Second 'F' in Vibrant Amber Gold */}
          <path
            d="M 58 8 L 92 8 L 88 24 L 70 24 L 67 36 L 82 36 L 78 50 L 63 50 L 57 72 L 40 72 L 58 8 Z"
            fill="#FF9F1C"
          />
        </svg>
      </motion.div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-heading font-extrabold tracking-wider text-white ${dimensions.fontSize}`}>
            FF <span className="text-[#FF9F1C]">TACTIX</span>
          </span>
          {/* Subtle click streak indicator during consecutive taps (subtle dots that disappear) */}
          {clickCount > 0 && clickCount < 5 && (
            <span className="flex gap-0.5 ml-1">
              {Array.from({ length: clickCount }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-[#FF9F1C] animate-pulse"
                />
              ))}
            </span>
          )}
        </div>
        {showSubtitle && (
          <span
            className={`font-heading font-bold uppercase tracking-[0.28em] text-[#A0A0A0] group-hover:text-[#FF9F1C] transition-colors duration-200 ${dimensions.subSize} -mt-0.5`}
          >
            — ESPORTS OS —
          </span>
        )}
      </div>
    </div>
  );
};
