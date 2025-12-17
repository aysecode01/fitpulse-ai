"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, BellRing, Lock, Mail } from 'lucide-react';

export default function Settings() {
  const router = useRouter();
  const [lang, setLang] = useState('TR');
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setLang(localStorage.getItem('appLang') || 'TR');
  }, []);

  const saveSettings = () => {
    localStorage.setItem('appLang', lang);
    setMsg(lang === 'TR' ? "Kaydedildi! ✅" : "Saved! ✅");
    setTimeout(() => { router.push('/dashboard'); window.location.reload(); }, 1000);
  };

  const requestNotify = () => {
    Notification.requestPermission().then(p => { if (p === 'granted') alert('Bildirimler Açıldı!'); });
  };

  const isRTL = lang === 'AR' || lang === 'UG';

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 flex items-center justify-center font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full bg-[#111] p-10 rounded-[50px] border border-white/5 shadow-2xl">
        <button onClick={() => router.push('/dashboard')} className="mb-8 text-slate-500 hover:text-white transition-all">
          <ArrowLeft size={24} />
        </button>
        
        <h2 className="text-3xl font-black italic uppercase mb-10 tracking-tighter">
          {lang === 'TR' ? 'HESAP AYARLARI' : lang === 'EN' ? 'ACCOUNT SETTINGS' : lang === 'AR' ? 'إعدادات الحساب' : 'ھېسابات تەڭشەكلىرى'}
        </h2>

        <div className="space-y-6">
          <button onClick={requestNotify} className="w-full p-5 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-between group hover:bg-blue-600 transition-all font-bold italic">
            <span className="flex items-center gap-3"><BellRing size={20}/> {lang === 'TR' ? 'Bildirimler' : 'Notifications'}</span>
            <span className="text-[10px] bg-blue-500 text-white px-2 py-1 rounded-lg">ON</span>
          </button>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-slate-500 ml-2 flex items-center gap-2"><Globe size={14} /> LANGUAGE / DİL</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl outline-none font-bold italic appearance-none cursor-pointer">
              <option value="TR" className="bg-black">Türkçe (TR)</option>
              <option value="EN" className="bg-black">English (EN)</option>
              <option value="AR" className="bg-black">العربية (AR)</option>
              <option value="UG" className="bg-black">ئۇيغۇرچە (UG)</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="relative"><Lock className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-5 text-orange-500`} size={18} />
            <input type="password" placeholder="••••••••" className={`w-full bg-white/5 border border-white/10 p-5 ${isRTL ? 'pr-12' : 'pl-12'} rounded-3xl outline-none`} /></div>
          </div>

          <button onClick={saveSettings} className="w-full py-5 bg-orange-500 text-black font-black rounded-3xl uppercase italic hover:scale-[1.02] transition-all shadow-lg shadow-orange-500/20">
            {lang === 'TR' ? 'KAYDET' : lang === 'EN' ? 'SAVE' : lang === 'AR' ? 'حفظ' : 'ساقلاش'}
          </button>
          {msg && <p className="text-center font-bold text-emerald-500">{msg}</p>}
        </div>
      </div>
    </div>
  );
}