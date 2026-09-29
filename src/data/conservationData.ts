import { EcoHabit } from '../types';

export const dailyEcoHabits: EcoHabit[] = [
  {
    id: 'habit_standby',
    category: 'energy',
    points: 15,
    co2SavedKg: 0.35,
    title: {
      gu: 'સ્ટેન્ડબાય પાવર અને અનિવાર્ય સ્વીચ બંધ કરી',
      hi: 'स्टैंडबाय बिजली और गैर-जरूरी स्विच बंद किए',
      en: 'Turned off standby appliances & idle switches'
    },
    desc: {
      gu: 'ટીવી, સેટ-ટોપ બોક્સ અને ચાર્જરના પ્લગ સ્વિચ ઓફ કરવાથી ઘરનું 10% બિલ બચે છે.',
      hi: 'टीवी, चार्जर और सेटअप बॉक्स प्लग से बंद करने से 10% बिजली बचती है।',
      en: 'Vampire power draws up to 10% of idle household electricity.'
    }
  },
  {
    id: 'habit_bag',
    category: 'waste',
    points: 20,
    co2SavedKg: 0.2,
    title: {
      gu: 'કાપડની થેલી વાપરી / પ્લાસ્ટિકનો ત્યાગ કર્યો',
      hi: 'कपड़े का थैला इस्तेमाल किया / सिंगल-यूज़ प्लास्टिक नकारा',
      en: 'Used reusable cloth bag & declined plastic bags'
    },
    desc: {
      gu: 'એક પ્લાસ્ટિક બેગને વિઘટિત થતાં 500 વર્ષ લાગે છે; કાપડની થેલી શ્રેષ્ઠ વિકલ્પ છે.',
      hi: 'एक प्लास्टिक की थैली को गलने में 500 साल लगते हैं, कपड़े का थैला श्रेष्ठ है।',
      en: 'A single plastic bag takes 500+ years to degrade; reusable cloth bags save marine life.'
    }
  },
  {
    id: 'habit_tap',
    category: 'water',
    points: 25,
    co2SavedKg: 0.15,
    title: {
      gu: 'બ્રશ અને દાઢી કરતી વખતે નળ બંધ રાખ્યો',
      hi: 'ब्रश करते समय नल बंद रखा और पानी बचाया',
      en: 'Turned off running tap while brushing / washing'
    },
    desc: {
      gu: 'માત્ર આ નાની આદતથી એક વ્યક્તિ રોજના 15 થી 20 લિટર પીવાનું પાણી બચાવી શકે છે.',
      hi: 'इस छोटी आदत से रोज़ाना 15 से 20 लीटर साफ़ पानी बचता है।',
      en: 'Saves 15 to 20 liters of purified water every single morning.'
    }
  },
  {
    id: 'habit_light',
    category: 'energy',
    points: 20,
    co2SavedKg: 0.5,
    title: {
      gu: 'દિવસ દરમિયાન કુદરતી સૂર્યપ્રકાશનો ઉપયોગ કર્યો',
      hi: 'दिन में खिड़कियां खोलकर प्राकृतिक धूप का उपयोग किया',
      en: 'Used daylight & cross ventilation instead of artificial lights'
    },
    desc: {
      gu: 'કુદરતી ઉજાસ મનને તાજગી આપે છે અને વીજળીનો સીધો વપરાશ અટકાવે છે.',
      hi: 'प्राकृतिक रोशनी स्वास्थ्य के लिए अच्छी है और बिजली भी बचाती है।',
      en: 'Natural daylight boosts mood while eliminating daytime lighting power load.'
    }
  },
  {
    id: 'habit_compost',
    category: 'waste',
    points: 30,
    co2SavedKg: 0.8,
    title: {
      gu: 'રસોડાના ભીના કચરામાંથી ખાતર બનાવ્યું / અલગ કર્યો',
      hi: 'गीला कचरा अलग किया / कंपोस्टिंग में डाला',
      en: 'Segregated organic wet waste / composted kitchen scraps'
    },
    desc: {
      gu: 'શાકભાજીની છાલ અને ફળોના કચરામાંથી ઘરના કુંડા માટે સોનેરી ઓર્ગેનિક ખાતર બને છે.',
      hi: 'सब्जियों और फलों के छिलकों से पौधों के लिए अमृत समान जैविक खाद बनती है।',
      en: 'Prevents kitchen organic waste from generating methane at landfills.'
    }
  },
  {
    id: 'habit_cycle',
    category: 'nature',
    points: 35,
    co2SavedKg: 1.2,
    title: {
      gu: 'નજીકના કામે સાયકલ ચલાવી અથવા પગપાળા ગયા',
      hi: 'पास के कामों के लिए पैदल चले या साइकिल चलाई',
      en: 'Walked or cycled for short distance errand'
    },
    desc: {
      gu: '1-2 કિમીના અંતરે બાઇક-કાર ટાળવાથી પેટ્રોલ બચે છે અને તંદુરસ્તી સુધરે છે.',
      hi: 'कम दूरी के लिए पेट्रोल गाड़ी न चलाकर स्वास्थ्य और वातावरण दोनों सुधरे।',
      en: 'Cuts local vehicle emissions while providing cardio health benefits.'
    }
  },
  {
    id: 'habit_tree',
    category: 'nature',
    points: 40,
    co2SavedKg: 2.0,
    title: {
      gu: 'છોડ કે વૃક્ષને પાણી પાયું / નવો છોડ રોપ્યો',
      hi: 'पेड़-पौधों को सींचा या नया पौधा लगाया',
      en: 'Nurtured or watered plants / planted sapling'
    },
    desc: {
      gu: 'લીમડો, પીપળો, વડ અને તુલસી હવાને શુદ્ધ બનાવી પક્ષીઓને આશ્રય આપે છે.',
      hi: 'नीम, पीपल और तुलसी हवा को शुद्ध कर प्राकृतिक संतुलन बनाते हैं।',
      en: 'Indigenous trees provide shade, oxygen, and biodiversity shelter.'
    }
  }
];

