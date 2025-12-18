"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Scale, Droplets, Utensils, Clock, Eye, Lock, Send, Bot, Flame } from 'lucide-react';

const translations: any = {
  TR: { 
    welcome: "Selam", weight: "Mevcut Kilon", water: "Su Hedefi", diet: "Diyet", 
    coach: "AI SAĞLIK KOÇU", account: "HESABIM", start: "ANTRENMANI BAŞLAT", 
    rest: "DİNLENME VAKTİ", preview: "ÖN İZLEME", nextWater: "Sıradaki Su", 
    close: "Kapat", moto: "Hedeflerine odaklan, mazeret üretme!",
    exercises: ["Isınma - 5 Dakika", "Squat - 3x15", "Şınav - 3x10", "Plank - 60 Sn"],
    dietBtn: "DİYETİ GÖR"
  },
  EN: { 
    welcome: "Hello", weight: "Current Weight", water: "Water Goal", diet: "Diet", 
    coach: "AI HEALTH COACH", account: "ACCOUNT", start: "START WORKOUT", 
    rest: "REST TIME", preview: "PREVIEW", nextWater: "Next Water", 
    close: "Close", moto: "Focus on your goals, no excuses!",
    exercises: ["Warm-up - 5 Min", "Squat - 3x15", "Push-up - 3x10", "Plank - 60 Sec"],
    dietBtn: "VIEW DIET"
  },
  AR: { 
    welcome: "مرحباً", weight: "الوزن الحالي", water: "هدف الماء", diet: "النظام الغذائي", 
    coach: "مدرب الذكاء الاصطناعي", account: "حسابي", start: "ابدأ التمرين", 
    rest: "وقت الراحة", preview: "معاينة", nextWater: "الماء القادم", 
    close: "غلق", moto: "ركز على أهدافك ، لا أعذار!",
    exercises: ["الإحماء - 5 دقائق", "سكوات - 3x15", "تمرين الضغط - 3x10", "بلانك - 60 ثانية"],
    dietBtn: "عرض النظام الغذائي"
  },
  UG: { 
    welcome: "خۇش كەپسىز", weight: "ئېغىرلىق", water: "سۇ نىشانى", diet: "يېمەكلىك", 
    coach: "سۈنئىي ئىدراك مەشقاۋۇلى", account: "ھېساباتىم", start: "باشلاش", 
    rest: "ئارام ئېلىش", preview: "كۆرۈش", nextWater: "كېيىنكى سۇ", 
    close: "ياپ", moto: "نىشانىڭىزغا ئەھمىيەت بېرىڭ ، باھانە يوق!",
    exercises: ["ئىسسىنىش - 5 مىنۇت", "سكۋات - 3x15", "ئىتتىرىش - 3x10", "پلانك - 60 سېكۇنت"],
    dietBtn: "يېمەكلىك تىزىملىكى"
  }
};

