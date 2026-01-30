import React from 'react';
import { Plus, MessageSquare, Settings, LogOut, User, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
  onLogout: () => void;
  onSettings: () => void;
  className?: string;
  user: { name: string; email: string; avatar?: string } | null;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNewChat, onLogout, onSettings, className = '', user }) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-slate-50 border-r border-slate-200 flex flex-col transition-all duration-300 ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full opacity-0 md:opacity-100 md:w-0 md:-translate-x-full overflow-hidden'} ${className}`}>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-100 hover:shadow-md transition-all text-slate-700 font-medium text-sm group"
        >
          <div className="bg-slate-100 p-1 rounded-md group-hover:bg-slate-200 transition-colors">
            <Plus className="w-4 h-4 text-slate-600" />
          </div>
          New Session
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
        <div className="mb-4">
          <h3 className="text-[10px] font-bold text-slate-400 px-2 mb-2 uppercase tracking-widest">Navigation</h3>
          <div className="space-y-1">
            <button
              onClick={() => navigate('/history')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-200/50 text-sm text-slate-700 truncate transition-colors flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-slate-400" />
              Saved History
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-slate-200 bg-white/50">
        <button
          onClick={onSettings}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-200/50 transition-colors text-left group"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase">
              {user?.name ? user.name.substring(0, 2) : 'ST'}
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium text-slate-700 truncate">{user?.name || 'Student'}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Account</div>
          </div>
          <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
        </button>
        <button
          onClick={onLogout}
          className="mt-1 w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-3 h-3" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;