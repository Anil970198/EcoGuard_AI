'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AlertTriangle, PlusCircle, ShieldAlert } from 'lucide-react';

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-neutral-900 animate-pulse flex items-center justify-center text-neutral-500">Loading Map Engine...</div>
});

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Solid Standard Header */}
      <nav className="h-16 flex-none bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 p-2 rounded-lg">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">EcoGuard <span className="text-neutral-500 font-normal">AI</span></span>
        </div>

        {/* Separated Actions */}
        <div className="flex gap-4">
          <Link href="/feed" className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm font-medium text-white transition-colors border border-neutral-700">
            Alerts
          </Link>
          <Link href="/about" className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm font-medium text-white transition-colors border border-neutral-700">
            About
          </Link>
        </div>
      </nav>

      {/* Main Content Area - Map takes remaining space */}
      <div className="flex-1 relative z-0 w-full min-h-0">
        <MapWithNoSSR />

        {/* Floating Action Button */}
        <Link
          href="/report"
          className="absolute bottom-8 right-8 z-[1000] bg-amber-600 hover:bg-amber-500 text-white p-4 rounded-full shadow-xl hover:shadow-amber-500/20 transition-all flex items-center gap-2 group"
        >
          <PlusCircle className="w-6 h-6" />
          <span className="font-bold pr-1">Report</span>
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="h-10 flex-none bg-black border-t border-neutral-800 flex items-center justify-between px-6 text-xs font-mono text-neutral-500 z-20">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>RISK MODEL: ACTIVE</span>
          </span>
          <span className="hidden sm:inline">|</span>
          <span>REPORTS (24h): <span className="text-white">12</span></span>
        </div>
      </div>
    </main>
  );
}
