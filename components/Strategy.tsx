import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, CloudLightning, Cpu, Sprout, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ROIItem } from '../types';

const roiData: ROIItem[] = [
  { year: 'Y1 (Pilot)', cost: 2.5, revenue: 8, profit: 5.5 },
  { year: 'Y2 (Opt)', cost: 1.8, revenue: 10, profit: 8.2 },
  { year: 'Y3 (Scale)', cost: 1.5, revenue: 12, profit: 10.5 },
  { year: 'Y4', cost: 1.2, revenue: 14, profit: 12.8 },
  { year: 'Y5', cost: 1.2, revenue: 15, profit: 13.8 },
];

const Section = ({ title, icon: Icon, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Icon size={20} className="text-red-600" />
          </div>
          <span className="font-semibold text-gray-800 text-left">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      {isOpen && <div className="p-5 text-gray-600 text-sm leading-relaxed">{children}</div>}
    </div>
  );
};

export const Strategy: React.FC = () => {
  return (
    <div className="p-4 pb-24 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Apple AI Strategy</h1>
        <p className="text-gray-500 text-sm mt-1">10 Bigha Pilot Design | Kotkhai, HP</p>
      </div>

      <Section title="The Problem: Why Traditional Fails" icon={CloudLightning} defaultOpen>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Climate Shift:</strong> Unpredictable chilling hours and late frost in Kotkhai are reducing fruit set.</li>
          <li><strong>Disease Pressure:</strong> Rising temperatures favor Marssonina and Scab; traditional calendar sprays are now ineffective and costly.</li>
          <li><strong>Input Costs:</strong> Fertilizer and labor costs have doubled in 5 years, while grading standards for market prices have become stricter.</li>
          <li><strong>Blind Farming:</strong> 80% of farmers apply nutrients without soil testing, leading to pH imbalance and poor color.</li>
        </ul>
      </Section>

      <Section title="AI Architecture & Stack" icon={Cpu}>
        <div className="space-y-4">
          <div className="border-l-2 border-red-500 pl-4">
            <h4 className="font-bold text-gray-900">1. Data Layer (Inputs)</h4>
            <p><strong>Macro:</strong> Satellite (Sentinel-2) for vegetation index (NDVI). Weather API (OpenWeather) for forecast.</p>
            <p><strong>Micro:</strong> 3 IoT Nodes (Soil Moisture, Temp/Humidity) @ ₹5k each. Farmer's Smartphone (Images).</p>
          </div>
          <div className="border-l-2 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900">2. Intelligence Layer (AI)</h4>
            <p><strong>Computer Vision:</strong> Gemini Flash for leaf disease detection & fruit grading.</p>
            <p><strong>Predictive Models:</strong> Frost prediction using localized temp/humidity trends.</p>
          </div>
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-bold text-gray-900">3. Delivery Layer (App)</h4>
            <p>React PWA (this app). Offline-first capability. Voice interface for advisory.</p>
          </div>
        </div>
      </Section>

      <Section title="Core Use Cases" icon={Target}>
        <div className="space-y-4">
          <div>
            <span className="font-bold text-gray-900 block">1. Frost Prediction</span>
            <p>AI correlates temp drop rate + humidity. Alerts farmer 12h prior to trigger smoke/irrigation.</p>
          </div>
          <div>
            <span className="font-bold text-gray-900 block">2. Precision Spraying</span>
            <p>Instead of "Spray every 10 days", AI suggests "Spray Fungicide A only if rain > 5mm and Temp > 15°C". Saves 30% chemical cost.</p>
          </div>
          <div>
            <span className="font-bold text-gray-900 block">3. Digital Grading</span>
            <p>Pre-harvest estimate using phone camera to scan tree clusters. Predicts crate count and size mix (Royal vs Small).</p>
          </div>
        </div>
      </Section>

      <Section title="Pilot Implementation Plan" icon={Sprout}>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="min-w-[24px] h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-xs">1</div>
            <div>
              <h5 className="font-bold text-gray-900">Month 1: Digital Baseline</h5>
              <p>Map 10 Bigha boundaries. Soil testing (NPK). Install "HimApple" app. Log historical harvest data.</p>
            </div>
          </div>
          <div className="flex gap-3">
             <div className="min-w-[24px] h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-xs">2</div>
            <div>
              <h5 className="font-bold text-gray-900">Month 2-3: Deployment</h5>
              <p>Install 3 cheap solar IoT sensors. Train farmer to photograph leaves weekly. Activate frost alerts.</p>
            </div>
          </div>
          <div className="flex gap-3">
             <div className="min-w-[24px] h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-xs">3</div>
            <div>
              <h5 className="font-bold text-gray-900">Harvest: Validation</h5>
              <p>Compare predicted yield vs actual. Measure chemical savings. Grade quality against non-AI plots.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Cost vs Benefit (10 Bigha)" icon={DollarSign}>
        <p className="mb-4 text-xs italic">Values in Lakh INR. Pilot cost includes hardware & setup.</p>
        <div className="h-48 w-full mb-4">
           <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#16a34a" fill="#dcfce7" name="Revenue" />
              <Area type="monotone" dataKey="cost" stackId="2" stroke="#dc2626" fill="#fee2e2" name="Cost" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-green-700">25%</div>
                <div className="text-xs text-green-800">Yield Increase</div>
            </div>
             <div className="bg-red-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-red-700">20%</div>
                <div className="text-xs text-red-800">Cost Reduction</div>
            </div>
        </div>
      </Section>

      <Section title="Reality Check & Risks" icon={Activity}>
        <div className="space-y-2">
            <p><strong>Connectivity:</strong> Kotkhai has shadow zones. <span className="text-green-600">Mitigation:</span> App works offline, syncs when near Wifi/4G.</p>
            <p><strong>Adoption:</strong> Farmers trust intuition over data. <span className="text-green-600">Mitigation:</span> Don't replace intuition; validate it. "AI agrees with you".</p>
            <p><strong>Hardware Failure:</strong> Monkeys/Hail break sensors. <span className="text-green-600">Mitigation:</span> Rugged cages, cheap replaceable nodes.</p>
        </div>
      </Section>

       <Section title="3-5 Year Vision" icon={Target}>
        <p>From 10 Bigha to Shimla District. Aggregated data creates a "Himachal Apple Graph". FPOs can collectively bargain for inputs based on predictive demand. Integration with HPMC for guaranteed procurement based on digital quality certificates.</p>
      </Section>
    </div>
  );
};