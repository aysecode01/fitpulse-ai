"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Scale, Droplets, Utensils, Clock, Eye, Send, Bot, Flame, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>({ name: 'Sporcu', weight: '0' });
  const [currentTime, setCurrentTime] = useState("");
  const [nextWaterTime, setNextWaterTime] = useState("08:30");
  
  // AI Chat State
  const [chatInput, setChatInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // KULLANICI İSMİNİ BURADA DİNAMİK ALIYORUZ
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) {
        setUser(storedUser);
        setAiResponse(`Selam ${storedUser.name}! Bugün mazeret yok, hedefine odaklanalım. Bana ne sormak istersin?`);
    } else {
        setAiResponse("Selam Sporcu! Bugün mazeret yok, hedefine odaklanalım.");
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
      // Vercel'e eklediğin NEXT_PUBLIC_GEMINI_API_KEY ismini kullandığından emin ol
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: `Sen disiplinli ve sert bir spor koçusun. Sadece sağlık ve spor konuş. Kullanıcının adı ${user.name}. Soru: ${userMsg}` 
              }] 
            }]
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]) {
        setAiResponse(data.candidates[0].content.parts[0].text);
      } else {
        setAiResponse("Koç şu an meşgul, mazeret üretme az sonra tekrar sor!");
      }
    } catch (error) {
      setAiResponse("Bağlantı koptu! Pes etme, tekrar sormayı dene.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentDay = new Date().getDay();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      <nav className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50 h-16 md:h-20 flex items-center px-4 md:px-8 justify-between">
        <h1 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-orange-500">FitPulse AI</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => router.push('/pro')} className="px-3 py-1.5 md:px-5 md:py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] md:text-sm font-bold hover:bg-orange-500 transition-all uppercase">HESABIM</button>
          <button onClick={() => router.push('/')} className="p-2 text-slate-500 hover:text-red-500"><LogOut size={18} /></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8 md:mb-12 text-left">
          <h2 className="text-3xl md:text-6xl font-black italic uppercase leading-tight tracking-tighter">
            SELAM, {user.name}! 👋
          </h2>
          <p className="text-orange-500 font-bold mt-2 italic text-sm md:text-lg uppercase tracking-widest animate-pulse">MAZERET ÜRETME, HAREKETE GEÇ!</p>
          <div className="mt-2 text-slate-500 font-bold flex items-center gap-2 text-sm"><Clock size={14}/> {currentTime}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px]">
            <Scale className="text-orange-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest text-left">MEVCUT KILON</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1 text-left">{user.weight} kg</h3>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px]">
            <Droplets className="text-blue-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest text-left">SU HEDEFİ</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1 text-left">3L</h3>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px] flex flex-col justify-between">
            <Utensils className="text-emerald-500 mb-4" size={24} />
            <button onClick={() => router.push('/diet')} className="w-full py-3 bg-white text-black font-black rounded-xl text-[10px] hover:bg-emerald-500 transition-all uppercase italic">DİYETİ GÖR</button>
          </div>
        </div>

        {/* AI CHAT ALANI */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[40px] p-6 md:p-8 mb-8 text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-black" />
            </div>
            <h3 className="font-black italic text-lg uppercase">AI SAĞLIK KOÇU</h3>
          </div>
          <div className="bg-black/40 border border-white/5 p-5 rounded-3xl mb-6 min-h-[100px] flex items-center">
            <p className="text-slate-300 italic font-medium leading-relaxed">"{aiResponse}"</p>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
              placeholder="Bir soru sor..." 
              className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all text-white"
            />
            <button onClick={handleAiChat} disabled={isLoading} className="bg-orange-500 text-black p-4 rounded-2xl hover:bg-orange-400 disabled:opacity-50">
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
