import React, { useState, useEffect, useRef } from 'react';
import { Language, EnergyPillar } from '../types';
import { translations } from '../data/translations';
import { energyPillars } from '../data/energyData';
import { 
  Sun, 
  Wind, 
  Flame, 
  Droplets, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Activity, 
  Sliders, 
  MapPin, 
  TreePine 
} from 'lucide-react';

interface EnergyLabViewProps {
  lang: Language;
}

export const EnergyLabView: React.FC<EnergyLabViewProps> = ({ lang }) => {
  // Simulator inputs
  const [sunlight, setSunlight] = useState<number>(75); // 0% to 100%
  const [windSpeed, setWindSpeed] = useState<number>(12); // 0 to 25 m/s
  const [selectedPillarId, setSelectedPillarId] = useState<string>('solar');

  // Interactive Canvas Reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculations based on live sliders
  // 3kW solar plant at 100% sun gives ~3.0 kW; 2kW micro wind turbine gives power proportional to v^3
  const solarKw = (sunlight / 100) * 3.2;
  const windCutIn = 3; // m/s
  const windKw = windSpeed > windCutIn 
    ? Math.min(2.5, Math.pow((windSpeed - windCutIn) / (20 - windCutIn), 2.2) * 2.5) 
    : 0;
  const totalKw = solarKw + windKw;
  const dailyKwh = (solarKw * 5.2) + (windKw * 10);
  const monthlySavingsInr = Math.round(dailyKwh * 30 * 7.5);
  const dailyCo2SavedKg = dailyKwh * 0.82;
  const treesEquiv = Math.round((dailyCo2SavedKg * 365) / 21);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let pulseOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear with soft sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      // Brighter or darker sky based on sunlight
      const sunRatio = sunlight / 100;
      skyGradient.addColorStop(0, `rgb(${Math.round(180 + 40 * sunRatio)}, ${Math.round(210 + 35 * sunRatio)}, ${Math.round(245 + 10 * sunRatio)})`);
      skyGradient.addColorStop(0.65, `rgb(${Math.round(210 + 35 * sunRatio)}, ${Math.round(230 + 20 * sunRatio)}, ${Math.round(245 + 10 * sunRatio)})`);
      skyGradient.addColorStop(1, '#a7f3d0'); // Emerald horizon
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Sun
      const sunX = width * 0.22;
      const sunY = height * 0.24;
      const sunRadius = 24 + (sunlight / 100) * 12;

      // Sun glow
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, sunRadius * 2);
      sunGlow.addColorStop(0, `rgba(255, 230, 100, ${0.4 + (sunlight / 100) * 0.5})`);
      sunGlow.addColorStop(1, 'rgba(255, 200, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Sun body
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sun rays
      if (sunlight > 15) {
        ctx.strokeStyle = `rgba(245, 158, 11, ${sunlight / 200})`;
        ctx.lineWidth = 2;
        const numRays = 8;
        for (let i = 0; i < numRays; i++) {
          const rayAngle = (i * Math.PI * 2) / numRays + pulseOffset * 0.05;
          const r1 = sunRadius + 6;
          const r2 = sunRadius + 14 + (sunlight / 100) * 10;
          ctx.beginPath();
          ctx.moveTo(sunX + Math.cos(rayAngle) * r1, sunY + Math.sin(rayAngle) * r1);
          ctx.lineTo(sunX + Math.cos(rayAngle) * r2, sunY + Math.sin(rayAngle) * r2);
          ctx.stroke();
        }
      }

      // Draw rolling green hills in background
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.quadraticCurveTo(width * 0.3, height * 0.65, width * 0.6, height * 0.75);
      ctx.quadraticCurveTo(width * 0.85, height * 0.82, width, height * 0.72);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.quadraticCurveTo(width * 0.25, height * 0.8, width * 0.55, height * 0.72);
      ctx.quadraticCurveTo(width * 0.8, height * 0.65, width, height * 0.8);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Wind Turbines (2 turbines)
      const drawTurbine = (x: number, y: number, mastHeight: number, bladeLength: number, turbAngle: number) => {
        // Mast
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(x - 3, y);
        ctx.lineTo(x - 1.5, y - mastHeight);
        ctx.lineTo(x + 1.5, y - mastHeight);
        ctx.lineTo(x + 3, y);
        ctx.closePath();
        ctx.fill();

        // Hub
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(x, y - mastHeight, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // 3 Aerodynamic blades
        for (let b = 0; b < 3; b++) {
          const bAngle = turbAngle + (b * (Math.PI * 2)) / 3;
          ctx.save();
          ctx.translate(x, y - mastHeight);
          ctx.rotate(bAngle);
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(-1.5, 0);
          ctx.lineTo(-3, -bladeLength * 0.6);
          ctx.lineTo(0, -bladeLength);
          ctx.lineTo(2, -bladeLength * 0.5);
          ctx.lineTo(1.5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      };

      // Turbines rotation speed proportional to windSpeed
      angle += (windSpeed * 0.015);
      drawTurbine(width * 0.72, height * 0.76, 70, 36, angle);
      drawTurbine(width * 0.88, height * 0.79, 58, 28, angle + 1.2);

      // Rooftop Solar PV panels on Eco-House
      const houseX = width * 0.28;
      const houseY = height * 0.84;
      const houseW = 76;
      const houseH = 42;

      // House walls
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(houseX - houseW / 2, houseY - houseH, houseW, houseH);

      // Roof (slanted)
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(houseX - houseW / 2 - 8, houseY - houseH);
      ctx.lineTo(houseX, houseY - houseH - 24);
      ctx.lineTo(houseX + houseW / 2 + 8, houseY - houseH);
      ctx.closePath();
      ctx.fill();

      // Solar PV Panels on roof
      ctx.fillStyle = '#1e3a8a';
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1;
      const pvX = houseX - houseW / 2 + 4;
      const pvY = houseY - houseH - 18;
      const pvW = houseW - 8;
      const pvH = 16;
      ctx.beginPath();
      ctx.rect(pvX, pvY, pvW, pvH);
      ctx.fill();
      ctx.stroke();

      // PV grid lines
      ctx.strokeStyle = '#93c5fd';
      ctx.beginPath();
      for (let p = 1; p < 4; p++) {
        ctx.moveTo(pvX + (pvW / 4) * p, pvY);
        ctx.lineTo(pvX + (pvW / 4) * p, pvY + pvH);
      }
      ctx.moveTo(pvX, pvY + pvH / 2);
      ctx.lineTo(pvX + pvW, pvY + pvH / 2);
      ctx.stroke();

      // House door & window
      ctx.fillStyle = '#065f46';
      ctx.fillRect(houseX - 8, houseY - 22, 16, 22);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(houseX + 16, houseY - 32, 14, 14);

      // Smart Battery & Power Flow Line
      pulseOffset = (pulseOffset + 1) % 40;
      if (totalKw > 0.4) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 5]);
        ctx.lineDashOffset = -pulseOffset;
        ctx.beginPath();
        // Solar to battery
        ctx.moveTo(houseX, houseY);
        ctx.lineTo(houseX, height * 0.92);
        ctx.lineTo(width * 0.52, height * 0.92);
        // Turbine to battery
        ctx.moveTo(width * 0.72, height * 0.76);
        ctx.lineTo(width * 0.72, height * 0.92);
        ctx.lineTo(width * 0.52, height * 0.92);
        ctx.stroke();
        ctx.setLineDash([]); // Reset
      }

      // Smart Micro-grid Battery Hub Icon
      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.roundRect(width * 0.46, height * 0.86, 38, 24, 4);
      ctx.fill();
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('⚡ GRID', width * 0.48, height * 0.94);

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [sunlight, windSpeed, totalKw]);

  const activePillar = energyPillars.find(p => p.id === selectedPillarId) || energyPillars[0];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Title block */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          {translations.energy.title[lang]}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600">
          {translations.energy.subtitle[lang]}
        </p>
      </div>

      {/* Physics Simulator Card */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">
                {translations.energy.simulatorTitle[lang]}
              </div>
              <div className="text-[11px] text-stone-500">
                {translations.energy.simulatorDesc[lang]}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
            LIVE CANVAS
          </span>
        </div>

        {/* High-DPI Interactive Canvas */}
        <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 aspect-16/9 sm:aspect-21/9 w-full shadow-inner">
          <canvas
            ref={canvasRef}
            width={480}
            height={260}
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Sunlight Slider */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                {translations.energy.sunlightIntensity[lang]}
              </span>
              <span className="font-mono text-amber-700 font-bold tabular-nums">
                {sunlight}% ({solarKw.toFixed(1)} kW)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sunlight}
              onChange={(e) => setSunlight(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Wind Speed Slider */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-sky-500" />
                {translations.energy.windSpeed[lang]}
              </span>
              <span className="font-mono text-sky-700 font-bold tabular-nums">
                {windSpeed} m/s ({windKw.toFixed(1)} kW)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="w-full accent-sky-500 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Live Calculation Output Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
            <div className="text-[10px] text-emerald-800 font-medium">
              {translations.energy.livePowerOutput[lang]}
            </div>
            <div className="text-base font-bold text-emerald-950 font-mono tabular-nums mt-0.5">
              {totalKw.toFixed(2)} kW
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
            <div className="text-[10px] text-emerald-800 font-medium">
              {translations.energy.dailyEst[lang]}
            </div>
            <div className="text-base font-bold text-emerald-950 font-mono tabular-nums mt-0.5">
              {dailyKwh.toFixed(1)} kWh
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
            <div className="text-[10px] text-emerald-800 font-medium">
              {translations.energy.monthlySavings[lang]}
            </div>
            <div className="text-base font-bold text-emerald-950 font-mono tabular-nums mt-0.5">
              ₹{monthlySavingsInr.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
            <div className="text-[10px] text-emerald-800 font-medium">
              {lang === 'gu' ? 'દરરોજ બચેલું CO₂' : lang === 'hi' ? 'दैनिक CO₂ बचत' : 'Daily CO₂ Saved'}
            </div>
            <div className="text-base font-bold text-emerald-950 font-mono tabular-nums mt-0.5">
              {dailyCo2SavedKg.toFixed(1)} kg
            </div>
          </div>
        </div>
      </div>

      {/* 5 Clean Energy Deep Dives */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {lang === 'gu' ? 'હરિત ઊર્જા સ્ત્રોતો' : lang === 'hi' ? 'हरित ऊर्जा के स्रोत' : 'Clean Energy Sources'}
        </div>

        {/* Horizontal Pillar Selector Bar */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {energyPillars.map((p) => {
            const isSelected = selectedPillarId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPillarId(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {p.name[lang].split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {activePillar.name[lang]}
              </h2>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">
                {activePillar.tagline[lang]}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              {activePillar.id === 'solar' && <Sun className="w-5 h-5 text-amber-500" />}
              {activePillar.id === 'wind' && <Wind className="w-5 h-5 text-sky-500" />}
              {activePillar.id === 'biomass' && <Flame className="w-5 h-5 text-orange-500" />}
              {activePillar.id === 'hydro' && <Droplets className="w-5 h-5 text-blue-500" />}
              {activePillar.id === 'hydrogen_ev' && <Zap className="w-5 h-5 text-emerald-500" />}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {activePillar.description[lang]}
          </p>

          {/* Key Benefits Bullet List */}
          <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/60">
            <div className="text-xs font-bold text-stone-800 mb-2">
              {lang === 'gu' ? 'મુખ્ય ફાયદાઓ:' : lang === 'hi' ? 'प्रमुख लाभ:' : 'Key Advantages:'}
            </div>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {activePillar.benefits[lang].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* National Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-stone-100/70 border border-stone-200">
              <div className="text-stone-500 text-[10px]">
                {lang === 'gu' ? 'સ્થાપિત ક્ષમતા' : lang === 'hi' ? 'स्थापित क्षमता' : 'Installed India'}
              </div>
              <div className="font-bold text-stone-900 mt-0.5 font-mono">
                {activePillar.stats.capacityIndia}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-100/70 border border-stone-200">
              <div className="text-stone-500 text-[10px]">
                {lang === 'gu' ? '2030 લક્ષ્યાંક' : lang === 'hi' ? '2030 लक्ष्य' : '2030 Target'}
              </div>
              <div className="font-bold text-emerald-700 mt-0.5 font-mono">
                {activePillar.stats.target2030}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-100/70 border border-stone-200">
              <div className="text-stone-500 text-[10px]">
                {lang === 'gu' ? 'કાર્બન કપાત' : lang === 'hi' ? 'कार्बन बचत' : 'Offset Factor'}
              </div>
              <div className="font-bold text-stone-900 mt-0.5 font-mono">
                {activePillar.stats.carbonOffsetPerUnit}
              </div>
            </div>
          </div>

          {/* Gujarat & Regional Landmark Highlight */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900">
                {lang === 'gu' ? 'ગુજરાત સિદ્ધિ: ' : lang === 'hi' ? 'गुजरात उपलब्धि: ' : 'Gujarat Landmark: '}
              </span>
              <span className="text-amber-950">
                {activePillar.gujaratHighlight[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
