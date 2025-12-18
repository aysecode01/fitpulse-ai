"use client";
import React, { useState, useEffect } from 'react';
import { Utensils, ArrowLeft, Ban, Heart, Zap, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DietPlan() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  const getIstanbulTime = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      timeZone: 'Europe/Istanbul',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(date);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = getIstanbulTime(currentTime);
  const [hour, min] = timeStr.split(':').map(Number);
  const timeVal = hour + min / 60;

  // Varsayılan İçerik (Gece Modu)
  let content = {
    label: "MUTFAK KAPANDI!",
    menu: "Bu saatten sonra yemek yemek sadece yağ olarak döner. Derhal mutfaktan uzaklaş!",
    drink: "Sadece Su veya Yatıştırıcı Bitki Çayı",
    detox: "Uyku Öncesi Disiplini:\n• 1 fincan papatya çayı\n• 2 damla limon\n• Mideni sakinleştir ve dinlen.",
    icon: <Heart className="text-orange-500" size={36} />
  };

  // 1. KAHVALTI ZAMANI (07:00 - 10:00)
  if (timeVal >= 7 && timeVal < 10) {
    content = {
      label: "SABAH KAHVALTISI",
      menu: "Günün temelini atıyoruz: 2 yumurta, bol yeşillik ve tam buğday ekmeği.",
      drink: "Şekersiz Çay veya Filtre Kahve",
      detox: "Güne Başlarken:\n• 1 bardak ılık su\n• Yarım limon suyu\n• 1 dilim taze zencefil",
      icon: <Zap className="text-orange-500" size={36} />
    };
  } 
  // 2. KAHVALTIYI KAÇIRANLAR (10:00 - 12:30)
  else if (timeVal >= 10 && timeVal < 12.5) {
    content = {
      label: "KAHVALTIYI KAÇIRDIN!",
      menu: "En önemli öğün olan kahvaltıyı nasıl kaçırırsın? Artık öğleye kadar hafif bir şeyler atıştıralım.",
      drink: "1 bardak ayran veya bir avuç sarı leblebi var ise yoksada bir haşlanmış yumurta yeter",
      detox: "Metabolizma Kurtarma:\n• 1 bardak sıcak su\n• 5-6 dal taze maydanoz\n• Yarım dilimlenmiş limon",
      icon: <Ban className="text-orange-500" size={36} />
    };
  }
  // 3. ÖĞLE YEMEĞİ (12:30 - 14:30)
  else if (timeVal >= 12.5 && timeVal <= 14.5) {
    content = {
      label: "ÖĞLE YEMEĞİ VAKTİ",
      menu: "Izgara tavuk veya protein ağırlıklı bir salata ile devam ediyoruz. bunlarda yoksa güzelce bir mecimek çorbası ama bir kase ondan fazla yok!",
      drink: "Ayran veya Maden Suyu",
      detox: "Sindirime Yardımcı:\n• Yarım bardak su\n• 1 tatlı kaşığı elma sirkesi",
      icon: <Utensils className="text-orange-500" size={36} />
    };
  }
  // 4. ÖĞLENİ KAÇIRANLAR (14:30 - 18:00)
  else if (timeVal > 14.5 && timeVal < 18) {
    content = {
      label: "ÖĞLENİ KAÇIRDIN!",
      menu: "Öğle yemeğini atladığın için çok bir şey yeme. Akşama sağlam bir yemek yiyeceğiz.",
      drink: "Sadece Detoks Çayı İç",
      detox: "Açlık Kontrolü:\n• 1 fincan yeşil çay\n• 1 adet çubuk tarçın\n• 5-6 adet çiğ badem",
      icon: <Leaf className="text-orange-500" size={36} />
    };
  }
  // 5. AKŞAM YEMEĞİ (18:00 - 20:30)
  else if (timeVal >= 18 && timeVal <= 20.5) {
    content = {
      label: "AKŞAM YEMEĞİ",
      menu: "Hafif ama doyurucu: Sebze yemeği veya ızgara balık + yoğurt. bu kadar zenginliğe gerek yok balık yoktur kesin ha onun için akşam ne yaptıysan ondan yarım porsiyon ye",
      drink: "Bol Su",
      detox: "Gece Yağ Yakımı:\n• 1 fincan beyaz çay\n• Limon dilimi",
      icon: <Utensils className="text-orange-500" size={36} />
    };
  }
  // 6. AKŞAMI KAÇIRANLAR (20:30 - 23:00)
  else if (timeVal > 20.5 && timeVal < 23) {
    content = {
      label: "AKŞAMI KAÇIRDIN!",
      menu: "Akşam yemeğini kaçırdın! Bu saatten sonra ağır yemek yok, günü kapatıyoruz.",
      drink: "1 bardak kefir veya bitki çayı",
      detox: "Acil Durum:\n• 1 bardak ılık suya yarım limon\n• Vücudunu dinlendir.",
      icon: <Ban className="text-orange-500" size={36} />
    };
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 flex flex-col items-center justify-center font-sans">
      <div className="max-w-md w-full text-center">
        <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-500 mb-6 hover:text-white transition-all mx-auto">
          <ArrowLeft size={18} /> Geri Dön
        </button>

        <div className="p-[1px] rounded-[40px] bg-gradient-to-b from-orange-500/40 to-transparent shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)]">
          <div className="bg-[#0a0a0a] rounded-[39px] p-8 border border-white/5">
            <div className="flex justify-center mb-6 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              {content.icon}
            </div>
            
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-1 leading-none">{content.label}</h2>
            <p className="text-slate-500 text-[11px] font-bold mb-8 italic uppercase tracking-widest">
              SİSTEM SAATİ: {timeStr}
            </p>

            <div className="space-y-4 text-left">
              <div className="bg-[#111111] p-5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-orange-500 uppercase mb-2">NE YİYELİM?</p>
                <p className="text-base font-bold italic text-slate-200">{content.menu}</p>
              </div>

              <div className="bg-[#111111] p-5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-orange-500 uppercase mb-2">NE İÇELİM?</p>
                <p className="text-base font-bold italic text-slate-200">{content.drink}</p>
              </div>

              <div className="p-6 bg-orange-500/5 rounded-2xl border border-orange-500/20 relative">
                <Leaf size={24} className="text-orange-500/10 absolute top-4 right-4" />
                <p className="text-[11px] font-black text-orange-500 uppercase mb-3 text-center">KOÇUN ÖZEL TARİFİ</p>
                <div className="text-[13px] font-medium text-slate-300 italic leading-relaxed space-y-2">
                  {content.detox.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('•') ? "pl-2" : "font-bold text-slate-100"}>
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
