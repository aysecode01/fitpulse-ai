"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Scale, Droplets, Utensils, Clock, Eye, Lock, Send, Bot, Flame, CheckCircle2 } from 'lucide-react';

const translations: any = {
  TR: { welcome: "Selam", weight: "Mevcut Kilon", water: "Su Hedefi", diet: "Diyet", aiCoach: "AI SAĞLIK KOÇU", account: "HESABIM", start: "ANTRENMANI BAŞLAT", rest: "DİNLENME VAKTİ", preview: "ÖN İZLEME", nextWater: "Sıradaki Su", days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'] },
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>({ name: 'Leman', weight: '100' });
  const [currentTime, setCurrentTime] = useState("");
  const [isTrainingTime, setIsTrainingTime] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [nextWaterTime, setNextWaterTime] = useState("08:30");
  
  // AI Chat State
  const [chatInput, setChatInput] = useState("");
  const [aiResponse, setAiResponse] = useState("Selam Leman! Bugün nasılsın? Bana sağlık veya sporla ilgili her şeyi sorabilirsin.");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) setUser(storedUser);

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeStr);

      const active = (timeStr >= "09:00" && timeStr <= "10:30") || (timeStr >= "13:30" && timeStr <= "15:00") || (timeStr >= "19:00" && timeStr <= "20:30");
      setIsTrainingTime(active);

      const waterSchedule = ["08:30", "11:00", "14:30", "17:00", "20:00", "22:00"];
      const next = waterSchedule.find(t => t > timeStr) || waterSchedule[0];
      setNextWaterTime(next);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAiChat = async () => {
    if (!chatInput || isLoading) return;
    
    const userMsg = chatInput;
    setChatInput("");
    setIsLoading(true);
    setAiResponse("Koç analiz ediyor... Bekle!");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: `Sen disiplinli, biraz sert ama motive edici bir spor koçusun. Adın FitPulse AI. Sadece sağlık, diyet ve spor konularında kısa cevaplar ver. Diğer konuları reddet. Kullanıcı adı: ${user.name}. Soru: ${userMsg}` 
              }] 
            }]
          })
        }
      );

      const data = await response.json();
      const botReply = data.candidates[0].content.parts[0].text;
      setAiResponse(botReply);
    } catch (error) {
      setAiResponse("Mazeret yok! Bağlantıda bir sorun oldu, tekrar dene.");
    } finally {
      setIsLoading(false);
    }
  };

  const t = translations.TR;
  const currentDay = new Date().getDay();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* NAV */}
      <nav className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50 h-16 md:h-20 flex items-center px-4 md:px-8 justify-between">
        <h1 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-orange-500">FitPulse AI</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => router.push('/pro')} className="px-3 py-1.5 md:px-5 md:py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] md:text-sm font-bold hover:bg-orange-500 hover:text-black transition-all uppercase">{t.account}</button>
          <button onClick={() => router.push('/')} className="p-2 text-slate-500 hover:text-red-500"><LogOut size={18} /></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* ÜST KISIM */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="w-full text-left">
            <h2 className="text-3xl md:text-6xl font-black italic uppercase leading-tight tracking-tighter">
              {t.welcome}, {user.name}! 👋
            </h2>
            <p className="text-orange-500 font-bold mt-2 italic text-sm md:text-lg uppercase tracking-widest animate-pulse">Hedeflerine odaklan, mazeret üretme!</p>
            <div className="mt-2 text-slate-500 font-bold flex items-center gap-2 text-sm"><Clock size={14}/> {currentTime}</div>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3">
            {isTrainingTime ? (
              <button onClick={() => router.push('/exercises')} className="w-full md:w-auto px-8 py-5 bg-orange-500 text-black font-black rounded-[20px] shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-105 transition-all uppercase italic text-lg animate-bounce">{t.start}</button>
            ) : (
              <>
                <div className="w-full md:w-auto px-6 py-4 bg-[#111] border border-white/10 rounded-[20px] text-slate-500 font-black italic uppercase flex items-center justify-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span> {t.rest}
                </div>
                <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 text-orange-500 hover:text-white font-bold text-xs uppercase transition-all underline underline-offset-8 italic"><Eye size={14} /> {t.preview}</button>
              </>
            )}
          </div>
        </div>

        {/* ÜÇLÜ KART SİSTEMİ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[30px] md:rounded-[40px] shadow-2xl">
            <Scale className="text-orange-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.weight}</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1">{user.weight} kg</h3>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[30px] md:rounded-[40px] shadow-2xl text-left">
            <Droplets className="text-blue-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.water}</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1">3L</h3>
            <div className="mt-2 text-[9px] font-bold text-blue-400 italic uppercase tracking-tighter">💧 {t.nextWater}: {nextWaterTime}</div>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[30px] md:rounded-[40px] shadow-2xl flex flex-col justify-between">
            <Utensils className="text-emerald-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest text-left">DİYET LİSTESİ</p>
            <button onClick={() => router.push('/diet')} className="w-full py-3 bg-white text-black font-black rounded-xl text-[10px] hover:bg-emerald-500 transition-all uppercase italic">DİYETİ GÖR</button>
          </div>
        </div>

        {/* AI CHAT KOÇU (Adım sayar yerine gelen dev alan) */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[30px] md:rounded-[40px] p-6 md:p-8 mb-8 shadow-2xl text-left relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              <Bot size={20} className="text-black" />
            </div>
            <h3 className="font-black italic text-lg uppercase tracking-tighter">AI SAĞLIK KOÇU</h3>
          </div>

          <div className="bg-black/40 border border-white/5 p-5 rounded-3xl mb-6 min-h-[100px] flex items-center relative z-10 transition-all">
            <p className="text-slate-300 italic font-medium text-sm md:text-base leading-relaxed">"{aiResponse}"</p>
          </div>

          <div className="flex gap-2 relative z-10">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
              placeholder="Koça bir şey sor..." 
              className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all"
            />
            <button onClick={handleAiChat} className="bg-orange-500 text-black p-4 rounded-2xl hover:bg-orange-400 transition-all">
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* TAKVİM */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[30px] md:rounded-[50px] p-6 md:p-10 shadow-2xl overflow-x-auto">
          <div className="flex justify-between min-w-[500px] md:min-w-0">
            {t.days.map((gun: string, i: number) => {
              const isToday = (i + 1) === currentDay || (currentDay === 0 && i === 6);
              return (
                <div key={i} className="text-center">
                  <p className={`text-[9px] md:text-[10px] font-black uppercase mb-3 italic ${isToday ? 'text-orange-500' : 'opacity-40'}`}>{gun}</p>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all ${isToday ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'border-white/5'}`}>
                    {isToday ? <Flame size={16} className="text-orange-500" /> : <CheckCircle2 size={16} className="opacity-10" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
