import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Mic, MicOff, Sparkles, StopCircle } from 'lucide-react';
import VoiceVisualizer from './VoiceVisualizer';

interface IdeaInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const ENHANCERS = [
  { label: "Focus on UX", value: " focusing specifically on User Experience" },
  { label: "Low Budget", value: " that are low cost to implement" },
  { label: "Gamification", value: " using gamification elements" },
  { label: "Quick Wins", value: " that can be done in one day" },
];

const IdeaInput: React.FC<IdeaInputProps> = ({ onSubmit, isLoading, placeholder }) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  // Handle external placeholder updates
  useEffect(() => {
    if (placeholder) {
        setText(placeholder);
        if (textareaRef.current) textareaRef.current.focus();
    }
  }, [placeholder]);

  // Voice Input Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Keep listening until stopped
      recognition.interimResults = true; // Show results as they are spoken
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript || interimTranscript) {
             // We need to carefully append to existing text if needed, 
             // but for simplicity in this hook, we'll assume the user is dictating 
             // and we update the input. 
             // A complex implementation would track cursor position.
             
             // Simple approach: If interim, show it. If final, commit it.
             // However, React state updates with interim are tricky.
             // We will just set text to (previous finalized text + current transcription)
             // But managing "previous finalized" is hard without a ref.
             
             // Easier approach for "Gemini Style":
             // Just set the text to the latest valid input.
             // Since we enabled `continuous`, `event.results` accumulates.
             
             const allText = Array.from(event.results)
                .map((result: any) => result[0].transcript)
                .join('');
             
             setText(allText);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
            setRecognitionError("Microphone access denied. Please check settings.");
        } else if (event.error === 'no-speech') {
            // unexpected silence, just stop
            setIsListening(false);
        } else {
             setRecognitionError("Voice error: " + event.error);
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    setRecognitionError(null);
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors on stop
      }
    } else {
      try {
        // Clear text if starting a fresh dictation? 
        // Or append? Let's append if there is space, or just start listening.
        // Due to `event.results` accumulation in `continuous` mode, 
        // it's often cleaner to restart the transcript accumulation or just handle the delta.
        // For this simple implementation, we'll rely on the user editing if they mix typing and speaking.
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Failed to start recognition", e);
        setIsListening(false);
      }
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || isLoading) return;
    
    // Stop listening if sending
    if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
    }

    onSubmit(text);
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const addEnhancer = (value: string) => {
    setText((prev) => prev + value);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const isValid = text.trim().length > 0;

  return (
    <div className="w-full bg-white pt-2 pb-6 px-4">
      <div className="max-w-3xl mx-auto relative">
        
        {/* Enhancer Pills */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar mask-gradient">
            {ENHANCERS.map((enhancer, idx) => (
                <button
                    key={idx}
                    onClick={() => addEnhancer(enhancer.value)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all active:scale-95"
                >
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    {enhancer.label}
                </button>
            ))}
        </div>

        {/* Error Banner */}
        {recognitionError && (
            <div className="mb-2 px-3 py-2 bg-red-50 text-red-600 text-xs rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-bottom-1">
                <span>{recognitionError}</span>
                <button onClick={() => setRecognitionError(null)} className="font-bold hover:text-red-800">✕</button>
            </div>
        )}

        <div className={`relative flex items-end gap-2 bg-slate-50 border transition-all shadow-sm rounded-3xl px-4 py-3 ${isListening ? 'border-indigo-400 ring-4 ring-indigo-50/50 bg-white' : 'border-slate-200 hover:border-slate-300 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-400 focus-within:bg-white'}`}>
          
          <div className="flex-1 min-w-0">
             {isListening && text.length === 0 && (
                <div className="absolute top-3 left-4 pointer-events-none">
                     <VoiceVisualizer />
                </div>
             )}
             
             <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={isListening ? "" : "Describe your idea... (Type or Speak)"}
                rows={1}
                className={`w-full max-h-[200px] py-2 bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 text-base resize-none custom-scrollbar ${isListening && text.length === 0 ? 'opacity-0' : 'opacity-100'}`}
                style={{ minHeight: '24px' }}
             />
          </div>
          
          <div className="flex items-center gap-2 mb-0.5">
             <button
                onClick={toggleListening}
                disabled={isLoading}
                className={`p-2 rounded-full transition-all duration-300 ${
                    isListening 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100 scale-110' 
                    : 'hover:bg-slate-200 text-slate-400'
                }`}
                title={isListening ? "Stop listening" : "Start voice input"}
             >
                {isListening ? (
                    <div className="relative">
                        <span className="absolute -inset-1 rounded-full bg-red-400 animate-ping opacity-20"></span>
                        <StopCircle className="w-5 h-5 fill-current" />
                    </div>
                ) : (
                    <Mic className="w-5 h-5" />
                )}
             </button>

             <button
                onClick={handleSubmit}
                disabled={!isValid || isLoading}
                className={`flex-shrink-0 p-2 rounded-xl transition-all duration-200 ${
                isValid && !isLoading
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                    : 'bg-slate-200 text-slate-300 cursor-not-allowed'
                }`}
            >
                {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                <ArrowUp className="w-5 h-5" />
                )}
            </button>
          </div>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
            Micro-Innovation Advisor can make mistakes. Consider checking important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdeaInput;