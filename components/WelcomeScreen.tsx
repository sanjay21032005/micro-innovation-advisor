import React from 'react';
import { ArrowRight, Lightbulb, Zap, Rocket, BookOpen, PenTool, Sparkles } from 'lucide-react';
import AppLogo from './AppLogo';

interface WelcomeScreenProps {
  onExampleClick: (text: string) => void;
}

const EXAMPLES = [
  {
    text: "I'm building a fitness app for remote workers. Users forget to open it.",
    icon: <Zap className="w-4 h-4 text-slate-500" />,
    label: "User Interaction"
  },
  {
    text: "I have a dashboard for freelancers to track invoices. It looks boring.",
    icon: <Lightbulb className="w-4 h-4 text-slate-500" />,
    label: "Interface Design"
  },
  {
    text: "I'm making a study aid for medical students. It feels repetitive.",
    icon: <Rocket className="w-4 h-4 text-slate-500" />,
    label: "Task Flow"
  },
  {
    text: "My portfolio site is functional but doesn't show my personality.",
    icon: <PenTool className="w-4 h-4 text-slate-500" />,
    label: "Personal Branding"
  }
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExampleClick }) => {
  return (
    <div className="flex flex-col items-center w-full animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Student Demo Project
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Micro-Innovation <br />
            Advisor
          </h1>
          
          <p className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
            A simple tool designed to help early-stage builders find small, actionable improvements for their projects. Focus on minor changes that create a better experience.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={() => onExampleClick("I'm starting a new web project and want to make it unique.")}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-base shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-300 active:scale-[0.98] transition-all duration-300"
            >
              Get Micro-Innovations
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">or browse examples below</p>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="relative group">
            <div className="absolute -inset-1 bg-slate-200 rounded-[2rem] opacity-20 blur group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                alt="Students collaborating" 
                className="w-full h-[300px] object-cover grayscale-[0.2] contrast-[1.1]"
              />
              <div className="p-6 bg-slate-50/80 backdrop-blur-sm border-t border-slate-200">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2 text-center">Contextual Analysis</p>
                <p className="text-slate-700 text-sm font-medium text-center italic">
                  "Identifying small opportunities for improvement during the early stages of development."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Examples Grid Section */}
      <section className="w-full max-w-5xl px-6 py-12 border-t border-slate-100">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Scenario Examples</h2>
          <p className="text-slate-500 text-sm">Select a common challenge to see how the advisor provides feedback.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => onExampleClick(ex.text)}
              className="group text-left p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  {ex.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ex.label}</span>
              </div>
              
              <p className="text-slate-700 group-hover:text-slate-900 font-medium leading-snug">
                "{ex.text}"
              </p>
              
              <div className="mt-4 flex items-center text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-all">
                View Suggestions <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="w-full py-12 flex flex-col items-center gap-3 border-t border-slate-50 mt-12">
        <AppLogo className="w-8 h-8 grayscale opacity-50" />
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Educational Research Project</span>
      </footer>
    </div>
  );
};

export default WelcomeScreen;