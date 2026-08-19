'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export function Logo({ size = 'md', variant = 'auto', showTagline = true }: LogoProps) {
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12'
  };

  const textClasses = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl'
  };

  const isDark = variant === 'dark';

  return (
    <div className="flex items-center space-x-2.5 group cursor-pointer select-none">
      
      {/* PURE MINIMAL VECTOR EMBLEM (Architectural Geometric Isometric Hexagon/P Cube) */}
      <div className={`relative ${iconSizeClasses[size]} rounded-xl overflow-hidden flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-sm shadow-blue-500/10`}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Rounded Container with subtle gradient */}
          <rect width="40" height="40" rx="10" fill={isDark ? "#0F172A" : "#0F172A"} />
          
          {/* Top Isometric Facet */}
          <path 
            d="M20 7L31 13.5L20 20L9 13.5L20 7Z" 
            fill="url(#topGrad)" 
          />
          
          {/* Left Isometric Facet (Building / Comparison column) */}
          <path 
            d="M9 13.5L20 20V33L9 26.5V13.5Z" 
            fill="url(#leftGrad)" 
          />
          
          {/* Right Isometric Facet */}
          <path 
            d="M20 20L31 13.5V26.5L20 33V20Z" 
            fill="url(#rightGrad)" 
          />

          {/* Core AI Smart Dot / Spark */}
          <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />

          <defs>
            <linearGradient id="topGrad" x1="9" y1="7" x2="31" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="leftGrad" x1="9" y1="13.5" x2="20" y2="33" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="rightGrad" x1="20" y1="13.5" x2="31" y2="33" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#3730A3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* REFINED MINIMAL TYPOGRAPHY */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight flex items-center leading-none ${textClasses[size]} ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <span>prevedibile</span>
          <span className="text-[#2563EB] ml-0.5">.ai</span>
        </div>
        {showTagline && (
          <span className="text-[8.5px] font-extrabold tracking-[0.2em] text-slate-400 uppercase mt-1">
            Edilizia Digitale
          </span>
        )}
      </div>

    </div>
  );
}
