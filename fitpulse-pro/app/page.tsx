"use client";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Globe, User, ChevronRight } from 'lucide-react';

export default function FitPulseHero() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-orange-500/30">
      
      {/* HEADER: Dil Seçeneği ve Giriş Yap */}
      <header className="w-full p-5 flex justify-between items-center max-w-xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
            <span className="font-black text-black text-xl italic">F</span>
          </div>
          <span className="font-black italic tracking-tighter text-lg uppercase">FitPulse AI</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Dil Seçeneği */}
          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors uppercase tracking-widest">
            <Globe size={14} />
            TR
          </button>
          
          {/* Giriş Yap Butonu */}
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[12px] font-black uppercase tracking-wider hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95">
            <User size={14} className="text-orange-500" />
            Giriş Yap
          </button>
        </div>
      </header>

      {/* ANA İÇERİK: Mobil Görünümlü Orta Alan */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-12 max-w-md mx-auto w-full text-center">
        
        {/* LOTTIE ANIMASYONU (Senin Domuz Figürü) */}
        <div className="relative w-full max-w-[280px] aspect-square mb-6 group">
          {/* Domuzun arkasındaki turuncu parlama (Glow effect) */}
          <div className="absolute inset-0 bg-orange-500/15 blur-[100px] rounded-full group-hover:bg-orange-500/25 transition-all duration-700"></div>
          
          <DotLottieReact
            src="/ad.lottie" // ad.lottie dosyasını 'public' klasörüne koymayı unutma!
            loop
            autoplay
            className="relative z-10 w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />

          {/* Konuşma Balonu (Görseldeki gibi) */}
          <div className="absolute -top-2 -right-2 bg-white text-black py-2 px-4 rounded-2xl rounded-bl-none shadow-2xl transform rotate-6 animate-bounce transition-transform hover:rotate-0">
            <p className="text-[10px] font-black uppercase leading-tight italic">
              Selam! <br /> <span className="text-orange-600">Başlayalım mı?</span>
            </p>
          </div>
        </div>

        {/* METİN ALANI */}
        <div className="space-y-3 mb-10">
          <h1 className="text-5xl font-black italic uppercase leading-[0.9] tracking-tighter">
            KİŞİSEL <br /> 
            <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">AI KOÇUN</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.1em]">
            Yazio gibi ama <span className="text-white">tamamen ücretsiz.</span>
          </p>
        </div>

        {/* HEMEN BAŞLA BUTONU (Görseldeki gibi büyük ve turuncu) */}
        <button className="w-full group relative overflow-hidden bg-orange-500 py-5 rounded-[2rem] shadow-[0_15px_40px_rgba(249,115,22,0.4)] transition-all hover:scale-[1.02] active:scale-95">
          <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="relative flex items-center justify-center gap-3">
            <span className="text-2xl font-black italic uppercase tracking-tighter">Hemen Başla</span>
            <ChevronRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* ALT BİLGİ */}
        <div className="mt-8 flex flex-col gap-1">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.4em]">
                FitPulse AI • 2024
            </p>
            <div className="flex justify-center gap-2">
                <div className="w-1 h-1 bg-orange-500/50 rounded-full"></div>
                <div className="w-1 h-1 bg-orange-500/50 rounded-full"></div>
                <div className="w-1 h-1 bg-orange-500/50 rounded-full"></div>
            </div>
        </div>

      </main>
    </div>
  );
}
