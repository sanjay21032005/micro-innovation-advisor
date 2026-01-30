import React, { useState } from 'react';
import { MicroInnovation } from '../types';
import { ArrowRight, Copy, Check, Sparkles } from 'lucide-react';
import TypewriterText from './TypewriterText';

interface SuggestionCardProps {
  suggestion: MicroInnovation;
  index: number;
  onRefine: (title: string) => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, index, onRefine }) => {
  const [copied, setCopied] = useState(false);

  // Stagger animation based on index
  const delayClass = index === 0 ? 'delay-[0ms]' : index === 1 ? 'delay-[150ms]' : index === 2 ? 'delay-[300ms]' : 'delay-[450ms]';

  const handleCopy = () => {
    const textToCopy = `${suggestion.title}\n\n${suggestion.explanation}\n\nNext Step: ${suggestion.nextStep}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards ${delayClass}`}>
      <div className="p-6 sm:p-8 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
              {suggestion.category}
            </span>
            {suggestion.isEarlyIdea && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wide border border-amber-200">
                ✨ Early Idea
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onRefine(suggestion.title)}
              className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 rounded-md hover:bg-indigo-50 flex items-center gap-1"
              title="Refine this idea"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium hidden group-hover:inline-block">Refine</span>
            </button>
            <div className="h-3 w-px bg-slate-200 mx-1"></div>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 rounded-md hover:bg-indigo-50"
              title="Copy suggestion"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors pr-6">
          {suggestion.title}
        </h3>

        <p className="text-slate-600 leading-relaxed mb-6 text-base">
          <TypewriterText text={suggestion.explanation} speed={10} />
        </p>

        <div className="flex items-start gap-3 pt-5 border-t border-slate-50">
          <div className="mt-1 flex-shrink-0">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-emerald-600" />
            </div>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Next Step</span>
            <p className="text-sm font-medium text-slate-700">
              {suggestion.nextStep}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;