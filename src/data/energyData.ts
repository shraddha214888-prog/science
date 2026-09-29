import { EnergyPillar } from '../types';

export const energyPillars: EnergyPillar[] = [
  {
    id: 'solar',
    name: {
      gu: 'સૌર ઊર્જા (Solar Power)',
      hi: 'सौर ऊर्जा (Solar Energy)',
      en: 'Solar Energy (PV & Thermal)'
    },
    tagline: {
      gu: 'સૂર્યપ્રકાશનું શુદ્ધ વીજળીમાં સીધું રૂપાંતરણ',
      hi: 'सूर्य की किरणों का सीधे बिजली में रूपांतरण',
      en: 'Direct conversion of sunlight into clean electricity'
    },
    iconName: 'Sun',
    description: {
      gu: 'ફોટોવોલ્ટેઇક (PV) સેલ દ્વારા સૂર્યના ફોટોન્સને વીજળીમાં રૂપાંતરિત કરવામાં આવે છે. ભારતમાં વર્ષમાં 300થી વધુ દિવસો તેજસ્વી તડકો રહે છે, જે ભારતને સોલાર સુપરપાવર બનવાની શ્રેષ્ઠ તક આપે છે.',
      hi: 'फोटोवोल्टाइक (PV) सेल सूर्य की किरणों को बिना किसी धुएं या प्रदूषण के सीधे बिजली में बदलते हैं। भारत में साल में 300 से अधिक दिन धूप उपलब्ध रहती है।',
      en: 'Photovoltaic cells convert sunlight directly into clean electricity with zero emissions. India receives over 300 sunny days annually, providing vast solar potential.'
    },
    benefits: {
      gu: [
        'વીજળી બિલમાં 80% થી 100% સુધીનો ધરખમ ઘટાડો',
        'PM સૂર્ય ઘર યોજના હેઠળ ₹78,000 સુધીની સરકારી સબસિડી',
        '25 વર્ષ સુધી પેનલ્સનું વિશ્વસનીય અને દીર્ઘકાલીન આયુષ્ય',
        'દર 1 kW સોલારથી વાર્ષિક 1.5 ટન કાર્બન ઉત્સર્જન ઘટે છે'
      ],
      hi: [
        'बिजली बिल में 80% से 100% तक की भारी बचत',
        'पीएम सूर्य घर योजना में ₹78,000 तक की केंद्रीय सब्सिडी',
        '25 वर्षों तक सोलर पैनल्स का टिकाऊ एवं भरोसेमंद जीवनकाल',
        'प्रति 1 kW सोलर से सालाना 1.5 टन कार्बन कटौती'
      ],
      en: [
        'Reduces electricity bills by up to 80% to 100%',
        'Up to ₹78,000 central subsidy under PM Surya Ghar Yojana',
        '25+ years long-term reliable panel lifespan',
        'Each 1 kW solar eliminates ~1.5 metric tons of CO2 annually'
      ]
    },
    stats: {
      capacityIndia: '85+ GW',
      target2030: '280 GW',
      carbonOffsetPerUnit: '0.82 kg CO2 / kWh'
    },
    gujaratHighlight: {
      gu: 'ગુજરાતના પાટણ ખાતે ચારણકા સોલાર પાર્ક (700+ MW) અને મોઢેરા (ભારતનું પ્રથમ સોલાર વિલેજ) ગ્લોબલ રોલ મોડલ છે.',
      hi: 'गुजरात का चारणका सोलर पार्क (700+ MW) और मोढेरा (भारत का पहला 24x7 सौर गांव) विश्व प्रसिद्ध उदाहरण हैं।',
      en: "Gujarat's Charanka Solar Park (700+ MW) and Modhera 24x7 solar village stand as international benchmarks."
    }
  },
  {
    id: 'wind',
    name: {
      gu: 'પવન ઊર્જા (Wind Energy)',
      hi: 'पवन ऊर्जा (Wind Power)',
      en: 'Wind Energy (Onshore & Offshore)'
    },
    tagline: {
      gu: 'કુદરતી પવનની ગતિજ ઊર્જામાંથી સ્વચ્છ શક્તિ',
      hi: 'हवा के झोंकों से स्वच्छ और अबाध बिजली निर्माण',
      en: 'Kinetic energy of winds converted into electricity'
    },
    iconName: 'Wind',
    description: {
      gu: 'પવનચક્કીના વિશાળ પાંખિયા પવનની ગતિથી ફરીને જનરેટર દ્વારા વીજળી ઉત્પન્ન કરે છે. ગુજરાત અને તમિલનાડુના દરિયાકાંઠા પવન ઊર્જા માટે વિશ્વભરમાં અગ્રણી છે.',
      hi: 'विशाल पवन चक्कियां हवा के वेग से घूमकर जनरेटर के जरिए बिजली पैदा करती हैं। गुजरात और तमिलनाडु के तट पवन ऊर्जा के मामले में सबसे आगे हैं।',
      en: 'Aerodynamic turbine blades rotate an electrical generator using wind kinetic energy. Coastal corridors in Gujarat and Tamil Nadu lead national output.'
    },
    benefits: {
      gu: [
        'દિવસ-રાત ચોવીસે કલાક ઊર્જા ઉત્પાદન ક્ષમતા',
        'જમીન પર ખેતી સાથે સુસંગત (ડ્યુઅલ યુઝ લેન્ડ)',
        'પાણીનો બિલકુલ વપરાશ થતો નથી',
        'હાઇબ્રિડ સોલાર-વિન્ડ પાર્કથી ગ્રીડ સ્થિરતા વધે છે'
      ],
      hi: [
        'दिन-रात चौबीसों घंटे बिजली बनाने की क्षमता',
        'पवनचक्की के नीचे खेती भी जारी रखी जा सकती है',
        'बिजली निर्माण में पानी की शून्य बर्बादी',
        'सौर और पवन हाइब्रिड मॉडल से अधिकतम दक्षता'
      ],
      en: [
        'Generates electricity day and night when wind blows',
        'Dual land use allows farming beneath turbines',
        'Zero water required during power generation cycle',
        'Solar-wind hybrid installations ensure smooth grid output'
      ]
    },
    stats: {
      capacityIndia: '46+ GW',
      target2030: '140 GW',
      carbonOffsetPerUnit: '0.85 kg CO2 / kWh'
    },
    gujaratHighlight: {
      gu: 'ગુજરાત ભારતમાં પવન ઊર્જા સ્થાપિત ક્ષમતામાં ટોચ પર છે, જેમાં કચ્છ અને સૌરાષ્ટ્રના વિસ્તારોમાં હજારો વિન્ડ ટર્બાઇન ધબકે છે.',
      hi: 'गुजरात पवन ऊर्जा क्षमता में देश में शीर्ष स्थान पर है, जहां कच्छ और सौराष्ट्र तटीय क्षेत्रों में अपार पवन संपदा है।',
      en: 'Gujarat leads India with the highest wind energy capacity, concentrated along the windy Kutch and Saurashtra coastlines.'
    }
  },
  {
    id: 'biomass',
    name: {
      gu: 'બાયોમાસ અને ગોબર ગેસ (Bio-Energy)',
      hi: 'बायोमास एवं गोबर गैस (Bio-Power)',
      en: 'Bio-Energy & Bio-CNG'
    },
    tagline: {
      gu: 'કૃષિ કચરો અને ગોબરમાંથી સોનેરી ઈંધણ અને જૈવિક ખાતર',
      hi: 'कृषि अवशेष और गोबर से स्वच्छ ईंधन एवं जैविक खाद',
      en: 'Agricultural residue and dung transformed into fuel & fertilizer'
    },
    iconName: 'Flame',
    description: {
      gu: 'ગાય-ભેંસના છાણ અને ખેતરના કચરાને એનારોબિક ડાયજેસ્ટરમાં સડાવીને મિથેન ગેસ અને ઉત્તમ જૈવિક સ્લરી (ખાતર) ઉત્પન્ન થાય છે. આ કચરા-મુક્ત અર્થતંત્રનું ઉત્તમ ઉદાહરણ છે.',
      hi: 'गोबर और फसल अवशेषों को डाइजेस्टर में बिना ऑक्सीजन के सड़ाकर बायोगैस (मीथेन) और बेहतरीन प्राकृतिक खाद बनाई जाती है।',
      en: 'Anaerobic digestion of organic residues yields methane-rich biogas for clean cooking or power, leaving rich organic bio-fertilizer slurry.'
    },
    benefits: {
      gu: [
        'ગામડાઓમાં મફત રસોઈ ગેસ અને ઈંધણ',
        'રાસાયણિક ખાતરો સામે કુદરતી ઓર્ગેનિક ખાતરની પ્રાપ્તિ',
        'પરાળી બાળવાની સમસ્યામાંથી સંપૂર્ણ મુક્તિ',
        'ગામડાઓની અર્થવ્યવસ્થાને સીધો આર્થિક વેગ'
      ],
      hi: [
        'ग्रामीण परिवारों को धुआं-मुक्त स्वच्छ रसोई गैस',
        'खेतों के लिए बिना रासायनिक तत्वों वाली उच्च गुणवत्ता की खाद',
        'पराली जलाने की समस्या का टिकाऊ समाधान',
        'ग्रामीण किसानों की आय में अतिरिक्त वृद्धि'
      ],
      en: [
        'Free, smokeless domestic cooking gas in rural households',
        'High quality chemical-free organic bio-fertilizer',
        'Prevents farm stubble burning and local air pollution',
        'Creates decentralized rural green economy & jobs'
      ]
    },
    stats: {
      capacityIndia: '10.8 GW',
      target2030: '25 GW',
      carbonOffsetPerUnit: '0.75 kg CO2 / kg'
    },
    gujaratHighlight: {
      gu: 'ગુજરાતના બનાસકાંઠામાં બનાસ ડેરી ખાતે ભારતનો સૌથી મોટો સીએનજી બાયોગેસ પ્લાન્ટ કાર્યરત છે.',
      hi: 'बनासकांठा में बनास डेयरी का बायो-सीएनजी प्लांट देश के सबसे सफल ग्रामीण मॉडल में से एक है।',
      en: "Banas Dairy in Banaskantha (Gujarat) operates one of India's largest and most successful Bio-CNG and organic manure hubs."
    }
  },
  {
    id: 'hydro',
    name: {
      gu: 'જળ ઊર્જા (Hydro Power)',
      hi: 'जल विद्युत (Hydro Power)',
      en: 'Hydroelectric & Small Hydro'
    },
    tagline: {
      gu: 'વહેતા જળના પ્રવાહમાંથી ઉત્પન્ન થતી અખૂટ શક્તિ',
      hi: 'बहते जल की प्राकृतिक शक्ति से स्वच्छ बिजली',
      en: 'Clean electrical energy from the natural flow of water'
    },
    iconName: 'Droplets',
    description: {
      gu: 'ડેમ અથવા નદીના પાણીના ધોધથી ટર્બાઇન ફેરવીને વીજળી બનાવવામાં આવે છે. પમ્પ્ડ સ્ટોરેજ હાઇડ્રો પ્રોજેક્ટ્સ રાત્રે વધારાની સૌર ઊર્જા સંગ્રહવા માટે "વોટર બેટરી" તરીકે કામ કરે છે.',
      hi: 'बांधों और तेज धार वाली नदियों के पानी से टरबाइन घुमाकर बिजली बनाई जाती है। पंप्ड स्टोरेज प्रोजेक्ट्स ग्रिड स्थिरता के लिए वाटर बैटरी का काम करते हैं।',
      en: 'Falling or flowing water spins hydro turbines. Modern pumped-storage projects serve as giant water batteries to balance the green power grid.'
    },
    benefits: {
      gu: [
        'સૌથી ઝડપી રિસ્પોન્સ સાથે પિક-ડિમાન્ડ બેલેન્સિંગ',
        'સિંચાઈ અને પીવાના પાણીની સુવિધા સાથે ઊર્જા ઉત્પાદન',
        'ઝીરો ગ્રીનહાઉસ ગેસ ઉત્સર્જન',
        '100થી વધુ વર્ષો સુધી ટકાઉ માળખું'
      ],
      hi: [
        'ग्रिड में अचानक मांग बढ़ने पर तुरंत बिजली आपूर्ति',
        'बिजली के साथ-साथ सिंचाई और पेयजल का दोहरा लाभ',
        'शून्य वायु प्रदूषण',
        '100 से अधिक वर्षों तक सेवा देने वाला बुनियादी ढांचा'
      ],
      en: [
        'Ultra-fast ramp-up for peak grid demand balancing',
        'Dual benefit of irrigation, drinking water & power',
        'Zero direct emissions during operation',
        'Longest infrastructure lifespan (often 80 to 100+ years)'
      ]
    },
    stats: {
      capacityIndia: '47+ GW',
      target2030: '70 GW',
      carbonOffsetPerUnit: '0.90 kg CO2 / kWh'
    },
    gujaratHighlight: {
      gu: 'નર્મદા નદી પર સ્થિત સરદાર સરોવર પ્રોજેક્ટ (1,450 MW) ગુજરાત, મધ્યપ્રદેશ અને મહારાષ્ટ્રને સ્વચ્છ જળવિદ્યુત પૂરી પાડે છે.',
      hi: 'नर्मदा नदी पर स्थित सरदार सरोवर बांध (1,450 MW) गुजरात समेत तीन राज्यों को स्वच्छ पनबिजली देता है।',
      en: 'The Sardar Sarovar Project on Narmada River (1,450 MW) generates reliable green hydro power for Gujarat and neighboring states.'
    }
  },
  {
    id: 'hydrogen_ev',
    name: {
      gu: 'ગ્રીન હાઇડ્રોજન અને ઈવી (EV & Green H₂)',
      hi: 'ग्रीन हाइड्रोजन एवं ईवी (Clean Mobility)',
      en: 'Green Hydrogen & Electric Mobility'
    },
    tagline: {
      gu: 'ભવિષ્યનું પ્રદૂષણ-મુક્ત પરિવહન અને ઔદ્યોગિક ઈંધણ',
      hi: 'भविष्य का धुआं-रहित परिवहन और औद्योगिक ईंधन',
      en: 'Zero-emission transport and clean industrial decarbonization'
    },
    iconName: 'Zap',
    description: {
      gu: 'સૌર કે પવન ઊર્જાની વીજળીથી પાણીનું ઇલેક્ટ્રોલિસિસ કરીને ગ્રીન હાઇડ્રોજન બને છે, જે સ્ટીલ, ખાતર અને હેવી વાહનોમાં વપરાય છે. સાથે જ ઇલેક્ટ્રિક વાહનો (EV) શહેરના ધુમાડાને નાબૂદ કરે છે.',
      hi: 'अक्षय ऊर्जा से पानी को तोड़कर ग्रीन हाइड्रोजन बनती है जिससे सिर्फ पानी की भाप निकलती है। साथ ही इलेक्ट्रिक गाड़ियां शहरों को वायु प्रदूषण मुक्त बनाती हैं।',
      en: 'Produced by splitting water via renewable electrolysis, Green Hydrogen emits only pure water vapor. Combined with EVs, it eliminates transport pollution.'
    },
    benefits: {
      gu: [
        'પેટ્રોલ-ડીઝલના ખર્ચમાં 70% સુધી ઘટાડો',
        'શહેરોમાં અવાજ અને ધુમાડાનું પ્રદૂષણ શૂન્ય',
        'રાષ્ટ્રીય ગ્રીન હાઇડ્રોજન મિશન હેઠળ ₹19,744 કરોડનું પ્રોત્સાહન',
        'દેશની ક્રૂડ ઓઇલ આયાત નિર્ભરતામાં મોટો ઘટાડો'
      ],
      hi: [
        'पेट्रोल-डीजल के भारी खर्च से 70% तक मुक्ति',
        'शहरों में ज़ीरो टेलपाइप धुआं और शांत सफर',
        'राष्ट्रीय ग्रीन हाइड्रोजन मिशन द्वारा भारी प्रोत्साहन',
        'कच्चे तेल के आयात पर देश की निर्भरता में कमी'
      ],
      en: [
        'Up to 70% operational cost savings compared to petrol/diesel',
        'Zero tailpipe emissions and whisper-quiet urban transport',
        'Backed by ₹19,744 crore National Green Hydrogen Mission',
        'Drastically reduces national oil import reliance'
      ]
    },
    stats: {
      capacityIndia: 'National Mission',
      target2030: '5 MMT H2 & 30% EVs',
      carbonOffsetPerUnit: '100% emission-free'
    },
    gujaratHighlight: {
      gu: 'ગુજરાતના દહેજ અને કંડલા પોર્ટ ગ્રીન હાઇડ્રોજન અને ગ્રીન એમોનિયાના નિકાસ માટે આંતરરાષ્ટ્રીય કેન્દ્રો બની રહ્યા છે.',
      hi: 'गुजरात के दहेज और कांडला पोर्ट ग्रीन हाइड्रोजन एवं अमोनिया के विश्वस्तरीय केंद्र बन रहे हैं।',
      en: 'Gujarat ports at Dahej and Kandla are being developed as global export hubs for Green Hydrogen and Green Ammonia.'
    }
  }
];
