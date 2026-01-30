import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

const STEPS = [
  "Thinking of smart improvements…",  // PRD-specified loading text
  "Analyzing your context...",
  "Brainstorming micro-innovations...",
  "Refining for maximum impact...",
  "Finalizing suggestions..."
];

const ThinkingIndicator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-white p-1 rounded-full border border-indigo-100">
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            </div>
          </div>
          <span className="font-medium text-slate-700 text-sm animate-pulse">
            {STEPS[currentStep]}
          </span>
        </div>

        <div className="space-y-1.5 pl-11">
          {STEPS.map((step, idx) => (
            idx < currentStep && (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-400 animate-in fade-in duration-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>{step}</span>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;