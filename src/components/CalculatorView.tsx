import React, { useState } from 'react';
import { Language, SolarCalculationResult, CarbonFootprintResult } from '../types';
import { translations } from '../data/translations';
import { 
  Sun, 
  Leaf, 
  HelpCircle, 
  TrendingDown, 
  IndianRupee, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Car, 
  Flame, 
  ExternalLink 
} from 'lucide-react';

interface CalculatorViewProps {
  lang: Language;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({ lang }) => {
  const [calcMode, setCalcMode] = useState<'solar' | 'carbon'>('solar');

  // Solar Calculator inputs
  const [monthlyBill, setMonthlyBill] = useState<number>(2800);
  const [roofArea, setRoofArea] = useState<number>(350); // sq ft

  // Carbon Calculator inputs
  const [dailyCommuteKm, setDailyCommuteKm] = useState<number>(18);
  const [commuteMode, setCommuteMode] = useState<'bike' | 'car' | 'ev' | 'public'>('bike');
  const [monthlyElectricityUnits, setMonthlyElectricityUnits] = useState<number>(240);
  const [monthlyLpgCylinders, setMonthlyLpgCylinders] = useState<number>(1);
  const [plasticUseFrequency, setPlasticUseFrequency] = useState<'daily' | 'sometimes' | 'rarely'>('sometimes');

  // Compute Solar results based on official PM Surya Ghar norms
  const calculateSolar = (): SolarCalculationResult => {
    // Average residential tariff ~ ₹6.8 per unit in Gujarat / India
    const tariffPerUnit = 6.8;
    const monthlyUnitsRequired = Math.round(monthlyBill / tariffPerUnit);
    
    // 1 kW generates approx 125 units per month and needs ~90-100 sq ft
    let capacityKw = Math.max(1, Math.round((monthlyUnitsRequired / 125) * 10) / 10);
    
    // Check roof constraint
    const maxCapacityByRoof = Math.floor(roofArea / 90);
    if (maxCapacityByRoof > 0 && capacityKw > maxCapacityByRoof) {
      capacityKw = Math.max(1, maxCapacityByRoof);
    }
    
    // Cap at reasonable residential 10kW
    capacityKw = Math.min(10, capacityKw);

    // Panels count (assuming modern 540W mono PERC panels)
    const panelsCount = Math.ceil((capacityKw * 1000) / 540);
    const requiredArea = Math.round(capacityKw * 95);

    // Approximate cost: ~₹50,000/kW for 3kW+ and ~₹55,000 for 1-2kW
    const costPerKw = capacityKw <= 2 ? 55000 : 50000;
    const systemCostApprox = Math.round(capacityKw * costPerKw);

    // PM Surya Ghar Muft Bijli Yojana Central Subsidy:
    // 1 kW: ₹30,000 | 2 kW: ₹60,000 | >= 3 kW: ₹78,000
    let governmentSubsidy = 0;
    if (capacityKw >= 3) {
      governmentSubsidy = 78000;
    } else if (capacityKw >= 2) {
      governmentSubsidy = 60000;
    } else {
      governmentSubsidy = 30000;
    }

    const netCost = Math.max(0, systemCostApprox - governmentSubsidy);
    const monthlyGenUnits = Math.round(capacityKw * 125);
    const monthlySavings = Math.min(monthlyBill, Math.round(monthlyGenUnits * tariffPerUnit));
    const annualSavings = monthlySavings * 12;
    const paybackYears = annualSavings > 0 ? Math.round((netCost / annualSavings) * 10) / 10 : 3.5;
    const co2Offset = Math.round(capacityKw * 1.45 * 10) / 10;

    return {
      recommendedKw: capacityKw,
      panelsCount,
      requiredAreaSqFt: requiredArea,
      systemCostApprox,
      governmentSubsidy,
      netCost,
      monthlyGenerationUnits: monthlyGenUnits,
      monthlySavingsInr: monthlySavings,
      annualSavingsInr: annualSavings,
      paybackPeriodYears: paybackYears,
      co2OffsetTonsPerYear: co2Offset
    };
  };

  // Compute Carbon Footprint
  const calculateCarbon = (): CarbonFootprintResult => {
    // Emission factors (annual kg CO2)
    let transportEmissionsPerKm = 0.08; // petrol bike
    if (commuteMode === 'car') transportEmissionsPerKm = 0.18;
    if (commuteMode === 'ev') transportEmissionsPerKm = 0.03;
    if (commuteMode === 'public') transportEmissionsPerKm = 0.04;
    const transportTotal = Math.round(dailyCommuteKm * 330 * transportEmissionsPerKm);

    // Grid electricity: ~0.82 kg CO2 per kWh in India
    const electricityTotal = Math.round(monthlyElectricityUnits * 12 * 0.82);

    // LPG: ~42 kg CO2 per 14.2kg cylinder
    const cookingTotal = Math.round(monthlyLpgCylinders * 12 * 42);

    // Lifestyle / plastic
    let lifestyleTotal = 150;
    if (plasticUseFrequency === 'daily') lifestyleTotal = 320;
    if (plasticUseFrequency === 'rarely') lifestyleTotal = 60;

    const totalCo2 = transportTotal + electricityTotal + cookingTotal + lifestyleTotal;
    const treesNeeded = Math.ceil(totalCo2 / 21);

    let tier: 'excellent' | 'moderate' | 'high' = 'moderate';
    if (totalCo2 < 1800) tier = 'excellent';
    else if (totalCo2 > 3500) tier = 'high';

    return {
      totalCo2KgPerYear: totalCo2,
      categoryScores: {
        transport: transportTotal,
        electricity: electricityTotal,
        cooking: cookingTotal,
        lifestyle: lifestyleTotal
      },
      treesNeededToOffset: treesNeeded,
      ratingTier: tier
    };
  };

  const solarRes = calculateSolar();
  const carbonRes = calculateCarbon();

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Top Segmented Tabs for Dual Mode */}
      <div className="flex p-1 bg-stone-200/80 rounded-xl">
        <button
          onClick={() => setCalcMode('solar')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            calcMode === 'solar'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-500" />
          <span>{translations.calculator.solarTab[lang]}</span>
        </button>
        <button
          onClick={() => setCalcMode('carbon')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            calcMode === 'carbon'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>{translations.calculator.carbonTab[lang]}</span>
        </button>
      </div>

      {calcMode === 'solar' ? (
        /* SOLAR CALCULATOR */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="text-sm font-bold text-stone-900">
                {translations.calculator.solarTab[lang]}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {lang === 'gu'
                  ? 'પીએમ સૂર્ય ઘર યોજના હેઠળ તમારી છત પર સોલાર લગાવી વીજળી બિલ ઝીરો કરો'
                  : lang === 'hi'
                  ? 'पीएम सूर्य घर योजना के तहत रूफटॉप सोलर से बिजली बिल शून्य करें'
                  : 'Calculate PM Surya Ghar subsidy and monthly bill savings for your home'}
              </div>
            </div>

            {/* Slider 1: Monthly Bill */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span>{translations.calculator.billLabel[lang]}</span>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  ₹{monthlyBill.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="200"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>₹500</span>
                <span>₹7,500</span>
                <span>₹15,000</span>
              </div>
            </div>

            {/* Slider 2: Roof Space */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span>{translations.calculator.roofAreaLabel[lang]}</span>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  {roofArea} sq. ft.
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="25"
                value={roofArea}
                onChange={(e) => setRoofArea(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>100 sq ft</span>
                <span>750 sq ft</span>
                <span>1500 sq ft</span>
              </div>
            </div>
          </div>

          {/* Results Summary Cards */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 text-white shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-xs text-stone-400">
                  {translations.calculator.recCapacity[lang]}
                </span>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                  {solarRes.recommendedKw} kW
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">
                  {translations.calculator.panelsRequired[lang]}
                </span>
                <div className="text-lg font-bold text-white font-mono">
                  {solarRes.panelsCount} {lang === 'gu' ? 'પેનલ્સ' : lang === 'hi' ? 'पैनल्स' : 'panels'}
                </div>
              </div>
            </div>

            {/* Cost and Subsidy breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 rounded-xl p-2.5">
                <div className="text-[10px] text-stone-300">
                  {translations.calculator.approxCost[lang]}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono mt-1">
                  ₹{solarRes.systemCostApprox.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-emerald-500/20 rounded-xl p-2.5 border border-emerald-400/30">
                <div className="text-[10px] text-emerald-300 font-medium">
                  {translations.calculator.govSubsidy[lang]}
                </div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-1">
                  -₹{solarRes.governmentSubsidy.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-2.5">
                <div className="text-[10px] text-stone-300">
                  {translations.calculator.netInvest[lang]}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono mt-1">
                  ₹{solarRes.netCost.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Savings & Payback period */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60">
                <div className="text-[11px] text-stone-400">
                  {translations.calculator.annualSave[lang]}
                </div>
                <div className="text-base font-bold text-amber-300 font-mono mt-0.5">
                  ₹{solarRes.annualSavingsInr.toLocaleString('en-IN')} / yr
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60">
                <div className="text-[11px] text-stone-400">
                  {translations.calculator.payback[lang]}
                </div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {solarRes.paybackPeriodYears} {lang === 'gu' ? 'વર્ષ' : lang === 'hi' ? 'वर्ष' : 'Years'}
                </div>
              </div>
            </div>

            {/* Environmental Metric */}
            <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'gu' ? 'વાર્ષિક CO₂ કપાત:' : lang === 'hi' ? 'वार्षिक CO₂ कटौती:' : 'Annual CO₂ Offset:'}
              </span>
              <span className="font-bold text-white font-mono">
                {solarRes.co2OffsetTonsPerYear} Tons / yr
              </span>
            </div>
          </div>

          {/* PM Surya Ghar Step-by-Step Guide */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{translations.calculator.applyStepsTitle[lang]}</span>
            </div>
            
            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <span className="font-semibold text-stone-900">
                    {lang === 'gu' ? 'નેશનલ પોર્ટલ પર રજીસ્ટ્રેશન: ' : lang === 'hi' ? 'पोर्टल पर रजिस्ट्रेशन: ' : 'Register on National Portal: '}
                  </span>
                  <span>pmsuryaghar.gov.in પર તમારું રાજ્ય અને વીજળી કનેક્શન (Discom CA નંબર) દાખલ કરો.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <span className="font-semibold text-stone-900">
                    {lang === 'gu' ? 'મંજૂર વેન્ડર પસંદગી: ' : lang === 'hi' ? 'अनुमोदित वेंडर चयन: ' : 'Select Registered Vendor: '}
                  </span>
                  <span>પોતાની પસંદગીના અધિકૃત વેન્ડર પાસેથી યોગ્ય ક્ષમતાનું સોલાર પ્લાન્ટ લગાવો.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <span className="font-semibold text-stone-900">
                    {lang === 'gu' ? 'નેટ મીટરિંગ & સબસિડી: ' : lang === 'hi' ? 'नेट मीटरिंग एवं सब्सिडी: ' : 'Net Metering & Direct Subsidy: '}
                  </span>
                  <span>નેટ મીટર ઇન્સ્ટોલેશન બાદ ₹78,000 સુધીની સબસિડી 30 દિવસમાં સીધી બેંક ખાતામાં જમા થાય છે!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CARBON FOOTPRINT CALCULATOR */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="text-sm font-bold text-stone-900">
                {translations.calculator.carbonTab[lang]}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {lang === 'gu'
                  ? 'તમારો દૈનિક પ્રવાસ, વીજળી અને જીવનશૈલીથી ઉત્પન્ન થતો કાર્બન જાણો'
                  : lang === 'hi'
                  ? 'अपनी दैनिक यात्रा, बिजली और जीवनशैली से कार्बन उत्सर्जन मापें'
                  : 'Assess your personal greenhouse gas footprint and discover high-impact steps'}
              </div>
            </div>

            {/* Commute Mode */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-2">
                {lang === 'gu' ? 'મુખ્ય પરિવહન સાધન' : lang === 'hi' ? 'दैनिक परिवहन का साधन' : 'Daily Commute Mode'}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'bike', label: lang === 'gu' ? 'બાઇક' : lang === 'hi' ? 'बाइक' : 'Bike' },
                  { id: 'car', label: lang === 'gu' ? 'કાર' : lang === 'hi' ? 'कार' : 'Car' },
                  { id: 'ev', label: 'EV' },
                  { id: 'public', label: lang === 'gu' ? 'બસ/મેટ્રો' : lang === 'hi' ? 'बस/मेट्रो' : 'Transit' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCommuteMode(item.id as any)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all ${
                      commuteMode === item.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily km */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span>{lang === 'gu' ? 'રોજની મુસાફરી (કિમી)' : lang === 'hi' ? 'रोजाना यात्रा (किमी)' : 'Daily Commute Distance (km)'}</span>
                <span className="font-mono font-bold text-stone-900 text-xs">
                  {dailyCommuteKm} km / day
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="2"
                value={dailyCommuteKm}
                onChange={(e) => setDailyCommuteKm(Number(e.target.value))}
                className="w-full accent-stone-800 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Electricity units */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span>{lang === 'gu' ? 'માસિક વીજળી વપરાશ (યુનિટ/kWh)' : lang === 'hi' ? 'मासिक बिजली खपत (यूनिट)' : 'Monthly Power Units (kWh)'}</span>
                <span className="font-mono font-bold text-stone-900 text-xs">
                  {monthlyElectricityUnits} units
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="10"
                value={monthlyElectricityUnits}
                onChange={(e) => setMonthlyElectricityUnits(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Plastic habit */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-2">
                {lang === 'gu' ? 'પ્લાસ્ટિક બેગ / નિકાલજોગ વપરાશ' : lang === 'hi' ? 'प्लास्टिक थैली का उपयोग' : 'Single-use Plastic Frequency'}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'rarely', label: lang === 'gu' ? 'ક્યારેક જ / નહિવત' : lang === 'hi' ? 'शून्य/दुर्लभ' : 'Rarely (Cloth)' },
                  { id: 'sometimes', label: lang === 'gu' ? 'ક્યારેક' : lang === 'hi' ? 'कभी-कभी' : 'Moderate' },
                  { id: 'daily', label: lang === 'gu' ? 'દરરોજ' : lang === 'hi' ? 'रोजाना' : 'Frequent' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPlasticUseFrequency(item.id as any)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all ${
                      plasticUseFrequency === item.id
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Carbon Assessment Result */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500">
                  {lang === 'gu' ? 'વાર્ષિક કાર્બન ઉત્સર્જન' : lang === 'hi' ? 'वार्षिक कुल कार्बन फुटप्रिंट' : 'Annual Carbon Footprint'}
                </span>
                <div className="text-2xl font-extrabold text-stone-900 font-mono mt-0.5">
                  {(carbonRes.totalCo2KgPerYear / 1000).toFixed(2)} Tons CO₂
                </div>
              </div>

              <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                carbonRes.ratingTier === 'excellent' 
                  ? 'bg-emerald-100 text-emerald-800'
                  : carbonRes.ratingTier === 'moderate'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {carbonRes.ratingTier === 'excellent' 
                  ? (lang === 'gu' ? 'ઉત્તમ હરિત સ્તર' : lang === 'hi' ? 'शानदार ईको-फ्रेंडली' : 'Eco Champion')
                  : carbonRes.ratingTier === 'moderate'
                  ? (lang === 'gu' ? 'મધ્યમ સ્તર' : lang === 'hi' ? 'औसत स्तर' : 'Moderate')
                  : (lang === 'gu' ? 'ઉચ્ચ ઉત્સર્જન' : lang === 'hi' ? 'अधिक उत्सर्जन' : 'High Footprint')}
              </div>
            </div>

            {/* Tree Offset requirement */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs">
              <span className="text-emerald-900">
                {lang === 'gu' ? 'આ ઉત્સર્જન સરભર કરવા જરૂરી વૃક્ષો:' : lang === 'hi' ? 'यह कार्बन सोखने के लिए आवश्यक पेड़:' : 'Trees needed to absorb this footprint:'}
              </span>
              <span className="font-bold text-emerald-950 font-mono text-sm">
                🌲 {carbonRes.treesNeededToOffset} {lang === 'gu' ? 'વૃક્ષો' : lang === 'hi' ? 'पेड़' : 'trees'}
              </span>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="text-stone-500 font-medium">
                {lang === 'gu' ? 'ઉત્સર્જન વિભાજન:' : lang === 'hi' ? 'उत्सर्जन स्रोत विभाजन:' : 'Emission Breakdown:'}
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-stone-700">
                  <span>{lang === 'gu' ? 'વીજળી વપરાશ' : lang === 'hi' ? 'बिजली खपत' : 'Electricity'}</span>
                  <span className="font-mono">{carbonRes.categoryScores.electricity} kg</span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (carbonRes.categoryScores.electricity / carbonRes.totalCo2KgPerYear) * 100)}%` }}
                  />
                </div>

                <div className="flex justify-between text-stone-700 pt-1">
                  <span>{lang === 'gu' ? 'પરિવહન (મુસાફરી)' : lang === 'hi' ? 'वाहन यात्रा' : 'Transport'}</span>
                  <span className="font-mono">{carbonRes.categoryScores.transport} kg</span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (carbonRes.categoryScores.transport / carbonRes.totalCo2KgPerYear) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
