"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Scale, Droplets, Utensils, Clock, Send, Bot, Eye, Lock } from 'lucide-react';

const translations: any = {
  TR: { welcome: "SELAM", weight: "MEVCUT KILON", water: "SU HEDEFİ", diet: "DİYET", coach: "AI SAĞLIK KOÇU", account: "HESABIM", nextWater: "Sıradaki Su", moto: "MAZERET ÜRETME, HAREKETE GEÇ!" },
  EN: { welcome: "HELLO", weight: "CURRENT WEIGHT", water: "WATER GOAL", diet: "DIET", coach: "AI HEALTH COACH", account: "MY ACCOUNT", nextWater: "Next Water", moto: "NO EXCUSES, TAKE ACTION!" }
};

export default function Dashboard() {
  const router = useRouter();
  const [lang, setLang] = useState('TR');
  const [user, setUser] = useState<any>({ name: 'Sporcu', weight: '0' });
  const [currentTime, setCurrentTime] = useState("");
  const [nextWaterTime, setNextWaterTime] = useState("08:30");
  const [chatInput, setChatInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) setUser(storedUser);
    
    // Dil tercihini al (opsiyonel)
    const savedLang = localStorage.getItem('lang') || 'TR';
    setLang(savedLang);

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeStr);

      // Su Sayacı Mantığı
      const waterSchedule = ["08:30", "11:00", "14:30", "17:00", "20:00", "22:00"];
      const next = waterSchedule.find(t => t > timeStr) || waterSchedule[0];
      setNextWaterTime(next);
    }, 1000);

    setAiResponse(translations[lang].welcome + " " + (storedUser.name || 'Sporcu') + "! Bugün hedefine odaklanalım.");

    return () => clearInterval(timer);
  }, [lang]);

  const handleAiChat = async () => {
    if (!chatInput || isLoading) return;
    const userMsg = chatInput;
    setChatInput("");
    setIsLoading(true);
    setAiResponse("Koç analiz ediyor...");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Sen sert bir spor koçusun. Sadece sağlık ve spor konuş. Dil: ${lang}. Kullanıcı: ${user.name}. Soru: ${userMsg}` }] }]
          })
        }
      );
      const data = await response.json();
      setAiResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAiResponse("Koç meşgul, mazeret yok tekrar dene!");
    } finally {
      setIsLoading(false);
    }
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-4 md:p-8">
      <nav className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <h1 className="text-orange-500 font-black italic uppercase tracking-tighter text-xl">FITPULSE AI</h1>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => { const newLang = lang === 'TR' ? 'EN' : 'TR'; setLang(newLang); localStorage.setItem('lang', newLang); }}
            className="text-[10px] font-bold border border-white/20 px-2 py-1 rounded hover:bg-white/10"
          >
            {lang}
          </button>
          <button onClick={() => router.push('/pro')} className="bg-[#111] px-6 py-2 rounded-lg font-bold text-xs border border-white/10 uppercase">{t.account}</button>
          <LogOut className="text-slate-500 cursor-pointer" size={20} onClick={() => router.push('/')} />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto text-left">
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
            {t.welcome}, {user.name.toUpperCase()}! 👋
          </h2>
          <p className="text-orange-500 font-black italic mt-2 tracking-widest text-lg uppercase">{t.moto}</p>
          <div className="flex items-center gap-2 text-slate-500 mt-2 font-bold text-sm"><Clock size={16}/> {currentTime}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0f0f0f] p-10 rounded-[40px] border border-white/5 shadow-2xl">
            <Scale className="text-orange-500 mb-4" size={28} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.weight}</p>
            <h3 className="text-5xl font-black italic mt-2">{user.weight} kg</h3>
          </div>
          
          <div className="bg-[#0f0f0f] p-10 rounded-[40px] border border-white/5 shadow-2xl relative">
            <Droplets className="text-blue-500 mb-4" size={28} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.water}</p>
            <h3 className="text-5xl font-black italic mt-2">3L</h3>
            <p className="text-[10px] text-blue-400 font-bold mt-2 uppercase italic">{t.nextWater}: {nextWaterTime}</p>
          </div>

          <div className="bg-[#0f0f0f] p-10 rounded-[40px] border border-white/5 shadow-2xl flex flex-col justify-between">
            <Utensils className="text-emerald-500 mb-4" size={28} />
            <button onClick={() => router.push('/diet')} className="w-full bg-white text-black py-4 rounded-2xl font-black italic uppercase text-xs tracking-widest">
              {t.diet.toUpperCase()}İ GÖR
            </button>
          </div>
        </div>

        <div className="bg-[#0f0f0f] p-8 md:p-12 rounded-[50px] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
             <div className="bg-orange-500 p-3 rounded-2xl text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]"><Bot size={24}/></div>
             <h3 className="font-black italic text-xl uppercase tracking-tighter">{t.coach}</h3>
          </div>
          <div className="bg-black/60 p-8 rounded-[30px] mb-8 border border-white/5 min-h-[120px] flex items-center shadow-inner">
             <p className="text-slate-300 italic font-medium text-lg leading-relaxed">"{aiResponse}"</p>
          </div>
          <div className="relative">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
              placeholder={lang === 'TR' ? "Bir soru sor..." : "Ask a question..."}
              className="w-full bg-black border border-white/10 rounded-3xl px-8 py-6 font-bold text-white focus:outline-none focus:border-orange-500 transition-all shadow-inner"
            />
            <button onClick={handleAiChat} className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-500 text-black p-4 rounded-2xl hover:bg-orange-400 transition-all shadow-lg">
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


