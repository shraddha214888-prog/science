import React from 'react';
import { TabType, Language } from '../types';
import { translations } from '../data/translations';
import { Home, Zap, Calculator, Leaf, Award } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  lang
}) => {
  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: translations.nav.home[lang], icon: Home },
    { id: 'energy', label: translations.nav.energy[lang], icon: Zap },
    { id: 'calculator', label: translations.nav.calculator[lang], icon: Calculator },
    { id: 'conservation', label: translations.nav.conservation[lang], icon: Leaf },
    { id: 'quiz', label: translations.nav.quiz[lang], icon: Award }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-all relative ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-1 w-6 h-0.5 bg-emerald-400 rounded-full" />
              )}
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[64px] text-center">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
