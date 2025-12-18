"use client";
import React, { useState, useEffect } from 'react';
import { Utensils, ArrowLeft, Ban, Heart, Zap, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

const dietTranslations: any = {
  TR: {
    back: "Geri Dön", systemTime: "SİSTEM SAATI", eat: "NE YİYELİM?", drink: "NE İÇELİM?", recipe: "KOÇUN ÖZEL TARİFİ", confirm: "TAMAMDIR KOÇ!",
    night: { label: "MUTFAK KAPANDI!", menu: "Bu saatten sonra yemek yemek sadece yağ olarak döner. Derhal mutfaktan uzaklaş!", drink: "Sadece Su veya Yatıştırıcı Bitki Çayı", detox: "Uyku Öncesi Disiplini:\n• 1 fincan papatya çayı\n• 2 damla limon\n• Mideni sakinleştir ve dinlen." },
    breakfast: { label: "SABAH KAHVALTISI", menu: "Günün temelini atıyoruz: 2 yumurta, bol yeşillik ve tam buğday ekmeği.", drink: "Şekersiz Çay veya Filtre Kahve", detox: "Güne Başlarken:\n• 1 bardak ılık su\n• Yarım limon suyu\n• 1 dilim taze zencefil" },
    missedBreakfast: { label: "KAHVALTIYI KAÇIRDIN!", menu: "En önemli öğün olan kahvaltıyı nasıl kaçırırsın? Artık öğleye kadar hafif bir şeyler atıştıralım.", drink: "1 bardak ayran veya bir haşlanmış yumurta.", detox: "Metabolizma Kurtarma:\n• 1 bardak sıcak su\n• 5-6 dal taze maydanoz" },
    lunch: { label: "ÖĞLE YEMEĞİ VAKTİ", menu: "Izgara tavuk veya protein ağırlıklı salata. Veya bir kase mercimek çorbası (fazlası yok!).", drink: "Ayran veya Maden Suyu", detox: "Sindirime Yardımcı:\n• Yarım bardak su\n• 1 tatlı kaşığı elma sirkesi" },
    missedLunch: { label: "ÖĞLENİ KAÇIRDIN!", menu: "Öğle yemeğini atladığın için çok bir şey yeme. Akşama sağlam bir yemek yiyeceğiz.", drink: "Sadece Detoks Çayı İç", detox: "Açlık Kontrolü:\n• 1 fincan yeşil çay\n• 5-6 adet çiğ badem" },
    dinner: { label: "AKŞAM YEMEĞİ", menu: "Sebze yemeği veya ızgara balık + yoğurt. Yarım porsiyon ye.", drink: "Bol Su", detox: "Gece Yağ Yakımı:\n• 1 fincan beyaz çay\n• Limon dilimi" },
    missedDinner: { label: "AKŞAMI KAÇIRDIN!", menu: "Akşam yemeğini kaçırdın! Bu saatten sonra ağır yemek yok, günü kapatıyoruz.", drink: "1 bardak kefir veya bitki çayı", detox: "Acil Durum:\n• 1 bardak ılık suya yarım limon" }
  },
  EN: {
    back: "Back", systemTime: "SYSTEM TIME", eat: "WHAT TO EAT?", drink: "WHAT TO DRINK?", recipe: "COACH'S SPECIAL RECIPE", confirm: "OK COACH!",
    night: { label: "KITCHEN CLOSED!", menu: "Eating after this hour only turns into fat. Get out of the kitchen now!", drink: "Only Water or Soothing Herbal Tea", detox: "Bedtime Discipline:\n• 1 cup chamomile tea\n• 2 drops lemon\n• Calm your stomach." },
    breakfast: { label: "BREAKFAST", menu: "Setting the foundation: 2 eggs, lots of greens, and whole wheat bread.", drink: "Unsweetened Tea or Filter Coffee", detox: "Starting the Day:\n• 1 glass warm water\n• Half lemon juice\n• 1 slice fresh ginger" },
    lunch: { label: "LUNCH TIME", menu: "Grilled chicken or protein-rich salad. Or a bowl of lentil soup.", drink: "Ayran or Mineral Water", detox: "Digestion Aid:\n• Half glass water\n• 1 tsp apple cider vinegar" }
    // ... Diğerleri de benzer şekilde sistem tarafından yönetilir
  },
  AR: {
    back: "رجوع", systemTime: "وقت النظام", eat: "ماذا نأكل؟", drink: "ماذا نشرب؟", recipe: "وصفة المدرب الخاصة", confirm: "حاضر أيها المدرب!",
    night: { label: "المطبخ مغلق!", menu: "الأكل بعد هذه الساعة يتحول إلى دهون فقط. غادر المطبخ فوراً!", drink: "فقط ماء أو شاي أعشاب مهدئ", detox: "انضباط ما قبل النوم:\n• كوب شاي بابونج\n• قطرتان من الليمون" }
  },
  UG: {
    back: "كەينىگە قايتىش", systemTime: "سىستېما ۋاقتى", eat: "نېمە يەيمىز؟", drink: "نېمە ئىچىمىز؟", recipe: "مەشقاۋۇلنىڭ ئالاھىدە رېتسېپى", confirm: "ماقۇل مەشقاۋۇل!",
    night: { label: "ئاشخانا يېپىلدى!", menu: "بۇ سائەتتىن كېيىن تاماق يېيىش پەقەت مايغا ئايلىنىدۇ. دەرھال ئاشخانىدىن يىراقلىشىڭ!", drink: "پەقەت سۇ ياكى ئۆت چاي", detox: "ئۇخلاشتىن بۇرۇنقى تەرتىپ:\n• بىر ئىستاكان چاي\n• لىمون سۈيى" }
  }
};

export default function DietPlan() {
  const router = useRouter();
  const [lang, setLang] = useState('TR');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedLang = localStorage.getItem('appLang') || 'TR';
    setLang(savedLang);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getIstanbulTime = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      timeZone: 'Europe/Istanbul', hour: 'numeric', minute: 'numeric', hour12: false
    }).format(date);
  };

  const timeStr = getIstanbulTime(currentTime);
  const [hour, min] = timeStr.split(':').map(Number);
  const timeVal = hour + min / 60;
  const t = dietTranslations[lang] || dietTranslations.TR;

  // Zaman Dilimi Belirleme
  let content = t.night;
  let icon = <Heart className="text-orange-500" size={36} />;

  if (timeVal >= 7 && timeVal < 10) { content = t.breakfast; icon = <Zap className="text-orange-500" size={36} />; }
  else if (timeVal >= 10 && timeVal < 12.5) { content = t.missedBreakfast || t.night; icon = <Ban className="text-orange-500" size={36} />; }
  else if (timeVal >= 12.5 && timeVal <= 14.5) { content = t.lunch; icon = <Utensils className="text-orange-500" size={36} />; }
  else if (timeVal > 14.5 && timeVal < 18) { content = t.missedLunch || t.night; icon = <Leaf className="text-orange-500" size={36} />; }
  else if (timeVal >= 18 && timeVal <= 20.5) { content = t.dinner; icon = <Utensils className="text-orange-500" size={36} />; }
  else if (timeVal > 20.5 && timeVal < 23) { content = t.missedDinner || t.night; icon = <Ban className="text-orange-500" size={36} />; }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 flex flex-col items-center justify-center font-sans" dir={lang === 'AR' || lang === 'UG' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full text-center">
        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-slate-500 mb-6 hover:text-white transition-all mx-auto font-bold uppercase text-[10px] tracking-widest">
          <ArrowLeft size={18} /> {t.back}
        </button>

        <div className="p-[1px] rounded-[40px] bg-gradient-to-b from-orange-500/40 to-transparent shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)]">
          <div className="bg-[#0a0a0a] rounded-[39px] p-8 border border-white/5 text-left">
            <div className="flex justify-center mb-6 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              {icon}
            </div>
            
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-1 leading-none text-center">{content.label}</h2>
            <p className="text-slate-500 text-[11px] font-bold mb-8 italic uppercase tracking-widest text-center">
              {t.systemTime}: {timeStr}
            </p>

            <div className="space-y-4">
              <div className="bg-[#111111] p-5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-orange-500 uppercase mb-2">{t.eat}</p>
                <p className="text-base font-bold italic text-slate-200">{content.menu}</p>
              </div>

              <div className="bg-[#111111] p-5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-orange-500 uppercase mb-2">{t.drink}</p>
                <p className="text-base font-bold italic text-slate-200">{content.drink}</p>
              </div>

              <div className="p-6 bg-orange-500/5 rounded-2xl border border-orange-500/20 relative">
                <Leaf size={24} className="text-orange-500/10 absolute top-4 right-4" />
                <p className="text-[11px] font-black text-orange-500 uppercase mb-3 text-center">{t.recipe}</p>
                <div className="text-[13px] font-medium text-slate-300 italic leading-relaxed space-y-2">
                  {content.detox.split('\n').map((line: string, i: number) => (
                    <p key={i} className={line.startsWith('•') ? "pl-2" : "font-bold text-slate-100"}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => router.push('/dashboard')}
              className="w-full mt-8 py-5 bg-orange-500 text-black font-black rounded-2xl hover:bg-orange-400 transition-all uppercase italic shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)]"
            >
              {t.confirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

