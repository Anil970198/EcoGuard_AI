'use client';

import { ShieldAlert, AlertTriangle, Info, Navigation, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock alerts
const ALERTS = [
    { id: 1, type: 'critical', location: 'Route 9 East', message: 'High Collision Risk: Deer Migration active.', time: '10 mins ago' },
    { id: 2, type: 'warning', location: 'I-95 Exit 42', message: 'Reported roadkill on shoulder. Caution advised.', time: '1 hour ago' },
    { id: 3, type: 'info', location: 'County Rd 5', message: 'Visibility dropping due to fog. Wildlife unpredictable.', time: '2 hours ago' },
];

export default function FeedPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 pb-20">
            <header className="flex items-center gap-4 mb-6">
                <Link href="/" className="p-2 hover:bg-neutral-900 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-neutral-400" />
                </Link>
                <h1 className="text-2xl font-bold">Live Alerts</h1>
            </header>

            <div className="space-y-4 max-w-lg mx-auto">
                {ALERTS.map((alert) => (
                    <div key={alert.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex gap-4">
                        <div className="pt-1">
                            {alert.type === 'critical' ? (
                                <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
                            ) : alert.type === 'warning' ? (
                                <AlertTriangle className="w-6 h-6 text-amber-500" />
                            ) : (
                                <Info className="w-6 h-6 text-blue-500" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-sm text-neutral-200">{alert.location}</h3>
                                <span className="text-xs text-neutral-500">{alert.time}</span>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-3">{alert.message}</p>
                            <button className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-500 transition-colors uppercase tracking-wider">
                                <Navigation className="w-3 h-3" />
                                Reroute
                            </button>
                        </div>
                    </div>
                ))}

                <div className="text-center pt-8 text-neutral-600 text-sm">
                    End of live feed.
                </div>
            </div>
        </div>
    );
}
