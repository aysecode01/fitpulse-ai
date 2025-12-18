import React from 'react';
import { Globe, User, ArrowRight } from 'lucide-react';

export default function FitPulseWebsite() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      
      {/* HEADER: Masaüstü Menü */}
      <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-10 h-24 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.5)]">
              <span className="font-black text-black text-3xl italic">F</span>
            </div>
            <span className="text-3xl font-black italic tracking-tighter uppercase">FitPulse AI</span>
          </div>

          <div className="flex items-center gap-10">
            <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-500 tracking-widest uppercase transition-all">
              <Globe size={20} /> TR
            </button>
            <button className="px-10 py-3 bg-white/5 border border-white/10 rounded-full text-[13px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95">
              Giriş Yap
            </button>
          </div>
        </div>
      </header>

      {/* MAIN SECTION: Domuz Animasyonu ve Başlık */}
      <main className="max-w-7xl mx-auto px-10 pt-48 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Sol Taraf: Yazılar */}
        <div className="flex-1 space-y-10">
          <h1 className="text-8xl xl:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter">
            HİÇBİR ŞEY <br /> 
            <span className="text-orange-500 drop-shadow-[0_0_40px_rgba(249,115,22,0.3)]">ÖDEME</span>
          </h1>
          <p className="text-slate-400 text-2xl font-medium max-w-xl leading-relaxed">
            Yapay zeka koçunla tanış. Domuzcuk seni hedefine ulaştırırken cüzdanın güvende kalsın.
          </p>
          <button className="group flex items-center gap-6 bg-orange-500 px-14 py-8 rounded-[3rem] shadow-[0_25px_70px_rgba(249,115,22,0.4)] hover:scale-105 transition-all">
            <span className="text-3xl font-black italic uppercase tracking-tighter text-white">Hemen Başla</span>
            <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform" />
          </button>
        </div>

        {/* Sağ Taraf: Domuz GIF/Resim */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-orange-500/10 blur-[150px] rounded-full"></div>
          <img 
            src="/domuz.gif" // Domuz animasyonunu buraya koy
            alt="FitPulse Mascot"
            className="relative z-10 w-full max-w-[550px] mx-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]"
          />
          {/* Konuşma Balonu */}
          <div className="absolute -top-5 right-0 bg-white text-black p-6 rounded-[2.5rem] rounded-bl-none shadow-2xl rotate-6">
            <p className="text-xl font-black italic uppercase tracking-tighter">ÜCRETSİZ <br/> ANALİZ!</p>
          </div>
        </div>
      </main>

      {/* BOTTOM STRIP: Spor Yapan Top */}
      <section className="mt-10 bg-white/5 border-y border-white/5 py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 flex items-center gap-16">
          
          {/* Spor Yapan Top GIF */}
          <div className="w-40 h-40 flex-shrink-0">
            <img 
              src="/spor.gif" // Spor yapan top animasyonunu buraya koy
              alt="Exercise Animation"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1">
             <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 italic">HAREKET BEREKETTİR!</h2>
             <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-sm">Gerçek zamanlı egzersiz takibi ve analizler.</p>
          </div>

          {/* İstatistikler */}
          <div className="flex gap-20">
            <div className="text-center">
              <div className="text-4xl font-black text-orange-500 italic">%100</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">DOĞRULUK</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-500 italic">0₺</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">MALİYET</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
