import React, { useState } from 'react';
import { Language, TabType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { EnergyLabView } from './components/EnergyLabView';
import { CalculatorView } from './components/CalculatorView';
import { ConservationView } from './components/ConservationView';
import { QuizAndPledgeView } from './components/QuizAndPledgeView';
import { HaritMitraModal } from './components/HaritMitraModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return (localStorage.getItem('harit_lang') as Language) || 'gu';
  });

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isHaritMitraOpen, setIsHaritMitraOpen] = useState<boolean>(false);

  const handleSelectLang = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('harit_lang', lang);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between selection:bg-emerald-200">
      {/* Container framing for mobile & desktop */}
      <div className="w-full max-w-lg mx-auto bg-stone-50 min-h-screen flex flex-col shadow-sm border-x border-stone-200/80 relative">
        {/* Sticky Mobile App Bar */}
        <Header
          currentLang={currentLang}
          onSelectLang={handleSelectLang}
          onOpenHaritMitra={() => setIsHaritMitraOpen(true)}
        />

        {/* Scrollable Main Content Area with Bottom Nav Spacing */}
        <main className="flex-1 p-4 pb-24 overflow-x-hidden">
          {activeTab === 'home' && (
            <HomeView
              lang={currentLang}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenHaritMitra={() => setIsHaritMitraOpen(true)}
            />
          )}

          {activeTab === 'energy' && (
            <EnergyLabView lang={currentLang} />
          )}

          {activeTab === 'calculator' && (
            <CalculatorView lang={currentLang} />
          )}

          {activeTab === 'conservation' && (
            <ConservationView lang={currentLang} />
          )}

          {activeTab === 'quiz' && (
            <QuizAndPledgeView lang={currentLang} />
          )}
        </main>

        {/* Fixed Thumb-Zone Bottom Tab Bar */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          lang={currentLang}
        />

        {/* Harit Mitra AI Advisor Modal */}
        <HaritMitraModal
          isOpen={isHaritMitraOpen}
          onClose={() => setIsHaritMitraOpen(false)}
          lang={currentLang}
        />
      </div>
    </div>
  );
}
