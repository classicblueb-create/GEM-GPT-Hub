import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTASection = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/30 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              เปลี่ยนไอเดียในหัว <br className="hidden md:block" />
              ให้เป็นระบบ AI พร้อมใช้ใน 30 วินาที
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              ไม่ต้องปวดหัวกับการเขียน Prompt ยาวๆ อีกต่อไป ลองใช้ GEM Maker ผู้ช่วย Prompt Engineer ส่วนตัวของคุณได้แล้ววันนี้
            </p>
            <button 
              onClick={onGetStarted}
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)]"
            >
              สร้าง GEM ของคุณตอนนี้
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-sm text-gray-400 mt-8">
              เข้าร่วมกับผู้ใช้งานกว่า 1,000+ คนที่เปลี่ยนวิธีทำงานด้วย AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
