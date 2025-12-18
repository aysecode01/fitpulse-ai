"use client";
import React, { useState, useEffect } from 'react';
import { Utensils, ArrowLeft, Ban, Heart, Zap, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DietPlan() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Saat Hesaplama (Türkiye GMT+3)
  const istanbulTime = new Intl.DateTimeFormat('tr-TR', {
    timeZone: 'Europe/Istanbul',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }).format(currentTime);

  const [hour, min] = istanbulTime.split(':').map(Number);
  const timeVal = hour + min / 60;

  // Durum Belirleme
  let content = {
    label: "Mutfak Kapandı!",
    menu: "Bu saatte yemek yemek sindirimi zorlaştırır.",
    drink: "Sadece Su veya Bitki Çayı",
    detox: "Uyku Öncesi:\n• 1 fincan papatya çayı\n• 2 damla limon",
    icon: <Heart className="text-orange-500" size={36} />
  };

  if (timeVal >= 7 && timeVal < 11) {
    content = {
      label: "Sabah Kahvaltısı",
      menu: "Haşlanmış 2 yumurta, tam buğday ekmeği ve bol yeşillik.",
      drink: "Şekersiz Çay / Filtre Kahve",
      detox: "Güne Başlarken:\n• 1 bardak ılık su\n• Yarım limon suyu\n• 1 dilim taze zencefil",
      icon: <Zap className="text-orange-500" size={36} />
    };
  } else if (timeVal >= 12.5 && timeVal <= 14.5) {
    content = {
      label: "Öğle Yemeği",
      menu: "1 kase çorba, ızgara tavuk veya büyük bir salata.",
      drink: "Ayran veya Maden Suyu",
      detox: "Yemek Sonrası:\n• Yarım bardak su\n• 1 tatlı kaşığı elma sirkesi",
      icon: <Utensils className="text-orange-500" size={36} />
    };
  } else if (timeVal >= 18 && timeVal <= 20.5) {
    content = {
      label: "Akşam Yemeği",
      menu: "Sebze yemeği veya ızgara balık + yoğurt.",
      drink: "Bol Su",
      detox: "Akşam Detoksu:\n• 1 fincan yeşil çay\n• 1 adet çubuk tarçın",
      icon: <Utensils className="text-orange-500" size={36} />
    };
  } else if (timeVal >= 11 && timeVal < 18) {
    content = {
      label: "Vakti Kaçırdın Ama...",
      menu: "Ana yemeği kaçırdın, vücudunu aç bırakma.",
      drink: "1 bardak ayran veya bir avuç sarı leblebi.",
      detox: "Koçun Detoks Tarifi:\n• 1 bardak sıcak su\n• 5-6 dal taze maydanoz\n• Yarım dilimlenmiş limon\n• 5 dk demlenmiş yeşil çay",
      icon: <Ban className="text-orange-500" size={36} />
    };
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 flex flex-col items-center justify-center font-sans">
      <div className="max-w-md w-full">
        <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-500 mb-6 hover:text-white transition-all">
          <ArrowLeft size={18} /> Geri Dön
        </button>

        <div className="p-[1px] rounded-[40px] bg-gradient-to-b from-orange-500/40 to-transparent">
          <div className="bg-[#0a0a0a] rounded-[39px] p-8 text-center border border-white/5 shadow-2xl">
            <div className="flex justify-center mb-6 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              {content.icon}
            </div>
            
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-1">{content.label}</h2>
            <p className="text-slate-500 text-[11px] font-bold mb-8 italic uppercase tracking-widest">
              SAAT ŞU AN: {istanbulTime}
            </p>

            <div className="space-y-4 text-left">
              <div className="bg-[#111111] p-5 rounded-2xl border border-white/5 text-center sm:text-left">
                <p className="text-[10px] font-black text-orange-500 uppercase mb-2">Ne Yiyelim?</p>
                <p className="text-base font-bold italic text-slate-200">{content.menu}</p>
              </div>

              <div className="bg-[#111111] p-5 rounded-2xl border border-white/5 text-center sm:text-left">
                <p className="text-[10px] font-black text-orange-500 uppercase mb-2">Ne İçelim?</p>
                <p className="text-base font-bold italic text-slate-200">{content.drink}</p>
              </div>

              <div className="p-6 bg-orange-500/5 rounded-2xl border border-orange-500/20 relative">
                <Leaf size={24} className="text-orange-500/20 absolute top-4 right-4" />
                <p className="text-[11px] font-black text-orange-500 uppercase mb-3 text-center">KOÇUN DETOKS TARİFİ</p>
                <div className="text-[13px] font-medium text-slate-300 italic leading-relaxed space-y-2">
                  {content.detox.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('•') ? "pl-2" : "font-bold text-slate-100 text-center sm:text-left"}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => router.push('/')}
              className="w-full mt-8 py-5 bg-orange-500 text-black font-black rounded-2xl hover:bg-orange-400 transition-all uppercase italic shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)]"
            >
              TAMAMDIR KOÇ!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
