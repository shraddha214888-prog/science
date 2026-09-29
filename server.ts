import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const fallbackAnswers: Record<string, { gu: string; hi: string; en: string }> = {
  solar: {
    gu: 'સૂર્યઘર યોજના (PM Surya Ghar Muft Bijli Yojana) હેઠળ 1 kW માટે ₹30,000, 2 kW માટે ₹60,000 અને 3 kW કે તેથી વધુ ક્ષમતા માટે ₹78,000 સુધીની કેન્દ્રીય સબસિડી ઉપલબ્ધ છે. સોલાર પેનલ્સથી દર મહિને 300 યુનિટ સુધી મફત વીજળી મેળવી શકાય છે અને દર વર્ષે સરેરાશ 1.5 ટન કાર્બન ઉત્સર્જન ઘટે છે!',
    hi: 'पीएम सूर्य घर मुफ्त बिजली योजना के तहत 1 kW के लिए ₹30,000, 2 kW के लिए ₹60,000 और 3 kW या उससे अधिक के लिए ₹78,000 तक की केंद्रीय सब्सिडी मिलती है। रूफटॉप सोलर से 300 यूनिट तक मुफ्त बिजली और सालाना लगभग 1.5 टन कार्बन कटौती होती है!',
    en: 'Under the PM Surya Ghar Muft Bijli Yojana, central subsidies are up to ₹30,000 for 1 kW, ₹60,000 for 2 kW, and up to ₹78,000 for 3 kW or higher systems. Rooftop solar provides up to 300 units of free power each month!'
  },
  water: {
    gu: 'વરસાદી પાણી સંચય (Rainwater Harvesting) વડે 100 ચોરસ મીટરની છત પરથી વાર્ષિક 50,000 લિટરથી વધુ શુદ્ધ પાણી સંગ્રહ કરી શકાય છે. બોરવેલ કે ભૂગર્ભ ટાંકામાં પાણી ઉતારવાથી ભૂગર્ભ જળસ્તર (groundwater table) ઊંચું આવે છે!',
    hi: 'वर्षा जल संचयन (Rainwater Harvesting) से 100 वर्ग मीटर की छत से सालाना 50,000 लीटर से अधिक पानी बचाया जा सकता है। इसे बोरवेल रिचार्ज या भूमिगत टैंक में जमा करके भूजल स्तर बढ़ाया जा सकता है!',
    en: 'Rainwater harvesting on a 100 sq meter roof can capture over 50,000 liters of pure water annually, significantly recharging the underground water table and preventing summer shortages!'
  },
  default: {
    gu: 'હરિત ઊર્જા અને પર્યાવરણ સંરક્ષણ આપણી સામૂહિક જવાબદારી છે! દરરોજ એલઇડી બલ્બ વાપરીને, નકામી લાઇટ-પંખા બંધ રાખીને, પ્લાસ્ટિકનો ત્યાગ કરીને અને વૃક્ષ વાવીને આપણે પર્યાવરણનું રક્ષણ કરી શકીએ છીએ.',
    hi: 'हरित ऊर्जा और पर्यावरण संरक्षण हमारी साझा ज़िम्मेदारी है! प्रतिदिन एलईडी बल्ब इस्तेमाल करके, फिजूल बिजली बचाकर, सिंगल-यूज प्लास्टिक त्यागकर और पौधे लगाकर हम धरती को बचा सकते हैं।',
    en: 'Green energy and environmental conservation are vital for our sustainable future. Using 5-star appliances, LED bulbs, avoiding single-use plastics, and planting indigenous trees creates a direct positive impact!'
  }
};

function getFallback(query: string, lang: 'gu' | 'hi' | 'en'): string {
  const q = query.toLowerCase();
  if (q.includes('solar') || q.includes('સૌર') || q.includes('સૂર્ય') || q.includes('सौर') || q.includes('subsidy') || q.includes('સબસિડી')) {
    return fallbackAnswers.solar[lang] || fallbackAnswers.solar.gu;
  }
  if (q.includes('water') || q.includes('પાણી') || q.includes('जल') || q.includes('harvesting') || q.includes('સંચય')) {
    return fallbackAnswers.water[lang] || fallbackAnswers.water.gu;
  }
  return fallbackAnswers.default[lang] || fallbackAnswers.default.gu;
}

app.post('/api/harit-mitra', async (req, res) => {
  const { question, language = 'gu' } = req.body;
  const langKey = (language === 'hi' || language === 'en') ? language : 'gu';

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.json({ reply: getFallback(question || '', langKey) });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `You are "હરિત મિત્ર (Harit Mitra)" - a passionate, practical and encouraging green energy and environmental conservation guide for India and Gujarat.
Respond in language: ${langKey === 'gu' ? 'Gujarati (ગુજરાતી)' : langKey === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.
Keep replies educational, positive, crisp (under 180 words), with actionable conservation steps, subsidy details (e.g. PM Surya Ghar, GEDA, solar pumps, composting), and positive encouragement. Do not use code blocks or robotic technical jargon.`
      }
    });

    const replyText = response.text || getFallback(question || '', langKey);
    res.json({ reply: replyText });
  } catch (error) {
    console.warn('Gemini request failed, falling back:', error);
    res.json({ reply: getFallback(question || '', langKey) });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
