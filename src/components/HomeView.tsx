import React, { useState, useEffect } from 'react';
import { Language, TabType } from '../types';
import { translations } from '../data/translations';
import { 
  Sun, 
  Wind, 
  Leaf, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Flame, 
  Zap, 
  Calculator, 
  Sparkles,
  TreePine
} from 'lucide-react';

interface HomeViewProps {
  lang: Language;
  onNavigate: (tab: TabType) => void;
  onOpenHaritMitra: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  onNavigate,
  onOpenHaritMitra
}) => {
  // Local state for streak and daily pledge
  const [pledgedToday, setPledgedToday] = useState<boolean>(() => {
    return localStorage.getItem('harit_pledged_today') === 'true';
  });
  const [streakCount, setStreakCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('harit_streak') || '5', 10);
  });

  // Dynamic live metric simulation
  const [liveKwh, setLiveKwh] = useState<number>(1425890);
  const [co2Tons, setCo2Tons] = useState<number>(1169);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveKwh((prev) => prev + Math.floor(Math.random() * 4 + 2));
      setCo2Tons((prev) => prev + 0.003);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleTakeDailyAction = () => {
    if (!pledgedToday) {
      setPledgedToday(true);
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      localStorage.setItem('harit_pledged_today', 'true');
      localStorage.setItem('harit_streak', String(newStreak));
    }
  };

  const dailyPrompts = {
    gu: 'આજનો સંકલ્પ: બપોરે ઘરમાં લાઈટ્સ બંધ રાખી કુદરતી સૂર્યપ્રકાશનો ઉપયોગ કરીશ અને પ્લાસ્ટિક બેગનો અસ્વીકાર કરીશ.',
    hi: 'आज का संकल्प: दिन में गैर-जरूरी लाइट्स बंद रखूंगा, प्राकृतिक रोशनी अपनाऊंगा और प्लास्टिक थैली नहीं लूंगा।',
    en: "Today's Pledge: I will utilize natural sunlight during daytime and decline single-use plastic bags."
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Hero Visual Card with High-Fidelity Asset */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 text-white shadow-md">
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-800">
          <img
            src="/src/assets/images/harit_urja_solar_wind_hero_1790593853123.jpg"
            alt="Solar panels and wind turbines in green landscape"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              // Fallback container if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          
          {/* Subtle Live Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-xs font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{translations.appSubtitle[lang]}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 -mt-8 relative z-10">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white text-balance leading-snug">
            {translations.home.heroTitle[lang]}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
            {translations.home.heroDesc[lang]}
          </p>

          {/* Quick CTA row */}
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('calculator')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-lg transition-all shadow-sm"
            >
              <Sun className="w-4 h-4" />
              <span>{translations.home.calcSolar[lang]}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
            <button
              onClick={() => onNavigate('energy')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 rounded-lg transition-all border border-stone-700/60"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{translations.home.virtualLab[lang]}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Green Habit & Streak Check-in */}
      <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900">
                {translations.home.dailyPledgeBanner[lang]}
              </div>
              <div className="text-[11px] text-stone-500">
                {dailyPrompts[lang]}
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="tabular-nums">{streakCount}</span>
            </div>
            <div className="text-[10px] text-stone-500">
              {translations.home.dailyStreak[lang]}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            {pledgedToday 
              ? (lang === 'gu' ? 'અભિનંદન! આજના હરિત સંકલ્પનું પાલન થયું છે.' : lang === 'hi' ? 'शाबाश! आज का हरित संकल्प पूरा हुआ।' : 'Great job! Today’s eco pledge is completed.')
              : (lang === 'gu' ? 'શું તમે આજનો પર્યાવરણ સંકલ્પ પૂર્ણ કર્યો?' : lang === 'hi' ? 'क्या आपने आज का पर्यावरण संकल्प पूरा किया?' : 'Did you perform today’s green pledge?')}
          </p>
          <button
            onClick={handleTakeDailyAction}
            disabled={pledgedToday}
            className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              pledgedToday
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{pledgedToday ? (lang === 'gu' ? 'પૂર્ણ' : lang === 'hi' ? 'पूर्ण' : 'Done') : (lang === 'gu' ? 'સ્વીકારો (+25 અંક)' : lang === 'hi' ? 'स्वीकारें (+25 अंक)' : 'Complete (+25 pts)')}</span>
          </button>
        </div>
      </div>

      {/* Live Community Milestones Ticker */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900 to-stone-950 text-white shadow-xs">
        <div className="flex items-center justify-between text-xs text-emerald-300 font-medium mb-3">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            {translations.home.liveImpactTitle[lang]}
          </span>
          <span className="text-[11px] text-emerald-400/80 font-mono">LIVE INDIA TICKER</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-xs">
            <div className="text-base sm:text-lg font-bold text-white font-mono tabular-nums">
              {(liveKwh / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] text-emerald-200 font-medium mt-0.5 truncate">
              {translations.home.cleanPowerGen[lang]}
            </div>
            <div className="text-[9px] text-stone-400 font-mono">kWh</div>
          </div>

          <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-xs">
            <div className="text-base sm:text-lg font-bold text-emerald-300 font-mono tabular-nums">
              {co2Tons.toFixed(1)}
            </div>
            <div className="text-[10px] text-emerald-200 font-medium mt-0.5 truncate">
              {translations.home.co2Avoided[lang]}
            </div>
            <div className="text-[9px] text-stone-400 font-mono">Tons CO₂</div>
          </div>

          <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-xs">
            <div className="text-base sm:text-lg font-bold text-amber-300 font-mono tabular-nums">
              {Math.floor(liveKwh / 21)}
            </div>
            <div className="text-[10px] text-emerald-200 font-medium mt-0.5 truncate">
              {translations.home.treesEquiv[lang]}
            </div>
            <div className="text-[9px] text-stone-400 font-mono">Trees</div>
          </div>
        </div>
      </div>

      {/* 4 Core Quick Navigation Cards */}
      <div>
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
          {translations.home.quickActions[lang]}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigate('calculator')}
            className="p-3 text-left bg-white rounded-xl border border-stone-200/80 hover:border-emerald-300 hover:shadow-sm transition-all group min-h-[90px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sun className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900 group-hover:text-amber-800">
                {translations.home.calcSolar[lang]}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {lang === 'gu' ? 'સબસિડી અને માસિક બચત' : lang === 'hi' ? 'सब्सिडी व मासिक बचत' : 'Subsidies & savings'}
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('energy')}
            className="p-3 text-left bg-white rounded-xl border border-stone-200/80 hover:border-emerald-300 hover:shadow-sm transition-all group min-h-[90px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Wind className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900 group-hover:text-sky-800">
                {translations.home.virtualLab[lang]}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {lang === 'gu' ? 'લાઈવ સોલાર-વિન્ડ સિમ્યુલેટર' : lang === 'hi' ? 'लाइव सोलर-विंड सिमुलेटर' : 'Live physics simulation'}
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('conservation')}
            className="p-3 text-left bg-white rounded-xl border border-stone-200/80 hover:border-emerald-300 hover:shadow-sm transition-all group min-h-[90px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Leaf className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900 group-hover:text-emerald-800">
                {translations.nav.conservation[lang]}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {lang === 'gu' ? 'પાણી, કચરો અને આદતો' : lang === 'hi' ? 'जल, कचरा एवं दैनिक आदतें' : 'Water, waste & habits'}
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            className="p-3 text-left bg-white rounded-xl border border-stone-200/80 hover:border-emerald-300 hover:shadow-sm transition-all group min-h-[90px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900 group-hover:text-purple-800">
                {translations.home.pledgeCert[lang]}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {lang === 'gu' ? 'ક્વિઝ અને સર્ટિફિકેટ' : lang === 'hi' ? 'क्विज़ एवं प्रमाणपत्र' : 'Quiz & Certificate'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Did You Know? Gujarat & India Renewable Milestones */}
      <div className="p-4 rounded-xl bg-stone-100/90 border border-stone-200">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{translations.home.didYouKnow[lang]}</span>
        </div>
        
        <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
          <div className="p-2.5 rounded-lg bg-white border border-stone-200/60">
            <span className="font-semibold text-emerald-800">
              {lang === 'gu' ? 'મોઢેરા સોલાર વિલેજ: ' : lang === 'hi' ? 'मोढेरा सोलर गांव: ' : 'Modhera Solar Village: '}
            </span>
            {translations.home.modheraFact[lang]}
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-stone-200/60">
            <span className="font-semibold text-emerald-800">
              {lang === 'gu' ? 'ખાવડા હાઇબ્રિડ પાર્ક: ' : lang === 'hi' ? 'खावड़ा हाइब्रिड पार्क: ' : 'Khavda Hybrid Park: '}
            </span>
            {translations.home.khavdaFact[lang]}
          </div>
        </div>
      </div>

      {/* Floating Harit Mitra banner */}
      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-950">
              {translations.haritMitra.modalTitle[lang]}
            </div>
            <div className="text-[11px] text-emerald-800">
              {lang === 'gu' ? 'સોલાર સબસિડી કે પર્યાવરણ સલાહ તરત મેળવો' : lang === 'hi' ? 'सोलर सब्सिडी या पर्यावरण सलाह तुरंत पाएं' : 'Get instant answers for green energy & subsidies'}
            </div>
          </div>
        </div>
        <button
          onClick={onOpenHaritMitra}
          className="min-h-[36px] px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 active:scale-95 rounded-lg transition-all shrink-0"
        >
          {lang === 'gu' ? 'વાત કરો' : lang === 'hi' ? 'बात करें' : 'Chat'}
        </button>
      </div>
    </div>
  );
};
