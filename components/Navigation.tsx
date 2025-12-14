import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, scan, MessageSquare, BookOpen, Camera } from 'lucide-react';

interface Props {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<Props> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Orchard' },
    { id: ViewState.DIAGNOSIS, icon: Camera, label: 'Scan' },
    { id: ViewState.ADVISORY, icon: MessageSquare, label: 'Advisor' },
    { id: ViewState.STRATEGY, icon: BookOpen, label: 'Master Plan' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};