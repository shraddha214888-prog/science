import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';

interface HaritMitraModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const HaritMitraModal: React.FC<HaritMitraModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: lang === 'gu'
        ? 'નમસ્તે! હું "હરિત મિત્ર" છું. રૂફટોપ સોલાર, પીએમ સૂર્ય ઘર યોજના, વીજળી બચત કે પર્યાવરણ સંરક્ષણ વિશે કોઈપણ પ્રશ્ન પૂછો!'
        : lang === 'hi'
        ? 'नमस्ते! मैं "हरित मित्र" हूं। रूफटॉप सोलर, पीएम सूर्य घर योजना, बिजली बचत या पर्यावरण संरक्षण को लेकर कोई भी सवाल पूछें!'
        : 'Hello! I am "Harit Mitra". Feel free to ask any question regarding rooftop solar subsidies, power savings, or eco conservation!'
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickPrompts = {
    gu: [
      'રૂફટોપ સોલાર સબસિડી કેવી રીતે મળે?',
      'વરસાદી પાણી સંચય (Rainwater) કેવી રીતે કરવું?',
      'વીજળીનું બિલ 40% કેવી રીતે ઘટાડવું?'
    ],
    hi: [
      'रूफटॉप सोलर पर कितनी सरकारी सब्सिडी मिलती है?',
      'घर पर वर्षा जल संचयन कैसे शुरू करें?',
      'बिजली बिल 40% तक कैसे कम करें?'
    ],
    en: [
      'How to get PM Surya Ghar solar subsidy?',
      'How does rooftop rainwater harvesting work?',
      'How to reduce household power bill by 40%?'
    ]
  };

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/harit-mitra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, language: lang })
      });

      const data = await response.json();
      const replyText = data.reply || (
        lang === 'gu' 
          ? 'હરિત ઊર્જા અને પર્યાવરણ સંરક્ષણ એ આપણી સામૂહિક પ્રાથમિકતા છે. સોલાર પેનલ્સ અને એલઇડી બલ્બ વાપરવાથી વીજળી અને કાર્બન બંને બચે છે.'
          : 'Green energy and eco conservation are vital for our sustainable future.'
      );

      setMessages((prev) => [...prev, { role: 'assistant', text: replyText }]);
    } catch (err) {
      console.error('Error fetching Harit Mitra reply:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: lang === 'gu'
            ? 'સૂર્ય ઘર યોજના હેઠળ 3 kW સોલાર પર ₹78,000 સુધીની સબસિડી મળે છે. વધુ માહિતી માટે pmsuryaghar.gov.in પોર્ટલ જુઓ.'
            : 'Under PM Surya Ghar scheme, up to ₹78,000 subsidy is provided for 3 kW rooftop solar plants.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col h-[520px] max-h-[90vh] overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="p-3.5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{translations.haritMitra.modalTitle[lang]}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-[10px] text-stone-400">
                {lang === 'gu' ? 'પર્યાવરણ અને ઊર્જા માર્ગદર્શક' : lang === 'hi' ? 'पर्यावरण एवं ऊर्जा सलाहकार' : 'AI Green Energy Consultant'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-stone-50 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-[82%] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-xs'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {m.text}
              </div>
              {m.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-stone-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-stone-500 italic">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>{lang === 'gu' ? 'હરિત મિત્ર વિચારી રહ્યા છે...' : lang === 'hi' ? 'हरित मित्र सोच रहे हैं...' : 'Harit Mitra is thinking...'}</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-stone-100 border-t border-stone-200/80 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts[lang].map((pText, i) => (
            <button
              key={i}
              onClick={() => handleSend(pText)}
              disabled={isLoading}
              className="px-2.5 py-1 text-[11px] rounded-full bg-white border border-stone-200 hover:border-emerald-500 hover:text-emerald-800 transition-colors whitespace-nowrap text-stone-700"
            >
              {pText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={translations.haritMitra.inputPlaceholder[lang]}
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50 text-stone-900"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-9 h-9 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-95 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
