import React, { useState } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Scanner } from './components/Scanner';
import { Advisory } from './components/Advisory';
import { Strategy } from './components/Strategy';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.STRATEGY); // Start with Strategy as requested by prompt context

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.DIAGNOSIS:
        return <Scanner />;
      case ViewState.ADVISORY:
        return <Advisory />;
      case ViewState.STRATEGY:
        return <Strategy />;
      default:
        return <Strategy />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
        {renderView()}
        <Navigation currentView={currentView} setView={setCurrentView} />
      </div>
    </div>
  );
}