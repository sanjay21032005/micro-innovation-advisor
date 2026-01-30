import React from 'react';

interface AppLogoProps {
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Micro-Innovation Logo">
      <defs>
        <linearGradient id="mi-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo-600 */}
          <stop offset="45%" stopColor="#8B5CF6" /> {/* Violet-500 */}
          <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan-500 */}
        </linearGradient>
        
        <filter id="mi-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="mi-shadow" x="-20%" y="-20%" width="140%" height="140%">
           <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>
      
      {/* Background Container - Modern Squircle */}
      <rect x="20" y="20" width="472" height="472" rx="128" fill="url(#mi-logo-gradient)" />
      
      {/* Logo Group */}
      <g filter="url(#mi-shadow)">
        {/* Letter M - Geometric Construction */}
        <path 
          d="M130 350 V170 L231 295 L332 170 V350" 
          stroke="white" 
          strokeWidth="42" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
        
        {/* Letter I - Stem */}
        <path 
          d="M405 240 V350" 
          stroke="white" 
          strokeWidth="42" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Innovation Spark (The 'Dot' of the I) */}
        <path 
          d="M405 130 L418 158 L446 171 L418 184 L405 212 L392 184 L364 171 L392 158 Z" 
          fill="#FEF08A" /* Yellow-200 for contrast/spark */
        />
      </g>
      
      {/* Subtle Shine/Reflection Overlay */}
      <path 
        d="M60 60 Q 256 20 452 60 L 452 200 Q 256 160 60 200 Z" 
        fill="white" 
        fillOpacity="0.05" 
        style={{ mixBlendMode: 'overlay' }} 
        clipPath="inset(0 0 0 0 round 128px)"
      />
    </svg>
  );
};

export default AppLogo;