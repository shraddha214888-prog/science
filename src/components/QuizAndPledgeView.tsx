import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { quizQuestions } from '../data/quizData';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  Leaf, 
  Download, 
  RotateCcw,
  Check
} from 'lucide-react';

interface QuizAndPledgeViewProps {
  lang: Language;
}

export const QuizAndPledgeView: React.FC<QuizAndPledgeViewProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'pledge' | 'quiz'>('pledge');

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Pledge state
  const [pledgeName, setPledgeName] = useState<string>(() => {
    return localStorage.getItem('harit_pledge_name') || '';
  });
  const [pledgeCity, setPledgeCity] = useState<string>(() => {
    return localStorage.getItem('harit_pledge_city') || 'અમદાવાદ (Ahmedabad)';
  });
  const [hasTakenPledge, setHasTakenPledge] = useState<boolean>(() => {
    return localStorage.getItem('harit_certificate_generated') === 'true';
  });
  const [certId, setCertId] = useState<string>(() => {
    return localStorage.getItem('harit_cert_id') || 'HU-' + Math.floor(100000 + Math.random() * 900000);
  });
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  // Handle quiz answer
  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return; // already answered

    const currentQ = quizQuestions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Handle Taking Pledge
  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;

    const newId = 'HU-' + Math.floor(100000 + Math.random() * 900000);
    setCertId(newId);
    setHasTakenPledge(true);
    localStorage.setItem('harit_pledge_name', pledgeName);
    localStorage.setItem('harit_pledge_city', pledgeCity);
    localStorage.setItem('harit_certificate_generated', 'true');
    localStorage.setItem('harit_cert_id', newId);

    // Fire joyful celebratory confetti!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#10b981', '#059669', '#34d399', '#f59e0b', '#3b82f6']
    });
  };

  const handleCopyPledge = () => {
    const text = `🌿 મેં "હરિત ઊર્જા અને પર્યાવરણ સંરક્ષણ" ની પ્રતિજ્ઞા લીધી છે! પ્રમાણપત્ર ક્રમાંક: ${certId}. આપ પણ હરિત જીવનશૈલી અપનાવો.`;
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2500);
  };

  const currentQ = quizQuestions[currentQuestionIndex];
  const answeredOption = selectedAnswers[currentQuestionIndex];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Top Segmented Tabs */}
      <div className="flex p-1 bg-stone-200/80 rounded-xl">
        <button
          onClick={() => setActiveTab('pledge')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'pledge'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-600" />
          <span>{translations.quiz.pledgeTab[lang]}</span>
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-purple-600" />
          <span>{translations.quiz.quizTab[lang]}</span>
        </button>
      </div>

      {activeTab === 'pledge' ? (
        /* PLEDGE & CERTIFICATE VIEW */
        <div className="space-y-4">
          {!hasTakenPledge ? (
            /* Pledge Taking Form */
            <form onSubmit={handleGenerateCertificate} className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span>{lang === 'gu' ? 'હરિત નાગરિક પ્રતિજ્ઞા' : lang === 'hi' ? 'हरित नागरिक प्रतिज्ञा' : 'Green Citizen Eco-Pledge'}</span>
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  {lang === 'gu'
                    ? 'પ્રકૃતિ અને હરિત ઊર્જા પ્રત્યે તમારી પ્રતિબદ્ધતા દર્શાવો અને તમારું માન્ય પ્રમાણપત્ર મેળવો.'
                    : lang === 'hi'
                    ? 'प्रकृति एवं स्वच्छ ऊर्जा के प्रति अपनी प्रतिबद्धता जताएं और डिजिटल प्रमाणपत्र पाएं।'
                    : 'Commit to sustainable living and receive your personalized digital certificate.'}
                </p>
              </div>

              {/* 5 Green Commitments list */}
              <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-100 space-y-2 text-xs text-emerald-950">
                <div className="font-bold text-emerald-900">
                  {lang === 'gu' ? 'મારો પંચ-સંકલ્પ (૫ નિયમો):' : lang === 'hi' ? 'मेरे 5 हरित संकल्प:' : 'My 5 Green Commitments:'}
                </div>
                <ul className="space-y-1.5 text-stone-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lang === 'gu' ? '૧. ઘરમાં નકામી વીજળી, લાઇટ અને પંખા બંધ રાખીશ.' : lang === 'hi' ? '1. घर में अनावश्यक बिजली, लाइट व पंखे बंद रखूंगा।' : '1. Turn off all idle appliances and save power.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lang === 'gu' ? '૨. સિંગલ-યુઝ પ્લાસ્ટિકનો સદંતર ત્યાગ કરી કાપડની થેલી વાપરીશ.' : lang === 'hi' ? '2. प्लास्टिक थैली त्यागकर कपड़े का थैला अपनाऊंगा।' : '2. Refuse single-use plastic and carry cloth bags.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lang === 'gu' ? '૩. પાણીનો એક પણ ટીપો વેડફીશ નહીં અને વરસાદી પાણી સંગ્રહ કરીશ.' : lang === 'hi' ? '3. जल का अपव्यय रोकूंगा एवं वर्षा जल सहेजने का प्रयास करूंगा।' : '3. Conserve fresh water and promote rainwater harvesting.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lang === 'gu' ? '૪. વર્ષમાં ઓછામાં ઓછું એક દેશી વૃક્ષ વાવી તેનો ઉછેર કરીશ.' : lang === 'hi' ? '4. वर्ष में कम से कम एक देसी पेड़ लगाकर उसकी देखभाल करूंगा।' : '4. Plant and nurture at least one native tree each year.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lang === 'gu' ? '૫. રૂફટોપ સોલાર અને સ્વચ્છ ઊર્જા માટે પરિવાર-સમાજમાં જાગૃતિ ફેલાવીશ.' : lang === 'hi' ? '5. सौर ऊर्जा और स्वच्छ तकनीकों के प्रति समाज को प्रेरित करूंगा।' : '5. Inspire neighbors and family to adopt rooftop solar energy.'}</span>
                  </li>
                </ul>
              </div>

              {/* Name & City inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {translations.quiz.pledgeNameLabel[lang]} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={pledgeName}
                    onChange={(e) => setPledgeName(e.target.value)}
                    placeholder={lang === 'gu' ? 'દા.ત. રમેશભાઈ પટેલ' : lang === 'hi' ? 'उदा. राजेश शर्मा' : 'e.g. Ramesh Patel'}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {translations.quiz.pledgeCityLabel[lang]}
                  </label>
                  <input
                    type="text"
                    value={pledgeCity}
                    onChange={(e) => setPledgeCity(e.target.value)}
                    placeholder="Ahmedabad / Rajkot / Surat / Vadodara"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{translations.quiz.takePledgeBtn[lang]}</span>
              </button>
            </form>
          ) : (
            /* GENERATED OFFICIAL CERTIFICATE */
            <div className="space-y-4">
              <div className="relative p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-stone-50 to-emerald-50/40 border-4 border-double border-emerald-700 shadow-md text-center space-y-4 overflow-hidden">
                {/* Certificate Watermark / Header */}
                <div className="flex items-center justify-between border-b-2 border-emerald-600/30 pb-3">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>હરિત ઊર્જા અભિયાન</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold">
                    CERT NO: {certId}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs uppercase tracking-widest text-emerald-800 font-bold mt-2">
                    {lang === 'gu' ? 'પર્યાવરણ સંરક્ષણ પ્રમાણપત્ર' : lang === 'hi' ? 'पर्यावरण संरक्षण प्रमाणपत्र' : 'CERTIFICATE OF ENVIRONMENTAL COMMITMENT'}
                  </h3>
                  <div className="text-[11px] text-stone-500">
                    {lang === 'gu' ? 'ગૌરવપૂર્વક એનાયત કરવામાં આવે છે' : lang === 'hi' ? 'ससम्मान प्रदान किया जाता है' : 'This is proudly presented to'}
                  </div>
                </div>

                {/* Recipient Name */}
                <div className="py-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-stone-900 border-b-2 border-stone-800 inline-block px-4 pb-1">
                    {pledgeName}
                  </div>
                  <div className="text-xs text-stone-600 mt-1 font-medium">
                    {pledgeCity}
                  </div>
                </div>

                <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed italic">
                  {lang === 'gu'
                    ? '"હરિત ઊર્જા અપનાવી, વીજળી અને જળ સંરક્ષણ કરી, તથા પૃથ્વીના રક્ષણ માટે દૈનિક હરિત આદતોનું પાલન કરવાની ગૌરવશાળી પ્રતિજ્ઞા લેવા બદલ હરિત રક્ષક તરીકે બિરદાવવામાં આવે છે."'
                    : lang === 'hi'
                    ? '"हरित ऊर्जा अपनाने, जल व बिजली संरक्षण करने, और पर्यावरण की रक्षा हेतु दैनिक हरित आदतों का पालन करने के संकल्प के लिए आपको हरित रक्षक सम्मान प्रदान किया जाता है।"'
                    : '"For taking the solemn pledge to champion renewable energy, conserve water and electricity, eliminate plastic waste, and nurture native biodiversity for a sustainable planet."'}
                </p>

                {/* Seal & Date footer */}
                <div className="pt-4 border-t border-emerald-600/20 flex items-center justify-between text-left text-[11px] text-stone-600">
                  <div>
                    <div className="text-[10px] text-stone-400">તારીખ (Date):</div>
                    <div className="font-semibold text-stone-800">
                      {new Date().toLocaleDateString(lang === 'gu' ? 'gu-IN' : 'en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-emerald-700 flex flex-col items-center justify-center text-center p-1 bg-white shadow-xs">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[8px] font-bold text-emerald-900 leading-none mt-0.5">
                      SEAL OF GREEN
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-stone-400">સહી (Signature):</div>
                    <div className="font-bold text-emerald-900 font-serif italic">
                      હરિત મિત્ર પરિષદ
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopyPledge}
                  className="flex-1 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copyStatus ? (lang === 'gu' ? 'કોપી થઈ ગયું!' : 'कॉपी हुआ!') : (lang === 'gu' ? 'શેર કરો' : 'साझा करें')}</span>
                </button>
                <button
                  onClick={() => {
                    setHasTakenPledge(false);
                  }}
                  className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-stone-200"
                  title="Edit details"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'gu' ? 'નામ બદલો' : lang === 'hi' ? 'नाम बदलें' : 'Edit'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
          {!quizFinished ? (
            <div>
              {/* Question Header & Progress */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>
                  {lang === 'gu' ? 'પ્રશ્ન' : lang === 'hi' ? 'प्रश्न' : 'Question'} {currentQuestionIndex + 1} / {quizQuestions.length}
                </span>
                <span className="font-semibold text-emerald-700 font-mono">
                  {lang === 'gu' ? 'સ્કોર:' : lang === 'hi' ? 'स्कोर:' : 'Score:'} {quizScore}
                </span>
              </div>

              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h2 className="text-sm sm:text-base font-bold text-stone-900 leading-snug mb-3.5">
                {currentQ.question[lang]}
              </h2>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options[lang].map((optionText, optIdx) => {
                  const isSelected = answeredOption === optIdx;
                  const isCorrect = optIdx === currentQ.correctIndex;
                  const hasAnswered = answeredOption !== undefined;

                  let optionStyle = 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800';
                  if (hasAnswered) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                    } else {
                      optionStyle = 'bg-stone-50 border-stone-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between min-h-[46px] ${optionStyle}`}
                    >
                      <span>{optionText}</span>
                      {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                      {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Educational Explanation Box */}
              {showExplanation && (
                <div className="mt-4 p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1 animate-fade-in">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'gu' ? 'જ્ઞાન વર્ધક સમજૂતી:' : lang === 'hi' ? 'ज्ञानवर्धक स्पष्टीकरण:' : 'Fact Explanation:'}</span>
                  </div>
                  <p className="leading-relaxed text-stone-600">
                    {currentQ.explanation[lang]}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {showExplanation && (
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 w-full h-11 bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center"
                >
                  {currentQuestionIndex < quizQuestions.length - 1
                    ? (lang === 'gu' ? 'આગળનો પ્રશ્ન →' : lang === 'hi' ? 'अगला प्रश्न →' : 'Next Question →')
                    : (lang === 'gu' ? 'પરિણામ જુઓ' : lang === 'hi' ? 'परिणाम देखें' : 'View Results')}
                </button>
              )}
            </div>
          ) : (
            /* Quiz Completed Screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {lang === 'gu' ? 'ક્વિઝ સફળતાપૂર્વક પૂર્ણ!' : lang === 'hi' ? 'क्विज़ सफलतापूर्वक पूर्ण!' : 'Quiz Completed!'}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {lang === 'gu' ? 'હરિત ઊર્જા વિશે તમારું જ્ઞાન પ્રશંસનીય છે.' : lang === 'hi' ? 'हरित ऊर्जा के बारे में आपकी जानकारी सराहनीय है।' : 'Great job building your green energy knowledge.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 inline-block px-8">
                <div className="text-xs text-stone-500">
                  {lang === 'gu' ? 'તમારો સ્કોર' : lang === 'hi' ? 'आपका स्कोर' : 'Your Score'}
                </div>
                <div className="text-2xl font-bold text-emerald-700 font-mono mt-0.5">
                  {quizScore} / {quizQuestions.length}
                </div>
              </div>

              <div className="flex gap-2 max-w-xs mx-auto">
                <button
                  onClick={handleRestartQuiz}
                  className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-all border border-stone-200"
                >
                  {lang === 'gu' ? 'ફરીથી રમો' : lang === 'hi' ? 'पुनः खेलें' : 'Play Again'}
                </button>
                <button
                  onClick={() => setActiveTab('pledge')}
                  className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
                >
                  {lang === 'gu' ? 'પ્રતિજ્ઞા લો' : lang === 'hi' ? 'प्रतिज्ञा लें' : 'Take Pledge'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
