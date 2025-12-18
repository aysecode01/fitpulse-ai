"use client";
import React from 'react';
import Link from 'next/link';
import { Smartphone, Zap, Target, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* ÜST MENÜ (NAVIGASYON) */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-slate-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
          FitPulse AI
        </h1>
        <div className="flex items-center gap-6">
          <Link href="/login" className="font-semibold text-slate-600 hover:text-pink-500 transition">
            Giriş Yap
          </Link>
          <Link href="/register" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200">
            Ücretsiz Başla
          </Link>
        </div>
      </nav>

      {/* ANA GÖVDE (HERO SECTION) */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        {/* Küçük Rozet */}
        <div className="inline-block px-4 py-1.5 mb-8 text-sm font-bold tracking-wide text-pink-600 uppercase bg-pink-50 rounded-full border border-pink-100">
          ✨ Yapay Zeka Destekli Kişisel Koçun
        </div>

        {/* Ana Başlık */}
        <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight italic leading-tight text-slate-900">
          28 Günde <br />
          <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
            Vücudunu Yenile
          </span>
        </h2>

        {/* Alt Başlık Yazısı */}
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Sana özel hazırlanan AI diyet listeleri ve antrenman programları ile hedefine ulaşmak artık çok daha kolay.
        </p>
        
        {/* Hareket Butonu (CTA) */}
        <div className="flex justify-center">
          <Link href="/register">
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-12 py-5 rounded-3xl font-extrabold text-xl shadow-2xl shadow-pink-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group">
              Hemen Başla 
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* ÖZELLİK KARTLARI (KÜÇÜK KUTULAR) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
          <div className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 hover:border-pink-200 transition-all group">
            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500 group-hover:text-white transition-all text-pink-500">
              <Target size={28} />
            </div>
            <h4 className="text-2xl font-bold mb-3 italic">Hedef Odaklı</h4>
            <p className="text-slate-500 font-medium leading-relaxed">Sen hedefini belirle, AI senin için en kısa ve sağlıklı yolu çizsin.</p>
          </div>

          <div className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 hover:border-orange-200 transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all text-orange-500">
              <Zap size={28} />
            </div>
            <h4 className="text-2xl font-bold mb-3 italic">Kolay Takip</h4>
            <p className="text-slate-500 font-medium leading-relaxed">Video destekli egzersizler ve canlı ilerleme takibi cebinde.</p>
          </div>

          <div className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 hover:border-purple-200 transition-all group">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all text-purple-500">
              <Smartphone size={28} />
            </div>
            <h4 className="text-2xl font-bold mb-3 italic">AI Beslenme</h4>
            <p className="text-slate-500 font-medium leading-relaxed">Günün tarihine ve ihtiyacına göre otomatik güncellenen diyetler.</p>
          </div>
        </div>
      </main>

      {/* Alt Bilgi */}
      <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-50">
        © 2025 FitPulse AI - Geleceğin Fitness Platformu
      </footer>
    </div>
  );
}
