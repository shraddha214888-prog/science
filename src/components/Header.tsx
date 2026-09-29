import React from 'react';
import { Language } from '../types';
import { translations, t } from '../data/translations';
import { Sparkles, Leaf } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenHaritMitra: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  onOpenHaritMitra
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 shadow-sm transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Zone 1: Brand title, single line text wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Leaf className="w-4 h-4" />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
            {translations.appName[currentLang]}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </span>
        </div>

        {/* Zone 2 & 3: Language Segmented Control & Harit Mitra Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-stone-800/90 rounded-lg p-0.5 border border-stone-700/60 text-xs">
            <button
              onClick={() => onSelectLang('gu')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                currentLang === 'gu'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="ગુજરાતી"
            >
              ગુજ
            </button>
            <button
              onClick={() => onSelectLang('hi')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                currentLang === 'hi'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="हिन्दी"
            >
              हिं
            </button>
            <button
              onClick={() => onSelectLang('en')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                currentLang === 'en'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Harit Mitra AI Advisor Button */}
          <button
            onClick={onOpenHaritMitra}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{translations.haritMitra.buttonLabel[currentLang]}</span>
            <span className="sm:hidden">{currentLang === 'gu' ? 'મિત્ર' : currentLang === 'hi' ? 'मित्र' : 'Mitra'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