export interface ConservationGuide {
  id: string;
  title: { gu: string; hi: string; en: string };
  summary: { gu: string; hi: string; en: string };
  actionSteps: { gu: string[]; hi: string[]; en: string[] };
  icon: string;
}

export const conservationGuides: ConservationGuide[] = [
  {
    id: 'rainwater',
    title: {
      gu: 'વરસાદી પાણી સંચય (Rainwater Harvesting)',
      hi: 'वर्षा जल संचयन (Rainwater Harvesting)',
      en: 'Rooftop Rainwater Harvesting'
    },
    summary: {
      gu: 'છત પર પડતા ચોખ્ખા વરસાદી પાણીને ફિલ્ટર કરી ભૂગર્ભ ટાંકામાં કે બોરવેલ રિચાર્જમાં વાળો.',
      hi: 'छत पर गिरने वाले बारिश के पानी को फ़िल्टर करके भूजल स्तर बढ़ाएं या टैंक में सहेजें।',
      en: 'Capture clean rooftop runoff to recharge groundwater aquifers or store in underground sumps.'
    },
    actionSteps: {
      gu: [
        'છત પર પીવીસી પાઇપ સાથે પ્રથમ વરસાદી પાણી બહાર વહી જવા માટે "ફર્સ્ટ-ફ્લશ" વાલ્વ મુકો.',
        'રેતી, કાંકરી અને કોલસાવાળા સરળ સેન્ડ-ગ્રેવલ ફિલ્ટરમાંથી પાણી પસાર કરો.',
        'સંગ્રહિત પાણી પીવા અને વાપરવા માટે આખું વર્ષ ઉપયોગી બને છે.',
        'બોરવેલ રિચાર્જથી તમારા વિસ્તારનું જળસ્તર 5 થી 10 ફૂટ ઊંચું આવી શકે છે.'
      ],
      hi: [
        'छत के पाइप में पहली बारिश की धूल बहाने के लिए "फर्स्ट-फ्लश" लगाएं।',
        'रेत और कंकड़ से बने साधारण फिल्टर से पानी साफ़ करें।',
        'भूमिगत टैंक में जमा पानी पूरे साल घरेलू उपयोग में आ सकता है।',
        'बोरवेल रिचार्ज से इलाके का वाटर टेबल हमेशा समृद्ध रहता है।'
      ],
      en: [
        'Install a first-flush diverter pipe to wash away initial roof dust.',
        'Route runoff through a dual gravel-and-sand bio-filter.',
        'Store in a sealed underground cistern for dry-season domestic use.',
        'Direct excess into groundwater injection wells to boost aquifer levels.'
      ]
    },
    icon: 'Droplets'
  },
  {
    id: 'waste_segregation',
    title: {
      gu: 'કચરાનું વર્ગીકરણ અને ઘરેલું ખાતર',
      hi: 'गीला-सूखा कचरा अलगाव एवं घरेलू खाद',
      en: 'Waste Segregation & Home Composting'
    },
    summary: {
      gu: 'લીલો ડબ્બો (ભીનો કચરો) અને ભૂરો ડબ્બો (સૂકો કચરો) રાખીને 60% કચરો ઘરમાં જ ખાતર બનાવી શકાય છે.',
      hi: 'हरा कूड़ेदान (गीला कचरा) और नीला (सूखा कचरा) अलग रखकर खाद बनाएं।',
      en: 'Separate wet organic waste from dry recyclables to convert 60% of domestic waste into rich organic compost.'
    },
    actionSteps: {
      gu: [
        'રસોડામાં બે ડબ્બા રાખો: લીલો (શાકભાજી, ફળોની છાલ, ચાની પત્તી) અને ભૂરો (કાગળ, પ્લાસ્ટિક, બોટલ).',
        'માટીના કુંડામાં ભીનો કચરો અને સૂકા પાંદડા એકાંતરે થર કરી 30 દિવસમાં કાળું સોનું (ખાતર) બનાવો.',
        'પ્લાસ્ટિક કચરો રિસાયક્લિંગ વાળાને આપો, ક્યારેય કચરો સળગાવો નહીં.'
      ],
      hi: [
        'रसोई में दो डिब्बे रखें: हरा (फल, सब्जी के छिलके) और नीला (प्लास्टिक, कागज)।',
        'एक मटके में गीला कचरा और सूखे पत्ते मिलाकर 30-45 दिनों में शानदार खाद बनाएं।',
        'प्लास्टिक को कभी न जलाएं, अलग करके कबाड़ी या रीसाइक्लिंग को दें।'
      ],
      en: [
        'Maintain a green bin for kitchen organics and blue bin for clean recyclables.',
        'Layer kitchen scraps with dried brown leaves in an aerated pot to yield rich black compost in 40 days.',
        'Never burn plastic or yard leaves; route dry plastics directly to formal recyclers.'
      ]
    },
    icon: 'Recycle'
  },
  {
    id: 'energy_efficiency',
    title: {
      gu: 'વીજળી બચત અને 5-સ્ટાર ઉપકરણો',
      hi: 'बिजली बचत और 5-स्टार उपकरण',
      en: 'Energy Star Efficiency & Smart Usage'
    },
    summary: {
      gu: 'BEE 5-Star રેટિંગ વાળા ઉપકરણો અને ઇન્વર્ટર ટેક્નોલોજી 30-40% ઓછી વીજળી વાપરે છે.',
      hi: '5-स्टार BEE उपकरण और सही तापमान सेटिंग से 30-40% बिजली बचाई जा सकती है।',
      en: 'BEE 5-Star rated appliances and smart thermostats cut household electricity consumption by 30-40%.'
    },
    actionSteps: {
      gu: [
        'એસીનું તાપમાન હંમેશા 24°C થી 26°C પર સેટ રાખો (દર 1 ડિગ્રી વધારતાં 6% વીજળી બચે છે).',
        'સામાન્ય ટ્યુબલાઇટ અને બલ્બ બદલીને 9-વોટના LED બલ્બ અપનાવો.',
        'BLDC ટેક્નોલોજી વાળા પંખા વાપરો જે સામાન્ય પંખા કરતાં માત્ર 28 થી 30 વોટ વીજળી ખર્ચે છે.'
      ],
      hi: [
        'एसी का तापमान 24°C से 26°C पर रखें (1 डिग्री बढ़ाने से 6% बिजली की बचत होती है)।',
        'घर के सभी पुराने बल्ब बदलकर ऊर्जा-कुशल LED बल्ब लगाएं।',
        'पुराने पंखों की जगह BLDC पंखे लगाएं जो मात्र 28-30 वॉट बिजली लेते हैं।'
      ],
      en: [
        'Set air conditioning to 24°C-26°C (each degree higher reduces power use by 6%).',
        'Replace halogen or fluorescent fixtures with high-efficiency 9W LEDs.',
        'Adopt energy-smart BLDC ceiling fans that consume only 28W compared to traditional 75W.'
      ]
    },
    icon: 'Lightbulb'
  }
];
