"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Heart, ArrowRight } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1); // 1: Kayıt, 2: Profil, 3: Mektup
  const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '', weight: '', height: '', blood: '0 Rh+' });
  const router = useRouter();

  // İlk buton (E-posta/Şifre sonrası)
  const handleNext = (e: any) => {
    e.preventDefault();
    setStep(2); // Sayfa değiştirmez, sadece ekranı Profil formuna çevirir.
  };

  // İkinci buton (Profil sonrası)
  const handleFinish = (e: any) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData));
    setStep(3); // Ekranı AI Mektubuna çevirir.
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      
      {/* ADIM 1: KAYIT (Şu anki ekranın) */}
      {step === 1 && (
        <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
          <h2 className="text-3xl font-black mb-2 text-center italic">FitPulse AI</h2>
          <p className="text-slate-500 mb-8 text-center font-medium">Değişim yolculuğuna ilk adım.</p>
          <form onSubmit={handleNext} className="space-y-4">
            <input type="email" placeholder="E-posta Adresin" className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-pink-500" required onChange={(e)=>setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Şifre Belirle" className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-pink-500" required onChange={(e)=>setFormData({...formData, password: e.target.value})} />
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 italic uppercase">
              Devam Et <ArrowRight size={20} />
            </button>
          </form>
        </div>
      )}

      {/* ADIM 2: PROFİL BİLGİLERİ (Butona basınca burası açılacak) */}
      {step === 2 && (
        <div className="max-w-xl w-full bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 animate-in slide-in-from-right duration-500">
          <h2 className="text-3xl font-bold mb-6 italic flex items-center gap-2">
            <User className="text-pink-500" /> Profilini Tamamla
          </h2>
          <form onSubmit={handleFinish} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-pink-500" placeholder="Adın Soyadın" required onChange={(e)=>setFormData({...formData, name: e.target.value})} />
            </div>
            <input type="number" className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-orange-500" placeholder="Yaşın" required onChange={(e)=>setFormData({...formData, age: e.target.value})} />
            <input type="number" className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-blue-500" placeholder="Kilon (kg)" required onChange={(e)=>setFormData({...formData, weight: e.target.value})} />
            <input type="number" className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-purple-500" placeholder="Boyun (cm)" required onChange={(e)=>setFormData({...formData, height: e.target.value})} />
            <select className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-red-500" onChange={(e)=>setFormData({...formData, blood: e.target.value})}>
              <option>0 Rh+</option><option>A Rh+</option><option>B Rh+</option><option>AB Rh+</option>
            </select>
            <button type="submit" className="col-span-2 mt-4 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl italic uppercase">
              PROFİLİ KAYDET VE ANALİZ ET
            </button>
          </form>
        </div>
      )}

      {/* ADIM 3: AI MOTİVASYON MEKTUBU */}
      {step === 3 && (
        <div className="max-w-xl w-full bg-gradient-to-br from-pink-500 to-orange-500 p-1.5 rounded-[45px] shadow-2xl animate-in zoom-in duration-500">
          <div className="bg-white p-10 rounded-[40px] text-center">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500">
              <Heart size={44} fill="currentColor" />
            </div>
            <h2 className="text-3xl font-black mb-6 italic">Merhaba {formData.name},</h2>
            <div className="text-slate-600 leading-relaxed space-y-5 mb-10 text-left font-medium italic">
              <p>Şu an {formData.weight} kilo ve {formData.age} yaşındasın. Seninle ilgili tüm verileri analiz ettim.</p>
              <p>Belki şimdiye kadar defalarca denedin ve vazgeçtin... Ama şunu bil: Ben senin sadece antrenörün değil, yol arkadaşınım.</p>
              <p className="text-pink-600 font-bold text-lg text-center bg-pink-50 p-4 rounded-2xl">Bu sefer başaracağız, çünkü ben hep yanındayım! 💪</p>
            </div>
            <button onClick={() => router.push('/dashboard')} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl uppercase italic">
              Maceraya Başla!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}