'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, AlertTriangle, MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Prediction {
    className: string;
    probability: number;
}

export default function ReportPage() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [animalType, setAnimalType] = useState('');
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const analyzeImage = async () => {
        // No client-side TFJS anymore. We rely on the button click or upload event usually,
        // but here we can just do nothing until image is confirmed.
        // Actually, let's auto-upload when image is selected for UX.
        if (!imgRef.current) return;
    };

    const activeUpload = async (file: File) => {
        setIsAnalyzing(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:8000/predict_animal', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setPredictions(data.predictions);
            if (data.predictions && data.predictions.length > 0) {
                setAnimalType(data.predictions[0].className);
            }
        } catch (err) {
            console.error("AI Service Error:", err);
        } finally {
            setIsAnalyzing(false);
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageSrc(url);
            setPredictions([]);
            setAnimalType('');
            // Send to Python AI
            activeUpload(file);
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
            });
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 pb-24">
            <header className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
                    Report Incident
                </h1>
                <p className="text-neutral-400 text-sm">Help save wildlife and drivers.</p>
            </header>

            <div className="space-y-6 max-w-lg mx-auto">
                {/* Image Upload Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-full aspect-video bg-neutral-950 rounded-xl overflow-hidden border-2 border-dashed border-neutral-800 flex items-center justify-center">
                        {imageSrc ? (
                            <>
                                <img
                                    ref={imgRef}
                                    src={imageSrc}
                                    alt="Uploaded"
                                    className="object-cover w-full h-full"
                                    crossOrigin="anonymous"
                                />
                                {isAnalyzing && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <div className="flex flex-col items-center">
                                            <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-2" />
                                            <span className="text-xs font-medium text-amber-500">AI Identifying...</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center text-neutral-500">
                                <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Tap to upload photo</p>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {predictions.length > 0 && (
                        <div className="w-full bg-neutral-800/50 rounded-lg p-3">
                            <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wider font-semibold">AI Analysis</p>
                            {predictions.slice(0, 2).map((p, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-neutral-200">{p.className}</span>
                                    <span className="text-amber-500 font-mono">{(p.probability * 100).toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Location Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-neutral-300">Location</label>
                        <button
                            onClick={handleGetLocation}
                            type="button"
                            className="text-xs flex items-center gap-1 text-amber-500 hover:text-amber-400"
                        >
                            <MapPin className="w-3 h-3" />
                            {location ? 'Update' : 'Get Location'}
                        </button>
                    </div>
                    {location ? (
                        <div className="text-sm text-neutral-400 font-mono bg-neutral-950 p-2 rounded border border-neutral-800">
                            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                        </div>
                    ) : (
                        <div className="text-sm text-neutral-600 italic">Location required for warning system</div>
                    )}
                </div>

                {/* Details Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Animal Type</label>
                        <select
                            value={animalType}
                            onChange={(e) => setAnimalType(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-neutral-200 focus:ring-1 focus:ring-amber-500 outline-none"
                        >
                            <option value="">Select...</option>
                            <option value="deer">Deer / Large Mammal</option>
                            <option value="small_mammal">Small Mammal (Raccoon, etc)</option>
                            <option value="bird">Bird</option>
                            <option value="reptile">Reptile</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Incident Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button type="button" className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-sm focus:border-amber-500 focus:bg-amber-950/30">Roadkill</button>
                            <button type="button" className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-sm focus:border-amber-500 focus:bg-amber-950/30">Near Miss</button>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_4px_20px_rgba(245,158,11,0.3)]">
                    Submit Report
                </button>
            </div>
        </div>
    );
}
