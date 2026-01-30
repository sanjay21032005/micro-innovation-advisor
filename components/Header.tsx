import React from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import AppLogo from './AppLogo';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-transparent">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600 md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Desktop Toggle Button */}
           <button 
            onClick={onMenuClick}
            className={`hidden md:block p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-opacity ${isSidebarOpen ? 'opacity-0 pointer-events-none w-0 p-0 overflow-hidden' : 'opacity-100'}`}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Model Selector Lookalike */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors group">
            <span className="text-lg font-semibold text-slate-700 group-hover:text-slate-900">
              Micro-Innovation 1.0
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 mt-0.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
           <AppLogo className="w-9 h-9 shadow-sm rounded-xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;