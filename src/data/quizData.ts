import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: {
      gu: 'ભારતનું પ્રથમ સંપૂર્ણપણે 24×7 સૌરઊર્જા સંચાલિત ગામ કયું છે?',
      hi: 'भारत का पहला 24×7 सौर ऊर्जा संचालित गांव कौन सा है?',
      en: "Which is India's first 24x7 solar-powered village?"
    },
    options: {
      gu: ['મોઢેરા (ગુજરાત)', 'ચારણકા (ગુજરાત)', 'પોખરણ (રાજસ્થાન)', 'રાલેગણ સિદ્ધિ (મહારાષ્ટ્ર)'],
      hi: ['मोढेरा (गुजरात)', 'चारणका (गुजरात)', 'पोखरण (राजस्थान)', 'रालेगण सिद्धि (महाराष्ट्र)'],
      en: ['Modhera (Gujarat)', 'Charanka (Gujarat)', 'Pokhran (Rajasthan)', 'Ralegan Siddhi (Maharashtra)']
    },
    correctIndex: 0,
    explanation: {
      gu: 'મોઢેરા (મહેસાણા, ગુજરાત) ભારતનું પ્રથમ 24×7 સોલાર સંચાલિત ગામ બન્યું છે, જ્યાં સૂર્યમંદિર સાથે તમામ રહેણાંક મકાનો પર સોલાર રૂફટોપ લગાવવામાં આવ્યા છે.',
      hi: 'मोढेरा (गुजरात) देश का पहला 24x7 सोलर गांव है जहां घरों और ऐतिहासिक सूर्य मंदिर दोनों को सौर ऊर्जा से रोशन किया गया है।',
      en: 'Modhera in Mehsana district of Gujarat is officially recognized as India’s first round-the-clock solar-powered village.'
    }
  },
  {
    id: 2,
    question: {
      gu: 'કેન્દ્ર સરકારની "PM સૂર્ય ઘર મુફ્ત બિજલી યોજના" હેઠળ 3 kW સોલાર સિસ્ટમ માટે કેટલી મહત્તમ સબસિડી મળે છે?',
      hi: 'पीएम सूर्य घर मुफ्त बिजली योजना के तहत 3 kW सिस्टम के लिए अधिकतम कितनी केंद्रीय सब्सिडी मिलती है?',
      en: 'Under the PM Surya Ghar Muft Bijli Yojana, what is the maximum central subsidy for a 3 kW rooftop solar system?'
    },
    options: {
      gu: ['₹30,000', '₹50,000', '₹78,000', '₹1,00,000'],
      hi: ['₹30,000', '₹50,000', '₹78,000', '₹1,00,000'],
      en: ['₹30,000', '₹50,000', '₹78,000', '₹1,00,000']
    },
    correctIndex: 2,
    explanation: {
      gu: 'આ યોજના હેઠળ 1 kW માટે ₹30,000, 2 kW માટે ₹60,000 અને 3 kW કે તેથી વધુ ક્ષમતા માટે સીધી ₹78,000 સબસિડી બેંક ખાતામાં જમા થાય છે.',
      hi: '1 kW के लिए ₹30,000, 2 kW के लिए ₹60,000 तथा 3 kW या अधिक क्षमता पर अधिकतम ₹78,000 की सब्सिडी दी जाती है।',
      en: 'The scheme provides ₹30,000 for 1 kW, ₹60,000 for 2 kW, and up to ₹78,000 for 3 kW systems directly into the citizen’s bank account.'
    }
  },
  {
    id: 3,
    question: {
      gu: 'વિશ્વનો સૌથી મોટો 30,000 મેગાવોટનો હાઇબ્રિડ રિન્યુએબલ એનર્જી પાર્ક ક્યાં સ્થાપવામાં આવી રહ્યો છે?',
      hi: 'दुनिया का सबसे बड़ा 30,000 मेगावाट का हाइब्रिड रिन्यूएबल पार्क कहां बन रहा है?',
      en: 'Where is the world’s largest 30 GW hybrid renewable energy park being built?'
    },
    options: {
      gu: ['ખાવડા, કચ્છ (ગુજરાત)', 'ભડલા (રાજસ્થાન)', 'પાવગડા (કર્ણાટક)', 'જેસલમેર (રાજસ્થાન)'],
      hi: ['खावड़ा, कच्छ (गुजरात)', 'भादला (राजस्थान)', 'पावागढ़ (कर्नाटक)', 'जैसलमेर (राजस्थान)'],
      en: ['Khavda, Kutch (Gujarat)', 'Bhadla (Rajasthan)', 'Pavagada (Karnataka)', 'Jaisalmer (Rajasthan)']
    },
    correctIndex: 0,
    explanation: {
      gu: 'કચ્છના ખાવડા ખાતે 726 ચોરસ કિલોમીટર વિસ્તારમાં 30 GW ક્ષમતાનો સોલાર અને વિન્ડ હાઇબ્રિડ પાર્ક બની રહ્યો છે.',
      hi: 'कच्छ के खावड़ा में 726 वर्ग किमी के विशाल क्षेत्र में यह सौर-पवन हाइब्रिड पार्क बनाया जा रहा है।',
      en: 'Khavda in Kutch district, Gujarat is hosting a massive 726 sq. km hybrid renewable park with a planned 30,000 MW capacity.'
    }
  },
  {
    id: 4,
    question: {
      gu: 'સામાન્ય રીતે એર કંડિશનર (AC) નું આદર્શ અને વીજળી-બચત તાપમાન કેટલું રાખવું જોઈએ?',
      hi: 'बिजली की अधिकतम बचत के लिए एयर कंडीशनर (AC) का आदर्श तापमान क्या रखना चाहिए?',
      en: 'What is the most energy-efficient thermostat setting recommended for home air conditioners?'
    },
    options: {
      gu: ['18°C થી 20°C', '24°C થી 26°C', '16°C', '28°C થી 30°C'],
      hi: ['18°C से 20°C', '24°C से 26°C', '16°C', '28°C से 30°C'],
      en: ['18°C to 20°C', '24°C to 26°C', '16°C', '28°C to 30°C']
    },
    correctIndex: 1,
    explanation: {
      gu: 'બ્યુરો ઓફ એનર્જી એફિશિયન્સી (BEE) મુજબ 24°C તાપમાન માનવ શરીર માટે આરામદાયક છે અને દર 1°C વધારતાં 6% વીજળીની બચત થાય છે.',
      hi: 'BEE के अनुसार 24°C शरीर के लिए अत्यंत अनुकूल है और 18°C की तुलना में लगभग 25-30% कम बिजली खाता है।',
      en: 'The Bureau of Energy Efficiency (BEE) recommends 24°C as ideal for human comfort; each degree higher saves ~6% electricity.'
    }
  },
  {
    id: 5,
    question: {
      gu: 'ઘરેલું કચરાના વર્ગીકરણમાં "લીલા રંગનો ડબ્બો" (Green Dustbin) શાના માટે વપરાય છે?',
      hi: 'घरेलू कचरा प्रबंधन में "हरे रंग का कूड़ेदान" किस प्रकार के कचरे के लिए होता है?',
      en: 'In household waste segregation, what is the green dustbin specifically intended for?'
    },
    options: {
      gu: ['સૂકો કચરો (પ્લાસ્ટિક, કાગળ)', 'ભીનો જૈવિક કચરો (શાકભાજી, ફળોની છાલ)', 'ઇલેક્ટ્રોનિક કચરો', 'કાચ અને ધાતુ'],
      hi: ['सूखा कचरा (प्लास्टिक, कागज)', 'गीला जैविक कचरा (सब्जी, फलों के छिलके)', 'ई-कचरा', 'कांच और धातु'],
      en: ['Dry waste (plastic, paper)', 'Wet organic waste (kitchen peelings, food scraps)', 'Electronic waste', 'Glass and metals']
    },
    correctIndex: 1,
    explanation: {
      gu: 'લીલા ડબ્બામાં રસોડાનો ભીનો અને વિઘટનશીલ કચરો નાખવામાં આવે છે જેથી તેનું ઉત્તમ ખાતર (Compost) બનાવી શકાય.',
      hi: 'हरा कूड़ेदान गीले एवं सड़ने योग्य जैविक कचरे के लिए है जिसे खाद बनाने के काम में लिया जाता है।',
      en: 'Green bins collect bio-degradable wet waste such as fruit and vegetable peels that can be converted into organic compost.'
    }
  },
  {
    id: 6,
    question: {
      gu: 'દર વર્ષે "વિશ્વ પર્યાવરણ દિવસ" (World Environment Day) કઈ તારીખે ઉજવવામાં આવે છે?',
      hi: 'प्रतिवर्ष "विश्व पर्यावरण दिवस" किस तारीख को मनाया जाता है?',
      en: 'On which date is World Environment Day celebrated every year globally?'
    },
    options: {
      gu: ['22 એપ્રિલ', '5 જૂન', '16 સપ્ટેમ્બર', '1 ડિસેમ્બર'],
      hi: ['22 अप्रैल', '5 जून', '16 सितंबर', '1 दिसंबर'],
      en: ['22 April', '5 June', '16 September', '1 December']
    },
    correctIndex: 1,
    explanation: {
      gu: 'સંયુક્ત રાષ્ટ્ર (UN) દ્વારા દર વર્ષે 5મી જૂને સમગ્ર વિશ્વમાં પર્યાવરણ સંરક્ષણ માટે જાગૃતિ અભિયાન યોજાય છે.',
      hi: '5 जून को संयुक्त राष्ट्र द्वारा विश्व पर्यावरण दिवस मनाया जाता है ताकि प्रकृति के संरक्षण का संकल्प लिया जा सके।',
      en: 'World Environment Day is observed globally on June 5th to encourage worldwide protection and awareness for nature.'
    }
  }
];
