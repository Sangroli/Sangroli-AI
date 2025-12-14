import React, { useState, useRef } from 'react';
import { Camera, Loader2, CheckCircle, AlertOctagon, Info } from 'lucide-react';
import { analyzeOrchardImage } from '../services/geminiService';
import { DiseaseAnalysis } from '../types';

export const Scanner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Strip prefix for Gemini
        const base64Content = base64String.split(',')[1];
        setImage(base64String);
        analyzeImage(base64Content);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Content: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const analysis = await analyzeOrchardImage(base64Content);
      setResult(analysis);
    } catch (err) {
      setError("Analysis failed. Please check internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const triggerInput = () => fileInputRef.current?.click();

  return (
    <div className="p-4 pb-24 h-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Orchard Scan</h1>
      
      {/* Camera View Area */}
      <div className="flex-1 bg-gray-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
        {image ? (
          <img src={image} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <Camera size={48} className="mb-2" />
            <p className="text-sm">Tap camera to scan leaf/fruit</p>
          </div>
        )}
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
            <Loader2 size={40} className="animate-spin mb-3" />
            <p className="font-medium animate-pulse">Analyzing with Gemini AI...</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {!result && !loading && (
        <div className="mt-6 flex justify-center">
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageUpload} 
          />
          <button 
            onClick={triggerInput}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-xl transform transition hover:scale-105 flex items-center gap-2 px-8"
          >
            <Camera size={24} />
            <span className="font-semibold">Take Photo</span>
          </button>
        </div>
      )}

      {/* Results Card */}
      {result && (
        <div className="mt-4 bg-white rounded-xl p-5 shadow-lg border border-gray-100 animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center gap-2 font-bold text-lg ${result.detected ? 'text-red-600' : 'text-green-600'}`}>
              {result.detected ? <AlertOctagon /> : <CheckCircle />}
              {result.detected ? result.diseaseName : "Healthy Orchard"}
            </div>
            {result.confidence && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                {result.confidence}% Conf.
              </span>
            )}
          </div>

          {result.detected && (
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-xs font-bold text-red-800 uppercase mb-1">Recommended Treatment</p>
                <p className="text-sm text-gray-800">{result.treatment}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-xs font-bold text-green-800 uppercase mb-1">Organic Option</p>
                <p className="text-sm text-gray-800">{result.organicOptions}</p>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => { setImage(null); setResult(null); }}
            className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
          >
            Scan Another
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-lg text-center text-sm">
          {error}
        </div>
      )}
    </div>
  );
};