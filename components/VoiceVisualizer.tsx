import React from 'react';

const VoiceVisualizer: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-1 h-8 px-4 bg-slate-50 rounded-full">
      <div className="w-1 h-3 bg-blue-500 rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }}></div>
      <div className="w-1 h-5 bg-indigo-500 rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '100ms' }}></div>
      <div className="w-1 h-4 bg-violet-500 rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }}></div>
      <div className="w-1 h-6 bg-teal-500 rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '300ms' }}></div>
      <div className="w-1 h-4 bg-blue-500 rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }}></div>
      <div className="w-1 h-3 bg-indigo-500 rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '500ms' }}></div>
      
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default VoiceVisualizer;