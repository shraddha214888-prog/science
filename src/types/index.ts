export type Language = 'gu' | 'hi' | 'en';

export type TabType = 'home' | 'energy' | 'calculator' | 'conservation' | 'quiz';

export interface EnergyPillar {
  id: string;
  name: { gu: string; hi: string; en: string };
  tagline: { gu: string; hi: string; en: string };
  iconName: string;
  description: { gu: string; hi: string; en: string };
  benefits: { gu: string[]; hi: string[]; en: string[] };
  stats: {
    capacityIndia: string;
    target2030: string;
    carbonOffsetPerUnit: string;
  };
  gujaratHighlight: { gu: string; hi: string; en: string };
}

export interface EcoHabit {
  id: string;
  title: { gu: string; hi: string; en: string };
  desc: { gu: string; hi: string; en: string };
  category: 'energy' | 'water' | 'waste' | 'nature';
  points: number;
  co2SavedKg: number;
}

export interface QuizQuestion {
  id: number;
  question: { gu: string; hi: string; en: string };
  options: { gu: string[]; hi: string[]; en: string[] };
  correctIndex: number;
  explanation: { gu: string; hi: string; en: string };
}

export interface SolarCalculationResult {
  recommendedKw: number;
  panelsCount: number;
  requiredAreaSqFt: number;
  systemCostApprox: number;
  governmentSubsidy: number;
  netCost: number;
  monthlyGenerationUnits: number;
  monthlySavingsInr: number;
  annualSavingsInr: number;
  paybackPeriodYears: number;
  co2OffsetTonsPerYear: number;
}

export interface CarbonFootprintResult {
  totalCo2KgPerYear: number;
  categoryScores: {
    transport: number;
    electricity: number;
    cooking: number;
    lifestyle: number;
  };
  treesNeededToOffset: number;
  ratingTier: 'excellent' | 'moderate' | 'high';
}
