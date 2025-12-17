"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.email === email && user.password === pass) {
      router.push('/dashboard');
    } else {
      alert("Hatalı giriş! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-md w-full p-10 rounded-[40px] bg-slate-50 border border-slate-100 shadow-xl">
        <h2 className="text-4xl font-extrabold text-center mb-8 italic bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">Giriş Yap</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="E-posta" className="w-full p-4 rounded-2xl border-none outline-none focus:ring-2 ring-pink-500 bg-white shadow-sm" required onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Şifre" className="w-full p-4 rounded-2xl border-none outline-none focus:ring-2 ring-pink-500 bg-white shadow-sm" required onChange={(e)=>setPass(e.target.value)} />
          <button type="submit" className="w-full py-4 bg-black text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 transition-all uppercase italic tracking-widest">GİRİŞ</button>
          <div className="text-center mt-6">
             <Link href="/register" className="text-slate-400 font-bold hover:text-pink-500 transition">Hesabın yok mu? Kaydol</Link>
          </div>
        </form>
      </div>
    </div>
  );
}