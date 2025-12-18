"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Scale, Droplets, Utensils, Clock, Send, Bot } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>({ name: 'Sporcu', weight: '0' });
  const [currentTime, setCurrentTime] = useState("");
  
  const [chatInput, setChatInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) {
        setUser(storedUser);
        setAiResponse(`Selam ${storedUser.name}! Bugün mazeret yok, hedefine odaklanalım. Bana ne sormak istersin?`);
    }

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
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
      // ÖNEMLİ: Vercel'deki ismin bu olduğundan emin ol
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Sen sert bir spor koçusun. Sadece sağlık ve spor konuş. Kullanıcının adı ${user.name}. Soru: ${userMsg}` }] }]
          })
        }
      );

      const data = await response.json();
      setAiResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAiResponse("Koç şu an çevrimdışı, tekrar dene!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-4 md:p-8">
      {/* HEADER */}
      <nav className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <h1 className="text-orange-500 font-black italic uppercase tracking-tighter text-xl">FITPULSE AI</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => router.push('/pro')} className="bg-[#111] px-6 py-2 rounded-lg font-bold text-xs border border-white/10 uppercase">HESABIM</button>
          <LogOut className="text-slate-500 cursor-pointer" size={20} onClick={() => router.push('/')} />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter italic">SELAM, {user.name.toUpperCase()}! 👋</h2>
          <p className="text-orange-500 font-black italic mt-2 tracking-widest text-lg uppercase">MAZERET ÜRETME, HAREKETE GEÇ!</p>
          <div className="flex items-center gap-2 text-slate-500 mt-2 font-bold"><Clock size={16}/> {currentTime}</div>
        </div>

        {/* KARTLAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0f0f0f] p-10 rounded-[40px] border border-white/5 shadow-2xl">
            <Scale className="text-orange-500 mb-4" size={28} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">MEVCUT KILON</p>
            <h3 className="text-5xl font-black italic mt-2">{user.weight} kg</h3>
          </div>
          <div className="bg-[#0f0f0f] p-10 rounded-[40px] border border-white/5 shadow-2xl">
            <Droplets className="text-blue-500 mb-4" size={28} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">SU HEDEFİ</p>
            <h3 className="text-5xl font-black italic mt-2">3L</h3>
          </div>
          <div className="bg-[#0f0f0f] p-10 rounded-[40px] border border-white/5 shadow-2xl flex flex-col justify-between items-start">
            <Utensils className="text-emerald-500 mb-4" size={28} />
            <button onClick={() => router.push('/diet')} className="w-full bg-white text-black py-4 rounded-2xl font-black italic uppercase text-xs tracking-widest">DİYETİ GÖR</button>
          </div>
        </div>

        {/* AI COACH */}
        <div className="bg-[#0f0f0f] p-8 md:p-12 rounded-[50px] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
             <div className="bg-orange-500 p-3 rounded-2xl text-black"><Bot size={24}/></div>
             <h3 className="font-black italic text-xl uppercase tracking-tighter text-white">AI SAĞLIK KOÇU</h3>
          </div>
          <div className="bg-black/60 p-8 rounded-[30px] mb-8 border border-white/5 min-h-[120px] flex items-center">
             <p className="text-slate-300 italic font-medium text-lg leading-relaxed">"{aiResponse}"</p>
          </div>
          <div className="relative">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
              placeholder="Bir soru sor..."
              className="w-full bg-black border border-white/10 rounded-3xl px-8 py-6 font-bold text-white focus:outline-none focus:border-orange-500 transition-all shadow-inner"
            />
            <button onClick={handleAiChat} className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-500 text-black p-4 rounded-2xl hover:bg-orange-400 transition-all">
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

