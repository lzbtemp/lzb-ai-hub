import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 rounded-full border border-[#1B3A6B]/[0.04]"
          style={{ top: '10%', right: '15%', animation: 'drift 15s ease-in-out infinite' }}
        />
        <div
          className="absolute w-40 h-40 rounded-full bg-[#C0392B]/[0.02]"
          style={{ bottom: '20%', left: '10%', animation: 'float-slow 12s ease-in-out infinite' }}
        />
        <div
          className="absolute w-20 h-20 rounded-xl border border-[#8FAF8A]/[0.06] rotate-12"
          style={{ top: '25%', left: '20%', animation: 'float 10s ease-in-out infinite' }}
        />
      </div>

      <div className="relative animate-fade-in-up">
        <h1 className="text-[10rem] lg:text-[12rem] font-bold leading-none bg-gradient-to-b from-[#1B3A6B]/25 to-[#1B3A6B]/3 bg-clip-text text-transparent tracking-tighter select-none mb-2">
          404
        </h1>
        <p className="text-2xl text-[#2C2C2C]/50 mb-2 font-light">This page wandered off</p>
        <p className="text-sm text-[#2C2C2C]/25 mb-12">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1B3A6B] text-white rounded-xl hover:bg-[#1B3A6B]/90 transition-all hover:shadow-lg hover:shadow-[#1B3A6B]/20 hover:scale-105 font-medium"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
