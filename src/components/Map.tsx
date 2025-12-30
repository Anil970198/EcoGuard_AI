'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
// Local logic removed, fetching from API now
import { useEffect, useState } from 'react';

// Fix for default marker icon in Next.js
const icon = new Icon({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Helper to fix icon paths which are often broken in Leaflet + Webpack
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RiskPoint {
    lat: number;
    lng: number;
    riskScore: number;
    reason: string;
}

export default function MapComponent() {
    const [riskPoints, setRiskPoints] = useState<RiskPoint[]>([]);
    const center = { lat: 40.7128, lng: -74.0060 }; // NYC defaults for demo

    useEffect(() => {
        // Fetch from Python Backend
        async function fetchRisk() {
            try {
                const res = await fetch(`http://localhost:8000/risk_map?lat=${center.lat}&lng=${center.lng}`);
                if (!res.ok) throw new Error("Backend not reachable");
                const data = await res.json();
                setRiskPoints(data);
            } catch (err) {
                console.warn("Failed to load risk map (Backend offline?):", err);
            }
        }
        fetchRisk();
    }, []);

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative">
            <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={true} className="w-full h-full z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles"
                />

                {/* Risk Heatmap Layers */}
                {riskPoints.map((point, i) => (
                    <Circle
                        key={i}
                        center={[point.lat, point.lng]}
                        radius={300}
                        pathOptions={{
                            color: point.riskScore > 0.6 ? '#ef4444' : '#f59e0b',
                            fillColor: point.riskScore > 0.6 ? '#ef4444' : '#f59e0b',
                            fillOpacity: point.riskScore > 0.6 ? 0.4 : 0.2
                        }}
                    >
                        <Popup>
                            <div className="text-neutral-900">
                                <strong>Risk: {(point.riskScore * 100).toFixed(0)}%</strong>
                                <br />
                                {point.reason}
                            </div>
                        </Popup>
                    </Circle>
                ))}

                {/* Mock User Location */}
                <Marker position={[center.lat, center.lng]}>
                    <Popup>You are here</Popup>
                </Marker>
            </MapContainer>

            <div className="absolute top-4 right-4 z-[9999] bg-neutral-900/90 backdrop-blur p-3 rounded-lg border border-neutral-700 shadow-xl">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Live Risk Feed</h3>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-sm text-neutral-200">High Risk: Deer Crossing</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-neutral-200">Medium Risk: Poor Visibility</span>
                </div>
            </div>
        </div>
    );
}
