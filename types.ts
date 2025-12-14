export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  DIAGNOSIS = 'DIAGNOSIS',
  ADVISORY = 'ADVISORY',
  STRATEGY = 'STRATEGY'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  frostRisk: 'Low' | 'Moderate' | 'High';
}

export interface SoilData {
  id: string;
  location: string;
  moisture: number;
  temp: number;
  npkStatus: 'Optimal' | 'Low N' | 'Low P';
  status: 'Online' | 'Offline';
}

export interface DiseaseAnalysis {
  detected: boolean;
  diseaseName?: string;
  confidence?: number;
  treatment?: string;
  organicOptions?: string;
}

export interface ROIItem {
  year: string;
  cost: number;
  revenue: number;
  profit: number;
}