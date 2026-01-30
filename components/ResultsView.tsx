import React from 'react';
import { MicroInnovation } from '../types';
import SuggestionCard from './SuggestionCard';
import { RefreshCcw } from 'lucide-react';

interface ResultsViewProps {
  suggestions: MicroInnovation[];
  onReset: () => void;
  onRefine: (title: string) => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ suggestions, onReset, onRefine }) => {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Suggestions</h2>
          <p className="text-slate-500">3-5 micro-innovations for your project.</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          Start Over
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard 
            key={index} 
            suggestion={suggestion} 
            index={index} 
            onRefine={onRefine}
          />
        ))}
      </div>

      <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 delay-500 duration-700">
        <p className="text-slate-400 text-sm mb-4">
          Tip: Pick just ONE idea and try to implement it today.
        </p>
        <button
          onClick={onReset}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium hover:underline underline-offset-4"
        >
          Have another idea?
        </button>
      </div>
    </div>
  );
};

export default ResultsView;