export default function Dashboard() {
  const router = useRouter();
  const [lang, setLang] = useState('TR');
  const [user, setUser] = useState<any>({ name: 'Leman', weight: '100' });
  const [currentTime, setCurrentTime] = useState("");
  const [isTrainingTime, setIsTrainingTime] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [nextWaterTime, setNextWaterTime] = useState("08:30");
  const [chatInput, setChatInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('appLang') || 'TR';
    setLang(savedLang);
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) setUser(storedUser);

    setAiResponse(`${translations[savedLang].welcome} ${storedUser.name || 'Leman'}! 👋`);

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeStr);
      const active = (timeStr >= "09:00" && timeStr <= "10:30") || (timeStr >= "13:30" && timeStr <= "15:00") || (timeStr >= "19:00" && timeStr <= "20:30");
      setIsTrainingTime(active);
      const waterSchedule = ["08:30", "11:00", "14:30", "17:00", "20:00", "22:00"];
      setNextWaterTime(waterSchedule.find(t => t > timeStr) || waterSchedule[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLang = () => {
    const langs = ['TR', 'EN', 'AR', 'UG'];
    const next = langs[(langs.indexOf(lang) + 1) % langs.length];
    setLang(next);
    localStorage.setItem('appLang', next);
    setAiResponse(`${translations[next].welcome} ${user.name}! 👋`);
  };

  const handleAiChat = async () => {
    if (!chatInput || isLoading) return;
    const msg = chatInput; setChatInput(""); setIsLoading(true); setAiResponse("...");
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: `Sen sert bir spor koçusun. Dil: ${lang}. Kullanıcı: ${user.name}. Soru: ${msg}` }] }] })
      });
      const data = await response.json();
      setAiResponse(data.candidates[0].content.parts[0].text);
    } catch { setAiResponse("Bağlantı hatası!"); } finally { setIsLoading(false); }
  };

  const t = translations[lang] || translations.TR;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden" dir={lang === 'AR' || lang === 'UG' ? 'rtl' : 'ltr'}>
      <nav className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50 h-16 md:h-20 flex items-center px-4 md:px-8 justify-between">
        <h1 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-orange-500">FitPulse AI</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={toggleLang} className="px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 text-[10px] font-bold hover:bg-white/10">{lang}</button>
          <button onClick={() => router.push('/pro')} className="px-3 py-1.5 md:px-5 md:py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] md:text-sm font-bold hover:bg-orange-500 hover:text-black transition-all uppercase">{t.account}</button>
          <button onClick={() => router.push('/')} className="p-2 text-slate-500 hover:text-red-500"><LogOut size={18} /></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div className="w-full">
            <h2 className="text-3xl md:text-6xl font-black italic uppercase leading-tight tracking-tighter">{t.welcome}, {user.name}! 👋</h2>
            <p className="text-orange-500 font-bold mt-2 italic text-sm md:text-lg uppercase tracking-widest">{t.moto}</p>
            <div className="mt-2 text-slate-500 font-bold flex items-center gap-2 text-sm"><Clock size={14}/> {currentTime}</div>
          </div>
          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3">
            {isTrainingTime ? (
              <button onClick={() => router.push('/exercises')} className="w-full md:w-auto px-8 py-5 bg-orange-500 text-black font-black rounded-[20px] shadow-2xl hover:scale-105 transition-all uppercase italic text-lg">{t.start}</button>
            ) : (
              <>
                <div className="w-full md:w-auto px-6 py-4 bg-[#111] border border-white/10 rounded-[20px] text-slate-500 font-black italic uppercase flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span> {t.rest}
                </div>
                <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 text-orange-500 hover:text-white font-bold text-xs uppercase underline underline-offset-8 italic transition-all"><Eye size={14} /> {t.preview}</button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[30px] md:rounded-[40px] shadow-2xl">
            <Scale className="text-orange-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.weight}</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1">{user.weight} kg</h3>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[30px] md:rounded-[40px] shadow-2xl">
            <Droplets className="text-blue-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.water}</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1">3L</h3>
            <div className="mt-2 text-[9px] font-bold text-blue-400 italic uppercase">💧 {t.nextWater}: {nextWaterTime}</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[30px] md:rounded-[40px] shadow-2xl flex flex-col justify-between">
            <Utensils className="text-emerald-500 mb-4" size={24} />
            <button onClick={() => router.push('/diet')} className="w-full bg-white text-black py-4 rounded-2xl font-black italic uppercase text-xs tracking-widest">{t.dietBtn}</button>
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-white/5 rounded-[30px] md:rounded-[40px] p-6 md:p-8 shadow-2xl text-left">
          <div className="flex items-center gap-3 mb-6 font-black italic uppercase tracking-tighter text-lg">
            <Bot className="text-orange-500 shadow-orange-500/20" /> {t.coach}
          </div>
          <div className="bg-black/40 border border-white/5 p-5 rounded-3xl mb-6 min-h-[100px] flex items-center text-slate-300 italic">"{aiResponse}"</div>
          <div className="flex gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAiChat()} placeholder="..." className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-orange-500 outline-none transition-all" />
            <button onClick={handleAiChat} className="bg-orange-500 text-black p-4 rounded-2xl hover:bg-orange-400"><Send size={20} /></button>
          </div>
        </div>
      </main>

      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#111] p-10 rounded-[40px] border border-white/10 relative shadow-2xl">
            <button onClick={() => setShowPreview(false)} className="absolute top-6 right-8 text-slate-500 font-black hover:text-white uppercase text-[10px] tracking-widest">{t.close}</button>
            <h3 className="text-2xl font-black italic uppercase mb-8 text-orange-500 tracking-tighter text-left">{t.preview}</h3>
            <div className="space-y-4 opacity-50 grayscale text-left">
              {t.exercises.map((ex: string, i: number) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl flex justify-between items-center border border-white/5"><span className="font-bold italic text-sm">{ex}</span><Lock size={14}/></div>
              ))}
            </div>
            <p className="mt-8 text-[10px] text-center font-bold text-slate-500 uppercase italic">
                {lang === 'TR' ? "Saatinde gel, kilitleri açalım!" : lang === 'EN' ? "Come on time, let's unlock!" : "..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
