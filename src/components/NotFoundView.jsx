import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFoundView() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-neutral-950 text-white animate-fade-in relative overflow-hidden select-none">
      
      {/* Glitch Keyframes Style */}
      <style>{`
        @keyframes tvGlitch {
          0% {
            transform: translate(0) skew(0deg);
            filter: drop-shadow(0 0 0 rgba(255,255,255,0));
          }
          10% {
            transform: translate(-3px, 2px) skew(-2deg);
            filter: drop-shadow(2px 0px 1px rgba(255,255,255,0.3));
          }
          20% {
            transform: translate(3px, -2px) skew(2deg);
            filter: drop-shadow(-2px 0px 1px rgba(255,255,255,0.3));
          }
          30% {
            transform: translate(0) skew(0deg);
            filter: drop-shadow(0 0 0 rgba(255,255,255,0));
          }
          75% {
            transform: translate(5px, 0) skew(5deg);
            clip-path: inset(20% 0 50% 0);
          }
          80% {
            transform: translate(-5px, 0) skew(-5deg);
            clip-path: inset(50% 0 20% 0);
          }
          85% {
            transform: translate(0) skew(0deg);
            clip-path: inset(0);
          }
          100% {
            transform: translate(0) skew(0deg);
          }
        }

        .scanline-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.4)
          );
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 20;
        }

        .glitch-effect {
          animation: tvGlitch 3s infinite linear alternate-reverse;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        .floating-element {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Scanline Overlay */}
      <div className="scanline-overlay"></div>

      {/* Main Container */}
      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        
        {/* 4 [Item Basket] 4 Row with Glitch styling */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-10">
          <span className="font-serif text-8xl sm:text-[13rem] font-light text-white tracking-tighter glitch-effect">
            4
          </span>

          <div className="floating-element w-36 sm:w-56 h-36 sm:h-56 bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-800 flex items-center justify-center p-6 relative group glitch-effect">
            <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrnTMkTPhROEcPlp1LMCMJYnmpWShEN-Ux7kdcO2M3fWwQFzb5vk_uFwOc&s=10" 
              alt="Empty Cart" 
              className="w-full h-full object-contain filter grayscale invert opacity-90 transform group-hover:scale-105 transition-transform duration-500" 
            />
            <span className="absolute -bottom-3 bg-white text-neutral-950 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold shadow-lg">
              Empty Bag
            </span>
          </div>

          <span className="font-serif text-8xl sm:text-[13rem] font-light text-white tracking-tighter glitch-effect">
            4
          </span>
        </div>

        {/* Text descriptions */}
        <div className="space-y-3 max-w-md mx-auto">
          <h2 className="text-sm sm:text-base font-semibold tracking-wider text-neutral-200 uppercase glitch-effect">
            The bag is empty. This product does not exist.
          </h2>
          <p className="text-xs text-neutral-400 font-light tracking-wide">
            Try searching for another item or return to the catalog.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            to="/shop" 
            className="w-full sm:w-auto bg-white text-neutral-950 px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:bg-neutral-200 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Go to Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/" 
            className="w-full sm:w-auto bg-neutral-900 text-white border border-neutral-800 px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:bg-neutral-800 transition-all shadow-md flex items-center justify-center cursor-pointer"
          >
            Return to Home
          </Link>
        </div>

      </div>
    </div>
  );
}