import React from 'react';
import { CloudRain, ThermometerSun, Wind, AlertTriangle, Sprout, TrendingUp, Droplets, Wifi, WifiOff, Layers } from 'lucide-react';
import { WeatherData, SoilData } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockWeather: WeatherData = {
  temp: 18,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  frostRisk: 'Low'
};

const mockSoilSensors: SoilData[] = [
  { id: '1', location: 'Block A (Top)', moisture: 42, temp: 14, npkStatus: 'Optimal', status: 'Online' },
  { id: '2', location: 'Block B (Mid)', moisture: 28, temp: 15, npkStatus: 'Low N', status: 'Online' },
  { id: '3', location: 'Block C (Bottom)', moisture: 0, temp: 0, npkStatus: 'Optimal', status: 'Offline' },
];

const marketData = [
  { name: 'Royal', price: 180 },
  { name: 'Gala', price: 140 },
  { name: 'Spur', price: 210 },
  { name: 'Golden', price: 90 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kotkhai Pilot</h1>
          <p className="text-sm text-gray-500">10 Bigha | Altitude 2100m</p>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Sprout size={14} /> Growing Stage
        </div>
      </div>

      {/* Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <CloudRain size={100} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium">Current Weather</p>
              <h2 className="text-4xl font-bold mt-1">{mockWeather.temp}°C</h2>
              <p className="text-blue-50 mt-1">{mockWeather.condition}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-blue-100 text-sm">
                <Wind size={16} /> {mockWeather.windSpeed} km/h
              </div>
              <div className="flex items-center gap-2 text-blue-100 text-sm mt-1">
                <CloudRain size={16} /> {mockWeather.humidity}%
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThermometerSun size={20} className="text-yellow-300" />
              <span className="font-medium">Frost Risk</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
              mockWeather.frostRisk === 'High' ? 'bg-red-500' : 'bg-green-500'
            }`}>
              {mockWeather.frostRisk}
            </span>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <AlertTriangle size={18} className="text-orange-500" /> 
          Urgent Alerts
        </h3>
        <ul className="space-y-3">
          <li className="flex gap-3 items-start text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
            <div className="min-w-[4px] h-full bg-orange-400 rounded-full"></div>
            <p><strong>Scab Warning:</strong> High humidity detected over last 48h. Recommended proactive spray of Fluxapyroxad within 2 days.</p>
          </li>
          <li className="flex gap-3 items-start text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
             <div className="min-w-[4px] h-full bg-blue-400 rounded-full"></div>
            <p><strong>Irrigation:</strong> Soil moisture sensor at Block B indicates 30% saturation. Trigger drip irrigation tonight.</p>
          </li>
        </ul>
      </div>

      {/* Soil Health Section */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-emerald-600" />
            Soil Monitor
          </div>
          <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Live Feed</span>
        </h3>
        
        <div className="grid gap-3">
          {mockSoilSensors.map((sensor) => (
            <div key={sensor.id} className={`p-3 rounded-lg border transition-all ${sensor.status === 'Online' ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm text-gray-700">{sensor.location}</span>
                <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${sensor.status === 'Online' ? 'text-green-700 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {sensor.status === 'Online' ? <Wifi size={10} /> : <WifiOff size={10} />}
                  {sensor.status}
                </div>
              </div>
              
              {sensor.status === 'Online' ? (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 p-2 rounded border border-gray-100">
                    <div className="text-[10px] text-gray-500 flex justify-center items-center gap-1 mb-1">
                      <Droplets size={10} className="text-blue-500"/> Moisture
                    </div>
                    <div className={`font-bold text-sm ${sensor.moisture < 30 ? 'text-orange-600' : 'text-gray-800'}`}>
                      {sensor.moisture}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded border border-gray-100">
                     <div className="text-[10px] text-gray-500 flex justify-center items-center gap-1 mb-1">
                       <ThermometerSun size={10} className="text-orange-500"/> Soil Temp
                     </div>
                     <div className="font-bold text-sm text-gray-800">{sensor.temp}°C</div>
                  </div>
                   <div className="bg-gray-50 p-2 rounded border border-gray-100">
                     <div className="text-[10px] text-gray-500 flex justify-center items-center gap-1 mb-1">
                       <Sprout size={10} className="text-green-600"/> NPK
                     </div>
                     <div className={`font-bold text-sm ${sensor.npkStatus !== 'Optimal' ? 'text-orange-600' : 'text-green-700'}`}>
                       {sensor.npkStatus}
                     </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-400 text-center py-3 bg-gray-100/50 rounded border border-dashed border-gray-200">
                  Signal lost. Last sync: 2h ago.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Market Prices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-green-600" />
          Shimla Mandi Avg. Prices (₹/kg)
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketData}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                {marketData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Spur' ? '#dc2626' : '#9ca3af'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};