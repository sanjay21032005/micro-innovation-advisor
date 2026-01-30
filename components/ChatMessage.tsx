import React, { useState } from 'react';
import { MicroInnovation, ChatMessage as ChatMessageType } from '../types';
import SuggestionCard from './SuggestionCard';
import { User, Sparkles, MessageCircle, ThumbsUp, ThumbsDown, Volume2, StopCircle } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  onRefine: (text: string) => void;
  onFollowUp: (text: string) => void;
}

const FOLLOW_UPS = [
  "How can I implement this quickly?",
  "Give me more creative options",
  "Make these ideas cheaper to build",
  "Focus on mobile users"
];

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRefine, onFollowUp }) => {
  const isUser = message.role === 'user';
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
    }

    if (!message.suggestions) return;

    // Construct a natural reading flow
    const textToSpeak = message.suggestions.map((s, i) => 
        `Suggestion ${i + 1}: ${s.title}. ${s.explanation}. Next step: ${s.nextStep}.`
    ).join(' ... ');

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`w-full py-8 ${isUser ? 'bg-transparent' : 'bg-slate-50/50'}`}>
      <div className="max-w-3xl mx-auto px-4 flex gap-4 sm:gap-6">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
          isUser ? 'bg-white border border-slate-200' : 'bg-indigo-600 border border-indigo-600'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-slate-500" />
          ) : (
            <Sparkles className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-semibold text-slate-900 text-sm">
                {isUser ? 'You' : 'Micro-Innovation Advisor'}
            </div>
            {!isUser && message.suggestions && (
                 <button 
                    onClick={handleSpeak}
                    className={`p-1 rounded-md transition-colors ${isSpeaking ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                    title={isSpeaking ? "Stop reading" : "Read aloud"}
                 >
                    {isSpeaking ? <StopCircle className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                 </button>
            )}
          </div>

          {isUser && (
            <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          )}

          {!isUser && message.suggestions && (
            <>
              <div className="space-y-6 mt-2">
                {message.suggestions.map((suggestion, idx) => (
                  <SuggestionCard 
                    key={idx} 
                    suggestion={suggestion} 
                    index={idx}
                    onRefine={(title) => onRefine(`How can I specifically implement "${title}" in a weekend?`)}
                  />
                ))}
              </div>
              
              {/* Follow Up Chips & Feedback */}
              <div className="mt-8">
                  <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 delay-700 duration-700 mb-4">
                    {FOLLOW_UPS.map((text, i) => (
                    <button
                        key={i}
                        onClick={() => onFollowUp(text)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-200 text-xs font-medium text-slate-600 hover:text-indigo-600 transition-all shadow-sm"
                    >
                        <MessageCircle className="w-3 h-3 opacity-50" />
                        {text}
                    </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                        className={`p-1.5 rounded-md transition-colors ${feedback === 'up' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                    >
                        <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button 
                         onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                         className={`p-1.5 rounded-md transition-colors ${feedback === 'down' ? 'text-slate-600 bg-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                    >
                        <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;