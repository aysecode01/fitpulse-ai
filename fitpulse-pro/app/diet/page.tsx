"use client";
import React, { useState, useEffect } from 'react';
import { Utensils, Coffee, Clock, ArrowLeft, Ban, Heart, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DietPlan() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    checkDietStatus();
    return () => clearInterval(timer);
  }, [currentTime]);

  const checkDietStatus = () => {
    const hour = currentTime.getHours();
    const min = currentTime.getMinutes();
    const timeVal = hour + min / 60;

    // KAHVALTI: 07:00 - 10:00
    if (timeVal >= 7 && timeVal <= 10) {
      setStatus({
        type: "meal",
        label: "Sabah Kahvaltısı",
        menu: "Haşlanmış 2 yumurta, bir parça ekmek, çay.",
        drink: "Şekersiz Çay",
        note: "En ucuz protein yumurtadır, seni akşama kadar tok tutar.",
        icon: <Zap className="text-yellow-500" />
      });
    } 
    // ÖĞLE: 12:30 - 14:30
    else if (timeVal >= 12.5 && timeVal <= 14.5) {
      setStatus({
        type: "meal",
        label: "Öğle Yemeği",
        menu: "1 kase çorba (ne varsa) ve yoğurt.",
        drink: "Su veya Ayran",
        note: "Çorba mideyi doldurur, yoğurt ise kaslarını besler.",
        icon: <Utensils className="text-orange-500" />
      });
    }
    // AKŞAM: 18:00 - 20:30 (17:00'den itibaren görünür)
    else if (timeVal >= 17 && timeVal <= 20.5) {
      setStatus({
        type: "meal",
        label: "Akşam Yemeği",
        menu: "Sebze yemeği veya bulgur pilavı + yoğurt.",
        drink: "Bol Su",
        note: "Akşam ağır yeme ki vücudun dinlensin. Bulgur, pirinçten daha iyidir.",
        icon: <Utensils className="text-pink-500" />
      });
    }
    // ÖĞÜN KAÇIRMA (ARA ÖĞÜN - EN UCUZ)
    else if ((timeVal > 10 && timeVal < 12.5) || (timeVal > 14.5 && timeVal < 17)) {
      setStatus({
        type: "missed",
        label: "Vakti Kaçırdın ama...",
        menu: "Ana yemeği kaçırdın, üzülme.",
        drink: "Ara Öğün: 1 bardak ayran veya bir avuç sarı leblebi.",
        note: "Bunlar hem ucuzdur hem de mide asidini alır, seni tok tutar.",
        icon: <Ban className="text-red-500" />
      });
    }
    // GECE ATIŞTIRMASI (22:00 sonrası)
    else if (timeVal >= 22 || timeVal < 7) {
      setStatus({
        type: "night",
        label: "Gece Baskını! :)",
        menu: "Bu saatte yemek cüzdana da sağlığa da zarar.",
        drink: "Sıcak suyun içine bir parça nane veya limon at.",
        note: "Mideni sıcak suyla sakinleştir ve uyu. Yarın daha güçlü uyanacağız.",
        icon: <Heart className="text-purple-500" />
      });
    }
    // BEKLEME MODU
    else {
      setStatus({
        type: "wait",
        label: "Miden Dinleniyor",
        menu: "Harika gidiyorsun, vücudun yağ yakıyor.",
        drink: "Sadece su iç.",
        note: "Sıradaki öğüne az kaldı, iradene sahip çık!",
        icon: <Clock className="text-blue-500" />
      });
    }
  };

  if (!status) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-slate-500 mb-6 hover:text-white transition-all">
          <ArrowLeft size={18} /> Geri Dön
        </button>

        <div className={`p-[2px] rounded-[35px] ${
          status.type === 'meal' ? 'bg-orange-500' : 'bg-slate-700'
        }`}>
          <div className="bg-[#0a0a0a] rounded-[33px] p-8 text-center shadow-2xl">
            <div className="flex justify-center mb-4">{status.icon}</div>
            
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-1">{status.label}</h2>
            <p className="text-slate-500 text-[10px] font-bold mb-6 italic uppercase tracking-widest">
              Saat şu an: {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </p>

            <div className="space-y-4 text-left">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-orange-500 uppercase mb-1">Ne Yiyelim?</p>
                <p className="text-md font-bold italic text-slate-200">{status.menu}</p>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Ne İçelim?</p>
                <p className="text-md font-bold italic text-slate-200">{status.drink}</p>
              </div>

              <div className="p-5 bg-orange-500/5 rounded-2xl border border-orange-500/10">
                <p className="text-[10px] font-black text-orange-400 uppercase mb-1 text-center">KOÇUN TAVSİYESİ</p>
                <p className="text-xs font-medium text-slate-400 italic text-center leading-relaxed">
                  "{status.note}"
                </p>
              </div>
            </div>

            <button 
              onClick={() => router.push('/dashboard')}
              className="w-full mt-8 py-4 bg-orange-500 text-black font-black rounded-xl hover:bg-orange-400 transition-all uppercase italic text-sm"
            >
              TAMAMDIR KOÇ!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}