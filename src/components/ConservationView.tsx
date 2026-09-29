import React, { useState, useEffect } from 'react';
import { Language, EcoHabit } from '../types';
import { translations } from '../data/translations';
import { dailyEcoHabits, conservationGuides } from '../data/conservationData';
import { 
  Check, 
  Leaf, 
  Droplets, 
  Recycle, 
  Lightbulb, 
  ChevronRight, 
  Sparkles, 
  TreePine, 
  ShieldCheck 
} from 'lucide-react';

interface ConservationViewProps {
  lang: Language;
}

export const ConservationView: React.FC<ConservationViewProps> = ({ lang }) => {
  // Loaded checked habits from localStorage
  const [completedHabits, setCompletedHabits] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('harit_completed_habits');
      return saved ? JSON.parse(saved) : ['habit_standby', 'habit_tap'];
    } catch {
      return ['habit_standby', 'habit_tap'];
    }
  });

  const [activeGuideId, setActiveGuideId] = useState<string>('rainwater');

  const handleToggleHabit = (id: string) => {
    setCompletedHabits((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('harit_completed_habits', JSON.stringify(next));
      return next;
    });
  };

  // Calculate current score
  const totalScore = dailyEcoHabits.reduce((acc, h) => {
    return completedHabits.includes(h.id) ? acc + h.points : acc;
  }, 0);

  const maxScore = dailyEcoHabits.reduce((acc, h) => acc + h.points, 0);

  const co2SavedToday = dailyEcoHabits.reduce((acc, h) => {
    return completedHabits.includes(h.id) ? acc + h.co2SavedKg : acc;
  }, 0);

  const activeGuide = conservationGuides.find((g) => g.id === activeGuideId) || conservationGuides[0];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          {translations.conservation.title[lang]}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600">
          {translations.conservation.subtitle[lang]}
        </p>
      </div>

      {/* Sustainable Home Visual Card with Generated High-Fidelity Asset */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 text-white shadow-sm">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-stone-800">
          <img
            src="/src/assets/images/paryavaran_sanraxan_home_1790593871460.jpg"
            alt="Sustainable eco-friendly home with solar panels and rainwater system"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
          
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-xs font-medium text-emerald-400">
            <Leaf className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'આદર્શ પર્યાવરણ-મૈત્રીપૂર્ણ ઘર' : lang === 'hi' ? 'आदर्श पर्यावरण-अनुकूल घर' : 'Sustainable Living'}</span>
          </div>
        </div>

        {/* Score & Metric progress */}
        <div className="p-4 bg-stone-900">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-stone-400">
                {translations.conservation.todayScore[lang]}
              </div>
              <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                {totalScore} <span className="text-xs text-stone-400 font-normal">/ {maxScore} pts</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-stone-400">
                {lang === 'gu' ? 'બચેલું CO₂' : lang === 'hi' ? 'बचाया गया CO₂' : 'CO₂ Prevented'}
              </div>
              <div className="text-base font-bold text-amber-300 font-mono tabular-nums">
                {co2SavedToday.toFixed(2)} kg
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-stone-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalScore / maxScore) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Habits Interactive Checklist */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'gu' ? 'આજની ૭ હરિત આદતો' : lang === 'hi' ? 'आज की 7 हरित आदतें' : "Today's 7 Green Habits"}</span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            {completedHabits.length}/{dailyEcoHabits.length} {translations.conservation.habitsCompleted[lang]}
          </span>
        </div>

        <div className="space-y-2">
          {dailyEcoHabits.map((habit) => {
            const isDone = completedHabits.includes(habit.id);
            return (
              <button
                key={habit.id}
                onClick={() => handleToggleHabit(habit.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 min-h-[56px] ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-stone-50/60 border-stone-200/70 hover:bg-stone-50'
                }`}
              >
                {/* Hitbox Checkbox */}
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-stone-300 bg-white'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Habit details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${isDone ? 'text-emerald-950 line-through opacity-85' : 'text-stone-900'}`}>
                      {habit.title[lang]}
                    </span>
                    <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded shrink-0">
                      +{habit.points} pts
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                    {habit.desc[lang]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Practical Conservation Guides */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {translations.conservation.conservationPillars[lang]}
        </div>

        {/* Guides Segmented Selector */}
        <div className="grid grid-cols-3 gap-2">
          {conservationGuides.map((guide) => {
            const isSelected = activeGuideId === guide.id;
            return (
              <button
                key={guide.id}
                onClick={() => setActiveGuideId(guide.id)}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center min-h-[64px] ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {guide.id === 'rainwater' && <Droplets className="w-4 h-4 mb-1 text-sky-400" />}
                {guide.id === 'waste_segregation' && <Recycle className="w-4 h-4 mb-1 text-emerald-400" />}
                {guide.id === 'energy_efficiency' && <Lightbulb className="w-4 h-4 mb-1 text-amber-400" />}
                <span className="text-[11px] font-medium leading-tight line-clamp-1">
                  {guide.title[lang].split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Guide Detail Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3.5">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-sm sm:text-base font-bold text-stone-900">
              {activeGuide.title[lang]}
            </h2>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {activeGuide.summary[lang]}
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-bold text-stone-800">
              {lang === 'gu' ? 'કાર્યવાહીના સરળ પગલાં:' : lang === 'hi' ? 'कार्यान्वयन के सरल चरण:' : 'Simple Practical Steps:'}
            </div>

            <div className="space-y-2 text-xs text-stone-700">
              {activeGuide.actionSteps[lang].map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-stone-50 border border-stone-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
