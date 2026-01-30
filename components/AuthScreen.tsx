import React, { useState } from 'react';
import { Mail, ArrowLeft, Chrome, Phone, Lock, Eye, EyeOff, AlertCircle, Loader2, User, UserCircle } from 'lucide-react';
import AppLogo from './AppLogo';

interface AuthScreenProps {
  onLogin: (name: string, email: string, avatar?: string) => void;
  onShowTerms: () => void;
}

type AuthView = 'options' | 'email' | 'phone';
type AuthMode = 'signin' | 'signup';

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onShowTerms }) => {
  const [view, setView] = useState<AuthView>('options');
  const [mode, setMode] = useState<AuthMode>('signin');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [loading, setLoading] = useState<string | null>(null);

  const handleBack = () => {
    setView('options');
    setError(null);
    setLoading(null);
  };

  const handleSocialLogin = (provider: 'google') => {
    setLoading(provider);
    setError(null);
    setTimeout(() => {
      onLogin('Alex Chen', 'alex.chen@student.edu', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
    }, 1500);
  };

  const handleGuestLogin = () => {
    setLoading('guest');
    setTimeout(() => {
      onLogin('Guest Student', 'guest@demo.local');
    }, 1000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Required fields are missing.');
      return;
    }
    setLoading('email');
    setTimeout(() => {
      onLogin(name || 'Student Builder', email);
    }, 1200);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Please enter a phone number.');
      return;
    }
    setLoading('phone');
    setTimeout(() => {
      onLogin('Mobile User', `user@mobile.local`);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 transition-colors duration-500">
      <div className="w-full max-w-[440px] bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 sm:p-12 space-y-8 animate-in zoom-in-95 duration-500">
        
        <div className="text-center space-y-4">
          <div className="flex justify-center">
             <AppLogo className="w-14 h-14 rounded-2xl shadow-sm border border-slate-100" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Micro-Innovation Advisor
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Academic project for project builders
            </p>
          </div>
        </div>

        <div className="bg-slate-100 p-1 rounded-xl flex relative overflow-hidden">
          <button 
            onClick={() => { setMode('signin'); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 z-10 ${mode === 'signin' ? 'text-slate-900' : 'text-slate-500'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => { setMode('signup'); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 z-10 ${mode === 'signup' ? 'text-slate-900' : 'text-slate-500'}`}
          >
            Sign Up
          </button>
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 transform ${mode === 'signup' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'}`}
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-xs animate-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {view === 'options' && (
          <div className="space-y-3 pt-2">
            <button 
              onClick={() => handleSocialLogin('google')}
              disabled={loading !== null}
              className="w-full relative flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading === 'google' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Chrome className="w-4 h-4 text-slate-900 absolute left-6" /> 
                  Login with Google
                </>
              )}
            </button>

            <button 
              onClick={() => setView('email')}
              disabled={loading !== null}
              className="w-full relative flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              <Mail className="w-4 h-4 text-slate-900 absolute left-6" /> 
              Login with Email
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="px-3 bg-white text-slate-400 font-bold uppercase tracking-widest">Or</span>
              </div>
            </div>

            <button 
              onClick={handleGuestLogin}
              disabled={loading !== null}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70"
            >
              {loading === 'guest' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <UserCircle className="w-4 h-4" />
                  Continue as Guest
                </>
              )}
            </button>
          </div>
        )}

        {(view === 'email') && (
          <form onSubmit={handleEmailSubmit} className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all outline-none text-sm"
                  placeholder="Student Name"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all outline-none text-sm"
                placeholder="student@university.edu"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all outline-none text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400"
                >
                  {showPassword ? <EyeOff className="h-4 h-4" /> : <Eye className="h-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-sm"
            >
              {loading === 'email' ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (mode === 'signin' ? 'Login' : 'Create Account')}
            </button>
            <button 
              type="button" 
              onClick={handleBack}
              className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 font-bold pt-2"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          </form>
        )}

        <div className="text-center pt-2">
           <p className="text-[10px] text-slate-400 leading-relaxed max-w-[280px] mx-auto uppercase tracking-widest font-bold">
            Project for educational use <br />
            <button onClick={onShowTerms} className="underline">Terms of Service</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;