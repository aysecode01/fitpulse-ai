"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Scale, Droplets, Utensils, Clock, Flame, CheckCircle2, Eye, Lock, Plus } from 'lucide-react';

const translations: any = {
  TR: { welcome: "Selam", weight: "Mevcut Kilon", water: "Su Hedefi", diet: "Diyet", steps: "Adım Sayar", account: "HESABIM", start: "ANTRENMANI BAŞLAT", rest: "DİNLENME VAKTİ", preview: "ÖN İZLEME", nextWater: "Sıradaki Su", days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'] },
};

export default function Dashboard() {
  const router = useRouter();
  const [lang] = useState('TR');
  const [user, setUser] = useState<any>({ name: 'Leman', weight: '100' });
  const [steps, setSteps] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [isTrainingTime, setIsTrainingTime] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [nextWaterTime, setNextWaterTime] = useState("08:30");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) setUser(storedUser);
    
    // Kayıtlı adımları getir
    const savedSteps = localStorage.getItem('dailySteps');
    if (savedSteps) setSteps(parseInt(savedSteps));

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

  const addSteps = () => {
    const newSteps = steps + 500;
    setSteps(newSteps);
    localStorage.setItem('dailySteps', newSteps.toString());
  };

  const t = translations[lang] || translations.TR;
  const currentDay = new Date().getDay(); // 0: Pazar, 1: Pzt...

  // Koçun dinamik mesajları
  const getCoachMessage = () => {
    const hour = new Date().getHours();
    if (steps < 1000 && hour > 10) return "Hala bin adım bile atmadın mı? Derhal kalk o koltuktan!";
    if (steps > 5000) return "Güzel gidiyorsun ama yetmez, devam!";
    if (hour >= 23) return "Bu saatte ayakta olman yağ yakımını durdurur. Doğru yatağa!";
    return "Hedeflerine odaklan, mazeret üretme!";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      <nav className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50 h-16 md:h-20 flex items-center px-4 md:px-8 justify-between">
        <h1 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-orange-500">FitPulse AI</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => router.push('/pro')} className="px-3 py-1.5 md:px-5 md:py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] md:text-sm font-bold hover:bg-orange-500 hover:text-black transition-all uppercase">
            {t.account}
          </button>
          <button onClick={() => router.push('/')} className="p-2 text-slate-500 hover:text-red-500"><LogOut size={18} /></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="w-full">
            <h2 className="text-3xl md:text-6xl font-black italic uppercase leading-tight tracking-tighter">
              {t.welcome}, {user.name}! 👋
            </h2>
            <p className="text-orange-500 font-bold mt-2 italic text-sm md:text-lg uppercase tracking-widest animate-pulse">
              {getCoachMessage()}
            </p>
            <div className="mt-2 text-slate-500 font-bold flex items-center gap-2 text-sm"><Clock size={14}/> {currentTime}</div>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3">
            {isTrainingTime ? (
              <button onClick={() => router.push('/exercises')} className="w-full md:w-auto px-8 py-5 md:px-12 md:py-6 bg-orange-500 text-black font-black rounded-[20px] md:rounded-[25px] shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-105 transition-all uppercase italic text-lg md:text-xl animate-bounce">
                {t.start}
              </button>
            ) : (
              <>
                <div className="w-full md:w-auto px-6 py-4 bg-[#111] border border-white/10 rounded-[20px] text-slate-500 font-black italic uppercase flex items-center justify-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  {t.rest}
                </div>
                <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 text-orange-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-all underline underline-offset-8">
                  <Eye size={14} /> {t.preview}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Kilo Kartı */}
          <div className="bg-[#0f0f0f] border border-white/5 p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl hover:border-orange-500/30 transition-all">
            <Scale className="text-orange-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.weight}</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1">{user.weight} kg</h3>
          </div>

          {/* Su Kartı */}
          <div className="bg-[#0f0f0f] border border-white/5 p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl hover:border-blue-500/30 transition-all">
            <Droplets className="text-blue-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.water}</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1">3L</h3>
            <div className="mt-2 text-[9px] font-bold text-blue-400 italic uppercase tracking-tighter">💧 {t.nextWater}: {nextWaterTime}</div>
          </div>

          {/* Diyet Kartı - CANLI DURUM EKLENDİ */}
          <div className="bg-[#0f0f0f] border border-white/5 p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl hover:border-emerald-500/30 transition-all">
            <Utensils className="text-emerald-500 mb-4" size={24} />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">GÜNCEL ÖĞÜN</p>
            <p className="text-xs font-bold text-white italic mt-1 uppercase">Menüye Göz At!</p>
            <button onClick={() => router.push('/diet')} className="mt-4 w-full py-3 bg-white text-black font-black rounded-xl text-[10px] tracking-widest hover:bg-emerald-500 transition-all uppercase shadow-lg">DİYETİ GÖR</button>
          </div>

          {/* Adım Sayar - MANUEL EKLEME EKLENDİ */}
          <div className="bg-[#0f0f0f] border border-white/5 p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl hover:border-yellow-500/30 transition-all group">
            <div className="flex justify-between items-start">
              <Flame className="text-yellow-500 mb-4" size={24} />
              <button onClick={addSteps} className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all">
                <Plus size={16} />
              </button>
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.steps}</p>
            <h3 className="text-3xl md:text-4xl font-black italic mt-1 text-yellow-500">{steps}</h3>
            <p className="text-[9px] text-slate-600 mt-2 font-bold italic uppercase tracking-tighter">+500 ADIM EKLE</p>
          </div>
        </div>

        {/* Haftalık Takvim - BUGÜNÜ İŞARETLER */}
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

        {/* Ön İzleme Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#111] p-6 md:p-10 rounded-[30px] md:rounded-[50px] border border-white/10 relative shadow-[0_0_100px_rgba(249,115,22,0.1)]">
              <button onClick={() => setShowPreview(false)} className="absolute top-6 right-6 text-slate-500 font-black hover:text-white transition-all">KAPAT</button>
              <h3 className="text-xl md:text-2xl font-black italic uppercase mb-6 text-orange-500 tracking-tighter">PROGRAM ÖN İZLEME</h3>
              <div className="space-y-3 opacity-50 grayscale">
                {["Isınma - 5 Dakika", "Squat - 3x15", "Şınav - 3x10", "Plank - 60 Sn"].map((ex, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl flex justify-between items-center text-sm md:text-base border border-white/5">
                    <span className="font-bold italic">{ex}</span>
                    <Lock size={14}/>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[10px] text-center font-bold text-slate-500 uppercase italic leading-relaxed">Antrenman saati geldiğinde koçun burada olacak.<br/>Şimdilik dinlenmeye devam et!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
