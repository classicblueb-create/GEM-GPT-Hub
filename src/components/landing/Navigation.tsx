import React, { useEffect, useState } from 'react';

export const Navigation = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 hover:scale-[1.02] print:hidden" id="dynamic-island">
      <div className="flex gap-1.5 items-center p-1.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] transition-all hover:bg-white/10 hover:border-white/20 duration-300">
        <a href="#" className="flex items-center justify-center transition-transform hover:scale-110 group bg-center w-9 h-9 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c547aee-5092-488d-9b24-cc3cadf37fdc_320w.png)] bg-cover rounded-full"></a>

        <div className="flex items-center gap-0.5 px-1 hidden md:flex">
          <a href="#" className="transition-all text-xs font-medium text-slate-950 bg-white/20 mix-blend-difference rounded-full px-3.5 py-1.5 relative shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
            หน้าแรก
          </a>
          <a href="#pricing" className="hover:bg-white/10 transition-all text-xs font-normal text-slate-950 mix-blend-difference rounded-full px-3.5 py-1.5">
            แพ็กเกจ
          </a>
          <button onClick={onGetStarted} className="hover:bg-white/10 transition-all text-xs font-normal text-slate-950 mix-blend-difference rounded-full px-3.5 py-1.5 whitespace-nowrap">
            GEM Maker
          </button>
          <button onClick={onGetStarted} className="hover:bg-white/10 transition-all text-xs font-normal text-slate-950 mix-blend-difference rounded-full px-3.5 py-1.5 whitespace-nowrap">
            คลัง GEMs & GPTs
          </button>
        </div>

        <div className="hidden md:block w-px h-4 bg-white/60 mix-blend-difference mx-1.5"></div>

        <button onClick={onGetStarted} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full px-5 py-2 text-xs font-bold hover:scale-105 transition-all whitespace-nowrap ml-2 md:ml-0 shadow-lg shadow-purple-500/20">
          เริ่มต้นใช้งานฟรี
        </button>

        <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all active:scale-90 ml-1">
          {!isDark ? (
            <iconify-icon icon="solar:sun-2-bold-duotone" width="20" class="text-[#ff9146]"></iconify-icon>
          ) : (
            <iconify-icon icon="solar:moon-stars-bold-duotone" width="18" class="text-[#46d4c6]"></iconify-icon>
          )}
        </button>
      </div>
    </nav>
  );
};
