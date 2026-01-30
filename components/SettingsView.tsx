import React, { useState } from 'react';
import { User, Mail, Bell, CreditCard, Save, Check, Shield } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="max-w-2xl mx-auto space-y-10 pb-20">
        <header className="border-b border-slate-100 pb-6">
           <h2 className="text-2xl font-bold text-slate-900">Account Preferences</h2>
           <p className="text-slate-500 text-sm">Manage your demo account settings.</p>
        </header>

        {/* Profile Section */}
        <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User className="w-4 h-4" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-600">First Name</label>
                    <input type="text" defaultValue="Student" className="w-full rounded-xl border-slate-200 border px-4 py-2.5 focus:ring-1 focus:ring-slate-400 text-slate-900 text-sm bg-slate-50/50" />
                </div>
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-600">Last Name</label>
                    <input type="text" defaultValue="User" className="w-full rounded-xl border-slate-200 border px-4 py-2.5 focus:ring-1 focus:ring-slate-400 text-slate-900 text-sm bg-slate-50/50" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                     <label className="block text-xs font-semibold text-slate-600">Email Address</label>
                     <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                        <input type="email" defaultValue="student@demo.local" className="w-full rounded-xl border-slate-200 border pl-10 pr-4 py-2.5 focus:ring-1 focus:ring-slate-400 text-slate-900 text-sm bg-slate-50/50" />
                     </div>
                </div>
            </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4" /> System Preferences
            </h3>
             <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700">Email Notifications</span>
                        <span className="text-xs text-slate-400">Receive summaries of your sessions.</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded-md border-slate-300 text-slate-800 focus:ring-slate-400 w-5 h-5" />
                </div>
             </div>
        </div>

        {/* Info */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg border border-slate-100">
                <CreditCard className="w-4 h-4 text-slate-500" />
            </div>
            <div>
                <div className="text-sm font-semibold text-slate-900">Academic License</div>
                <div className="text-xs text-slate-500 leading-relaxed mt-1">This project is for educational demonstration. No billing features are enabled in this demo.</div>
            </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-50">
            <button onClick={onBack} className="px-4 py-2 text-slate-500 font-bold text-sm hover:text-slate-900 transition-colors">
                Return to Chat
            </button>
            <button 
                onClick={handleSave}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-sm shadow-sm"
            >
                {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {isSaved ? 'Changes Saved' : 'Save Preferences'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;