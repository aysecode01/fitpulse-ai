"use client";
import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Exercises() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  // Zamana göre video setleri
  const getDailyProgram = () => {
    const hour = new Date().getHours();
    if (hour < 12) return [
      { title: "Sabah Isınma", url: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { title: "Enerji Yükleme", url: "https://www.youtube.com/embed/AnYl6Nk9GOA" },
      { title: "Güne Merhaba", url: "https://www.youtube.com/embed/2MoGxae-zyo" }
    ];
    return [
      { title: "Akşam Yağ Yakımı", url: "https://www.youtube.com/embed/AnYl6Nk9GOA" },
      { title: "Kas Gevşetme", url: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { title: "Gece Yogası", url: "https://www.youtube.com/embed/2MoGxae-zyo" }
    ];
  };

  const playlist = getDailyProgram();

  const handleNext = () => {
    if (!completedExercises.includes(activeTab)) {
      setCompletedExercises([...completedExercises, activeTab]);
    }
    if (activeTab < playlist.length - 1) {
      setActiveTab(activeTab + 1);
    } else {
      alert("Tebrikler! Antrenmanı Tamamladın. Panele Yönlendiriliyorsun.");
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white"><ArrowLeft size={20} /> Antrenmandan Çık</Link>
        <h1 className="text-2xl font-black italic uppercase italic tracking-tighter">AI Koç Canlı Yayında</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-[35px] overflow-hidden border-4 border-white/5">
            <iframe className="w-full h-full" src={playlist[activeTab].url} allowFullScreen></iframe>
          </div>
          <div className="mt-8 p-8 bg-orange-500 text-black rounded-3xl flex justify-between items-center">
             <div>
               <h4 className="font-black text-2xl uppercase italic">{playlist[activeTab].title}</h4>
               <p className="font-bold opacity-70 italic">Bu egzersizi bitirmeden diğerine geçemezsin!</p>
             </div>
             <button onClick={handleNext} className="bg-black text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all uppercase italic">
               {activeTab === playlist.length - 1 ? "ANTRENMANI BİTİR" : "SONRAKİ HAREKET"}
             </button>
          </div>
        </div>

        <div className="space-y-4">
          {playlist.map((item, index) => (
            <div 
              key={index}
              className={`w-full p-6 rounded-[30px] flex items-center justify-between border transition-all ${activeTab === index ? 'bg-white text-black scale-105' : 'bg-white/5 border-white/10 opacity-50'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">
                  {completedExercises.includes(index) ? <CheckCircle size={16} /> : index + 1}
                </div>
                <span className="font-black italic uppercase text-sm">{item.title}</span>
              </div>
              {index > activeTab && !completedExercises.includes(index) && <Lock size={16} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}