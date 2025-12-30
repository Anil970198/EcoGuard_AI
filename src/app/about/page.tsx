'use client';

import Link from 'next/link';
import { ArrowLeft, Cpu, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
            <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Map
            </Link>

            <div className="max-w-2xl mx-auto space-y-12">
                <section className="space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
                        EcoGuard AI
                    </h1>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                        Saving wildlife and protecting drivers through intelligent, community-driven data.
                    </p>
                </section>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                        <Cpu className="w-8 h-8 text-amber-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">AI-Powered Risk</h3>
                        <p className="text-neutral-400 text-sm">
                            Our Proactive Risk Engine analyzes time, weather, and historical reports to predict collision hotspots before they happen.
                        </p>
                    </div>

                    <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                        <Globe className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Citizen Science</h3>
                        <p className="text-neutral-400 text-sm">
                            Every report you submit helps train our models and alert other drivers in real-time. YOU are the sensor network.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center p-8 bg-gradient-to-br from-amber-950/20 to-red-950/20 rounded-3xl border border-amber-900/30">
                    <Heart className="w-6 h-6 text-red-500 mr-3 animate-pulse" />
                    <span className="text-amber-200/80 font-medium">Built for safety. Built for nature.</span>
                </div>
            </div>
        </div>
    );
}
